'use strict';

import { HttpRequest } from '../bower_components/request-es6/src/HttpRequest';

import DependencyError from './exceptions/DependencyError';

let _scriptLoader = (moduleId, src, eagerness) => {
	return new Promise((resolve, reject) => {
		try {
			let request = new HttpRequest(src, eagerness);
			request.then((script) => {
				eval(script);
				resolve(moduleId);
			});
			request.catch(() => {
				reject(moduleId);
			});
			request.send();
		} catch (ex) {
			reject(new DependencyError(ex.message));
		}
	});
};

export default _scriptLoader;