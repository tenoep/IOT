class Logger {
    constructor(name) {
        this.name = name;
    }

    // Utility function to get the current timestamp
    getTimestamp() {
        return new Date().toISOString();
    }

    // Utility function to print log with formatting
    log(level, color, message) {
        const timestamp = this.getTimestamp();
        // Colorize the object name (green)
        const greenName = `\x1b[32m${this.name}\x1b[0m`;
        // Colorize the log level
        const coloredLevel = `${color}${level.toUpperCase()}\x1b[0m`;
        // Print formatted log to the terminal
        console.log(`${timestamp} -- ${coloredLevel} -- ${greenName} -- ${message}`);
    }

    // Info log level (cyan)
    info(message) {
        this.log('info', '\x1b[36m', message); // Cyan color
    }

    // Error log level (red)
    error(message) {
        this.log('error', '\x1b[31m', message); // Red color
    }

    // Debug log level (blue)
    debug(message) {
        this.log('debug', '\x1b[34m', message); // Blue color
    }

    // Warn log level (yellow)
    warn(message) {
        this.log('warn', '\x1b[33m', message); // Yellow color
    }
}

module.exports = {
    Logger
}