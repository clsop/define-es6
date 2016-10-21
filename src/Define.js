'use strict';

import Utility from './Utility';
import IdArgHandler from './handlers/IdArgHandler';
import DependencyArgHandler from './handlers/DependencyArgHandler';
import FactoryArgHandler from './handlers/FactoryArgHandler';

import DefineError from './exceptions/DefineError';
import DependencyError from './exceptions/DependencyError';

// private imports
import _require from './Require';
import _config from './Config';
import _configs from './vars/Configs';
import _deps from './vars/Dependencies';

// TODO: multiple define calls in one script
let define = global.define || ((param1, param2, param3) => {
    // args handling
    let factoryArgHandler = new FactoryArgHandler(param1, param2, param3);
    let dependencyArgHandler = new DependencyArgHandler(param1, param2, param3);
    let idArgHandler = new IdArgHandler(param1, param2, param3);
    factoryArgHandler.setSuccessor(idArgHandler);
    idArgHandler.setSuccessor(dependencyArgHandler);

    // process argument handling, starting with the factory function/object
    factoryArgHandler.process();

    // if no id, use current script id
    let id = idArgHandler.getResult() || document.scripts[document.scripts.length - 1].id;
    let dependencyIds = dependencyArgHandler.getResult();
    let factory = factoryArgHandler.getResult();

    let _exports = Object.create(null);
    let _module = Object.create(null);
    Utility.defineProp(_module, 'id', id, true);

    // default free vars
    let _defaultDeps = new Map([
        ["require", require],
        ["exports", _exports],
        ["module", _module]
    ]);
    let depsResolves = [];
    let instantDelivery = false;

    if (dependencyIds && dependencyIds.length > 0) {
        // can instantly deliver dependencies
        instantDelivery = dependencyIds.every((depId) => {
            let depStatus = _deps.has(depId) ? _deps.get(depId) : null;

            return _defaultDeps.has(depId) || depStatus !== null && !(depStatus instanceof Array);
        });

        if (instantDelivery) {
            dependencyIds.forEach(depId => {
                let depStatus = _deps.has(depId) ? _deps.get(depId) : null;

                if (_defaultDeps.has(depId)) {
                    depsResolves.push(_defaultDeps.get(depId));
                } else if (depStatus !== null && !(depStatus instanceof Array)) { // dependency has previously been resolved
                    depsResolves.push(depStatus);
                }
            });
        } else {
            dependencyIds.forEach(depId => {
                depsResolves.push(new Promise((resolveDep, rejectDep) => {
                    let depStatus = _deps.has(depId) ? _deps.get(depId) : null;

                    // dependency is one of the default free var api
                    if (_defaultDeps.has(depId)) {
                        resolveDep(_defaultDeps.get(depId));
                    } else if (depStatus !== null && !(depStatus instanceof Array)) { // dependency has previously been resolved
                        resolveDep(depStatus);
                    } else {
                        // TODO: reject after timeout ?
                        if (depStatus) {
                            depStatus.push((exportedApi) => resolveDep(exportedApi));
                        } else {
                            _deps.set(depId, [(exportedApi) => resolveDep(exportedApi)]);    
                        }

                        // TODO: module path
                        Utility.scriptImport(depId, `${_configs.baseUrl}${depId}`).catch(reason => {
                            rejectDep(reason);
                        });
                    }
                }));
            });
        }
    } else {
        // TODO: scan factory for dependencies
        // no dependencies defined, add default require, exports and module
        depsResolves.push(_defaultDeps.get("require"), _exports, resolveDep(_module));
    }

    if (instantDelivery) {
        let exported = typeof factory === 'function' ? factory(...depsResolves) : factory;
        let exportedApi = exported ? exported : _defaultDeps.get('exports');

        _deps.set(_module.id, exportedApi);
    } else {
        Promise.all(depsResolves).then((resolvedDeps) => {
            let exported = typeof factory === 'function' ? factory(...resolvedDeps) : factory;
            let depStatus = _deps.has(_module.id) ? _deps.get(_module.id) : null;
            let exportedApi = exported ? exported : _defaultDeps.get('exports');

            // use callback to notify waiting module for dependency resolving
            if (depStatus !== null && depStatus instanceof Array) {
                let callbacks = depStatus;

                _deps.set(_module.id, exportedApi);
                callbacks.forEach(callback => {
                    callback(exportedApi);
                });
            } else if (depStatus === null) {
                _deps.set(_module.id, exportedApi);
            }
        });
    }
});

// add api properties
Utility.defineProp(define, 'config', _config);
Utility.defineProp(define, 'amd', {
    multiversion: false
});

export default define;

// browser env
if (global.window) {
    Utility.defineProp(window, 'define', define);
}