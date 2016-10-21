'use strict';

import ArgumentHandler from './ArgumentHandler';
import DefineError from '../exceptions/DefineError';

export default class IdArgHandler extends ArgumentHandler {
	constructor(arg1, arg2, arg3) {
		super(arg1, arg2, arg3);
	}

	process() {
		let arg = this.enumArgs(this.args, (arg) => {
			let type = arg && typeof arg === 'string';

			// TODO: id format, loader plugins "!"
			// if (type && /^[a-z]+([A-Z]{1}[a-z]+)?/.test(arg)) {
			// 	throw new DefineError(`"${arg}" is not a valid id!`);
			// }

			return type;
		});

		if (arg) {
			this.arg = arg;
		}
		
		super.process();
	}
}