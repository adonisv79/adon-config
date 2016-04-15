# adon-config
This module is used for managing system configurations in cascading order.

assuming you have a javascript config file with the following item
```js
modules.export = {
  test: {
    something: 'eureka!'
  }
}
```

you can retrieve them easily by

```js
let config = require('adon-config');

config.load(__dirname);
console.log("My test value is " + config.get('test.something'));
```

## Goal of this module 
  * Allows developers to manage configuration files in a common structure
  * Support a mix of common config file types (Javascript, JSON, Coffee)
  * Allows overriding of configurations data on different module levels
  * Allows special configurations based on server environment (NODE_ENV)
  
## Installation

```bash
$ npm install adon-config --save
```

## Setup
1. In your node module, create a "config" folder where you want all the config files to exist.
2. create an "env" folder within it that will contain environment specific configurations.
3. inside the config folder create a file named default (javascript, json or coffeescript)
4. (optional) in the "env" folder create configration overrides that you want based on the NODE_ENV value

```bash
root
  |-config
  |     |-env 
  |     |   |-development.js
  |     |   |-production.js
  |     |-default.js
  |-index.js
```

## Dependencies
adon-config relies on the following node modules
  * [lodash] (https://github.com/lodash/lodash)
  
## License
[GPL](https://github.com/adonisv79/adon-config/blob/master/LICENSE)
