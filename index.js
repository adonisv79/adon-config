"use strict";
const _ = require('lodash');
const loaded_paths = [];
const fs = require('fs');
const path = require('path');

let config = {};

function loadConfigFile(target_path, config_path) {
	try {
		let result = fs.readdirSync(target_path);
		for (let i = 0; i < result.length; i++) {
			let filename = path.resolve(target_path + '/' + result[i]);
			if (fs.statSync(filename).isDirectory()) {
				let new_config_path = config_path ? config_path + '.' + result[i] : result[i];
				loadConfigFile(filename, new_config_path);
			} else if (fs.statSync(filename).isFile()) {
				let new_config = {};
				let target_config_path = '';
				if (config_path) {
					target_config_path = config_path + '.' + result[i].split('.')[0]
				} else {
					target_config_path = result[i].split('.')[0];
				}

				if (getFileType(filename) === 'json') {
					_.set(new_config, target_config_path, loadJsonFile(filename));
				} else {
					_.set(new_config, target_config_path, importJavascriptFile(filename));
				}

				config = _.defaultsDeep(new_config, config);
			}
		}
	} catch (err) {
		//do nothing
	}
}

function getFileType(file_path) {
	const filename_breakdown = file_path.split('.');
	return filename_breakdown[filename_breakdown.length - 1];
}

function loadJsonFile(file_path) {
	return JSON.parse(fs.readFileSync(file_path, 'utf8'));
}

function importJavascriptFile(file_path) {
	return require(path.resolve(file_path));
}

module.exports = {
	get: () => {
		return config;
	},
	load: () => {
		let config_path = (path.resolve('.') + '/config')
		config_path = path.resolve(config_path); //correct it based on OS

		if (config && loaded_paths.indexOf(config_path) >= 0) {
			return config;
		}

		console.log('ADON-CONFIG: Loading ' + config_path);

		if (fs.statSync(config_path).isDirectory()) {
			const default_path = path.resolve(config_path + '/common');
			const environment = process.env.NODE_ENV || 'development';
			const environment_path = path.resolve(config_path + '/env/' + environment.toLowerCase());

			loadConfigFile(default_path);
			loadConfigFile(environment_path);
			return config;
		} else {
			throw new Error('ADONCONFIG_CONFIG_ROOTFOLDER_NOT_FOUND');
		}
	}
}