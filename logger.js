/**
 * Usage Doc
 * logger.info([message], [meta])
 * meta { label : '[Label for filtering]'}
 *
 * > logger.debug('Hello its a log');
 * Output : 2018-09-04T14:46:57.555Z [log] debug: Hello its a log
 *
 * > logger.debug('Hello its a log', {label : 'FIRST'});
 * Output : 2018-09-04T14:46:46.986Z [FIRST] debug: Hello its a log
 */

/**
 * Logging levels in winston conform to the severity ordering specified by RFC5424:
 * severity of all levels is assumed to be numerically ascending from most important
 * to least important.
 * [error, warn , info, verbose, debug, silly]
 */
const winston = require('winston');
const circularjson = require('circular-json');
const moment = require('moment');
const path = require('path');

require('winston-daily-rotate-file');

/**
 * Custom Log format
 * See this : https://github.com/winstonjs/winston#formats
 */
const customFormat = winston.format.printf(info => {
  let { message } = info;
  if (info.message instanceof Error) {
    message = `${(message.name ? `${message.name}:` : 'Error:') +
      message.toString()}\n${message.stack}`;
  } else if (typeof info.message === 'object') {
    message = circularjson.stringify(info.message, null, 2);
  }
  let label = '';
  if (info.loc && typeof info.loc === 'string') {
    label += path.basename(info.loc);
  }
  if (info.label && typeof info.label === 'string') {
    label = label ? `${label}|${info.label}` : info.label;
  }
  let timestamp = moment().format('YYYY-MM-DD hh:mm:ss:SSS').trim()
  return `${timestamp} [${label || 'log'}] ${info.level}: ${message}`;
});
function LoggerConfig(opts) {
  const transports = [new winston.transports.Console()];
  if (opts.fsLog) {
    const fileTransport = new winston.transports.DailyRotateFile({
      filename: `${opts.filePrefix || 'logfile'}-%DATE%.log`,
      dirname: 'logs',
      maxSize: '20m',
      maxFiles: '10d',
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true
    });
    transports.push(fileTransport);
  }
  const logger = winston.createLogger({
    level: 'silly',
    format: winston.format.combine(winston.format.timestamp(), customFormat),
    transports
  });

  return logger;
}

module.exports = LoggerConfig;
