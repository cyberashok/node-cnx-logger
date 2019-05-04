const LoggerBuilder = require('../logger');

const logger = LoggerBuilder({
  fsLog: true,
  filePrefix: 'fc-logger'
});

logger.debug('Hello', { loc: __filename });
logger.debug('Hello', { loc: '' });
logger.debug('Hello');
logger.debug('Hello');
logger.debug('Hello');
logger.debug('Hello');
logger.debug('Hello');
