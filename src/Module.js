'strict';

export default class Module {
	constructor(id, api) {
		this._id = id;
		this._api = api;
	}

	setId(id) {
		this._id = id;
	}

	setExportedApi(api) {
		this._api = api;
	}

	getId() {
		return this._id;
	}

	getExportedApi() {
		return this._api;
	}
}