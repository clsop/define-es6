'use strict';

export default class DependencyError extends Error {
	constructor(message) {
		super(message);
	}
}