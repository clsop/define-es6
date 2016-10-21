'strict';

import Utility from './Utility';
import ConfigError from './exceptions/ConfigError';

// private imports
import _configs from './vars/Configs';

let config = (configObj) => {
    if (configObj === undefined ||
        (typeof configObj === 'object' && Object.getOwnPropertyNames(configObj).length === 0) // empty and null object
        || typeof configObj !== 'object') {
        throw new ConfigError('config object not given or empty.');
    } else if (Object.getOwnPropertyNames(_configs).length > 0) {
    	throw new ConfigError('config object is already defined.');
    }

    if (configObj.hasOwnProperty('baseUrl')) {
    	Utility.defineProp(_configs, 'baseUrl', configObj.baseUrl);
    } else {
    	Utility.defineProp(_configs, 'baseUrl', '/');
    }

    // TODO: setup configs
};

export default config;