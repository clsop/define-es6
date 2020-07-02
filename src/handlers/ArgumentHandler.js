'use strict';

import Handler from './Handler';
import Utility from '../Utility';

export default class ArgumentHandler extends Handler {
	constructor(arg1, arg2, arg3) {
		super();

		let argObj = Object.create(null);
		Utility.defineProperties(argObj, ['_arg1', '_arg2', '_arg3'], [arg1, arg2, arg3], true);

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