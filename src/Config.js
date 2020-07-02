'strict';

import Utility from './Utility';
import ConfigError from './exceptions/ConfigError';

// private imports
import _configs from './vars/Configs';


let config = (configObj) => {
	var configNames = Object.getOwnPropertyNames(configObj);

    if (configObj === undefined || typeof configObj !== 'object') {
        throw new ConfigError('config object not given.');
	} else if (configNames.length === 0) {
		throw new ConfigError('config object empty.');
    }

    // defaults
	Utility.defineProperty(_configs, 'baseUri', '/', false, true);
	Utility.defineProperty(_configs, 'eagerness', 'no hurry', false, true);
	
    for (var index in configNames) {
    	let configName = configNames[index];
    	_configs[configName] = configObj[configName];
    }
};
let get = function(name) {
	// return all config vars
	if (name === undefined) {
		return _configs;
	} else if (!_configs.hasOwnProperty(name)) {
		throw new ConfigError(`no such config var "${name}".`);
	}

	return _configs[name];
};

Utility.defineProperty(config, 'get', get);

export default config;