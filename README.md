# adon-config
This module is used for managing system configurations in cascading order. It is able to load recursively load all the files in the folder and form the exact structure in the config object. 

assuming you have a javascript config file with the following item in config/common
```js
modules.export = {
  test: {
    something: 'eureka!'
  }
}
```

you can retrieve them easily by

```js
let config = require('adon-config').load(); //this should be one of the first line of code in your index file

config.load(__dirname);
console.log("My test value is " + config.get('test.something'));
```

## Goal of this module 
  * Allows developers to manage configuration files in a common structure
  * Support a mix of common config file types (Javascript, JSON)
  * Allows overriding of configurations data on different module levels
  * Allows special configurations based on server environment (NODE_ENV)


## Installation

```bash
$ npm install adon-config --save
```

## Setup
1. In your node project, create a "config/common" folder where you want all the config files to exist.
2. (optional) create an "config/env" folder within as well to contain environment specific configurations.
3. inside these config folder create any files (javascript or json)

```bash
root
  |-config
  |     |-common 
  |     |   |-server.js
  |     |   |-database.js
  |     |-env 
  |     |   |-development
  |     |   |   |-server.js
  |     |   |   |-test.js
  |     |   |-production
  |     |   |   |-server.js
  |-index.js
```
in the sample above, we have 2 configurations that will be common across all environments. The config object will contain the attributes or elements named 'server' and 'database' based on the config files.

```$js
let config = require('adon-config').get()
console.log(config.database.source); //outputs the source value from common/database
```

The env (environment) overrides common configurations and will rely on the systm's NODE_ENV value. in the sample above, any duplicate values in config.server (based from common/server.js) will be overridden by the environment version. any unique configuration that exists in an environment only exists for that environment (i.e. development/test.js)   

## Functions
###Load
loads the config folder from the current project directory then returns the latest config object (this is the first code you must trigger to initialize this module)
```$js
let config = require('adon-config').load()
```

just returns the latest config object and do nothing else (used for succeeding requests where loading of configurations are no longer needed) 
```$js
let config = require('adon-config').get()
```

## Dependencies
adon-config relies on the following node modules
  * [lodash] (https://github.com/lodash/lodash)

## Source codes
adon-config is publicly available on Github
  * [https://github.com/adonisv79/adon-config] (https://github.com/adonisv79/adon-config)

## License
[GPL](https://github.com/adonisv79/adon-config/blob/master/LICENSE)
