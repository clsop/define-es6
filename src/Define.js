'use strict';

import Utility from './Utility';
import LoadScript from './ScriptLoader';
import IdArgHandler from './handlers/IdArgHandler';
import DependencyArgHandler from './handlers/DependencyArgHandler';
import FactoryArgHandler from './handlers/FactoryArgHandler';

import DefineError from './exceptions/DefineError';
import DependencyError from './exceptions/DependencyError';

// private imports
import _require from './Require';
import _config from './Config';
import _deps from './vars/Dependencies';

let _depsResolves = [];

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
    Utility.defineProperty(_module, 'id', id, true);

    // default free vars
    let _defaultDeps = new Map([
        ["require", _require],
        ["exports", _exports],
        ["module", _module]
    ]);
    let hasUnresolvedDependencies = false; // if no dependencies needs to be resolved, don't use promises

    let isDependencyResolved = (depStatus, depId) => _defaultDeps.has(depId) || depStatus !== null && !(depStatus instanceof Array);
    let getDepStatus = (depId) => _deps.has(depId) ? _deps.get(depId) : null;
    let onDepsResolved = (dependencies) => {
        let exported = typeof factory === 'function' ? factory(...dependencies) : factory;
        let exportedApi = exported ? exported : _defaultDeps.get('exports');
        let depStatus = getDepStatus(_module.id);

        if (depStatus !== null && depStatus instanceof Array) {
            let callbacks = depStatus;
            
            _deps.set(_module.id, exportedApi);
            callbacks.forEach(callback => {
                callback(exportedApi);
            });
        } else if (depStatus === null) {
            _deps.set(_module.id, exportedApi);
        }
    };

    if (dependencyIds && dependencyIds.length > 0) {
        // all dependencies are resolved prior to resolving
        hasUnresolvedDependencies = dependencyIds.some((depId) => {
            return !isDependencyResolved(getDepStatus(depId), depId);
        });

        // TODO: determine resolved vs pending
        dependencyIds.forEach(depId => {
            let depStatus = getDepStatus(depId);

            // dependency is one of the default free var api
            if (_defaultDeps.has(depId)) {
                _depsResolves.push(_defaultDeps.get(depId));
            } else if (isDependencyResolved(depStatus, depId)) { // dependency has previously been resolved
                _depsResolves.push(depStatus);
            } else {
                _depsResolves.push(new Promise((resolveDep, rejectDep) => {
                    let depStatus = getDepStatus(depId);

                    // dependency is one of the default free var api
                    // if (_defaultDeps.has(depId)) {
                    //     resolveDep(_defaultDeps.get(depId));
                    // } else if (isDependencyResolved(depStatus, depId)) { // dependency has previously been resolved
                    //     resolveDep(depStatus);
                    // } else {
                    // TODO: verify added
                    // dependency is resolving, add done callback
                    if (depStatus !== null) {
                        depStatus.push((exportedApi) => resolveDep(exportedApi));
                    } else { // dependency should be resolved
                        _deps.set(depId, [(exportedApi) => resolveDep(exportedApi)]);

                        // TODO: module path
                        // TODO: reject if timeout ?
                        LoadScript(depId, `${_config.get('baseUri')}${depId}.js`, _config.get('eagerness')).then((moduleId) => {
                            resolveDep(moduleId);
                        }).catch(reason => {
                            rejectDep(reason);
                        });
                        // Utility.scriptImport(depId, `${_config.get('baseUri')}${depId}`).catch(reason => {
                        //     rejectDep(reason);
                        // });
                    }
                    //}
                }));
            }
        });
    } else {
        // TODO: scan factory for require calls
        // no dependencies defined, add default require, exports and module
        _depsResolves.push(_require, _exports, _module);
    }

    if (hasUnresolvedDependencies) {
        let unresolved = _depsResolves.filter((dep) => dep instanceof Promise);
        let resolved = _depsResolves.filter((dep) => !(dep instanceof Promise));

        Promise.all(unresolved).then((resolvedDeps) => {
            resolved.push(resolvedDeps);
            onDepsResolved(resolved);
        });
    } else {
        onDepsResolved(_depsResolves);
    }
});

// add api properties
Utility.defineProperty(define, 'config', _config);
Utility.defineProperty(define, 'amd', {
    multiversion: false
});

export default define;

// browser env
if (global.window) {
    Utility.defineProperty(window, 'define', define);
}