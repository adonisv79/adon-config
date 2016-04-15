"use strict";

let fs = require('fs'),
	path = require('path'),
	_ = require('lodash'),
	self,
	singleton;

function loadConfigFile(file_path, type) {
	try {
		if (fs.statSync(file_path).isFile()) {
			if (type === 'json') {
				self.config = _.defaultsDeep(JSON.parse(fs.readFileSync(file_path, 'utf8')), self.config);
			} else {
				self.config = _.defaultsDeep(require(path.resolve(file_path)), self.config);
			}
		}
	} catch (err) {
		//do nothing
	}
}

class ConfigManager {
	constructor() {
		self = this;
		self.config = {};
	}

	get (path) {
		return _.get(self.config, path, undefined);
	}

	has (path) {
		return _.has(self.config, path);
	}

	load (module_root) {
		try {
			let config_path = path.resolve(module_root+ '/config');
			if (fs.statSync(config_path).isDirectory()) {
				let base_path = path.isAbsolute(config_path) ? config_path + '/' : config_path,
					default_path = base_path + 'default',
					environment = process.env.NODE_ENV || 'development',
					environment_path = base_path + 'env/' +  environment.toLowerCase();

				loadConfigFile(default_path + '.json');
				loadConfigFile(default_path + '.js');
				loadConfigFile(environment_path + '.json');
				loadConfigFile(environment_path + '.js');
			}
		} catch (err) {
			//do nothing
		}
	}
}

module.exports = singleton ? singleton :  new ConfigManager();
//codes below are for test purposes only
//module.exports.load(__dirname);
//console.dir(self.config);