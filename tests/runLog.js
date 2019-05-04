const LoggerBuilder = require('../logger');

const logger = LoggerBuilder({
  fsLog: true,
  filePrefix: 'fc-logger'
});

logger.debug('Hello its a debug line');
logger.debug('Hello its a log', { label: 'FIRST' });