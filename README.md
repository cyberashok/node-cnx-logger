# node-cnx-logger
Node logging wrapper
- Easy logging api
- Made using winston
- Builtin log rotate functionalities
## Installation
```bash
npm i git+https://git@github.com/cyberashok/node-cnx-logger.git --save
```

## Setup
To setup the logger create any file
 `eg.logger.js`
Add relevant options for you.  
Options available
- fsLog: Boolean (Tells the logger to create physical files under logs/ folder) - Default- undefined(false)
- filePrefix: String (Tells the logger to create a file with the prefix name)
```js
const LoggerCreator = require('node-cnx-logger');

module.exports = LoggerCreator({
    fsLog: true,
    filePrefix: 'project-name'
});

```
Then use this file and import in all the places where you want logging.

## Usage Doc
```js
logger.info([message], [meta])
```

Note: `meta { label : '[Label for filtering]'}`  
Filtering helps when you want attach more info to a log more than the just the log level

Code
```js
logger.debug('Hello its a debug line');
```

Output : 
```bash
2019-05-04 10:48:18:633 [log] debug: Hello its a debug line
```
Code:
```js
logger.debug('Hello its a log', {label : 'FIRST'});
```

Output : 
```bash
2019-05-04 10:48:59:105 [FIRST] debug: Hello its a log
```

