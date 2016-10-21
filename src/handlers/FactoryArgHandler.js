'use strict';

import ArgumentHandler from './ArgumentHandler';
import DefineError from '../exceptions/DefineError';

export default class FactoryArgHandler extends ArgumentHandler {
	constructor(arg1, arg2, arg3) {
		super(arg1, arg2, arg3);
	}

	process() {
		let arg = this.enumArgs(this.args, (arg) => {
			return arg && typeof arg === 'function';
		});

		if (arg) {
			this.arg = arg;
		} else {
			throw new DefineError('missing factory function!');
		}
		
		super.process();
	}
}