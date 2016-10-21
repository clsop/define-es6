'use strict';

export default class ConfigError extends Error {
	constructor(message) {
		super(message);
	}
}