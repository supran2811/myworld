const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: 'main' , level:'debug'});

class ChildLogger {
    constructor(moduleName) {
        this.logger = logger.child({ module: moduleName });
    }

    printLog(type, ...args) {
        this.logger[type](...args);
    }
}

exports.printLog = function (type, ...args) {
    logger[type](...args);
}

exports.getChildLogger = function (moduleName) {
    return new ChildLogger(moduleName);
}
