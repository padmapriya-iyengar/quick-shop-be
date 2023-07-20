const winston = require('winston')
const drFile = require('winston-daily-rotate-file');
const configuration = require('../config/config');

/**
 * custom log format specification
 */
const logFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`)
);

/**
 * generate log files everyday or upto 10mb with a specific formatted file name. 
 * Keep the log files for a maximum of 10days before auto deleting.
 */
const transport = new drFile({
    filename: configuration.log_config.folder_path + configuration.log_config.file_path,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles:'10d',
    prepend: true
});

/**
 * rotate event can be used to upload the log files to cloud or move away from the current working directory. 
 * this is generally done to avoid space constraints on the cwd
 * currently this is not implemented
 */
transport.on('rotate', function (oldFilename, newFilename) {
    
});

/**
 * logger object with the above mentioned formats
 */
const logger = winston.createLogger({
    format: logFormat,
    transports: [
        transport
    ]
});

module.exports = logger;