'use strict';

import Handler from './Handler';

export default class ArgumentHandler extends Handler {
	constructor(arg1, arg2, arg3) {
		super();

		let argObj = Object.create(null);
		let enumerable = true, writable = false, configurable = false;
		Object.defineProperties(argObj, {
			"_arg1": {
				value: arg1,
				enumerable: enumerable,
				configurable: configurable,
				writable: writable
			},
			"_arg2": {
				value: arg2,
				enumerable: enumerable,
				configurable: configurable,
				writable: writable
			},
			"_arg3": {
				value: arg3,
				enumerable: enumerable,
				configurable: configurable,
				writable: writable
			}
		});

		this.args = argObj;
		this.arg = null;
	}

	getResult() {
		return this.arg;
	}

	enumArgs(args, cb) {
		for (let arg in args) {
			if (cb(args[arg]))
				return args[arg];
		}

		return null;
	}
}