'use strict';

export default class Handler {
	constructor() {
		this.nextHandler = null;
	}

	setSuccessor(handler) {
		this.nextHandler = handler;
	}

	process() {
		if (this.nextHandler !== null) {
			this.nextHandler.process();
		}
	}
}