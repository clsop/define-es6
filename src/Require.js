'use strict';

import Utility from './Utility';
import DependencyError from './exceptions/DependencyError';

// private imports
import _deps from './vars/Dependencies';

let require = (moduleId) => {
	if (!_deps.has(moduleId)) {
		throw new DependencyError(`dependency has not been resolved prior to require call: ${moduleId}`);
	}

	// TODO: require function
	return _deps.get(moduleId);
};
Utility.defineProperty(require, 'main', undefined, true);

export default require;