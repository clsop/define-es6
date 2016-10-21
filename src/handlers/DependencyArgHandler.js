'use strict';

import ArgumentHandler from './ArgumentHandler';

export default class DependencyArgHandler extends ArgumentHandler {
	constructor(arg1, arg2, arg3) {
		super(arg1, arg2, arg3);
	}

	process() {
		let arg = this.enumArgs(this.args, (arg) => {
			// TODO: check id spec in array
			return arg && arg instanceof Array;
		});

		if (arg) {
			this.arg = arg;
		}
		
		super.process();
	}
}