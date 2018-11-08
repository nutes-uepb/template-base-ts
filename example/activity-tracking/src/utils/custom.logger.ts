import fs from 'fs'
import { injectable } from 'inversify'
import { Default } from './default'
import { Logger } from 'winston'

const winston = require('winston')
require('winston-daily-rotate-file')

@injectable()
export class CustomLogger implements ILogger {
    private readonly _logger: Logger
    private readonly _env: string = (process.env.NODE_ENV || Default.NODE_ENV) === 'development' ? 'debug' : 'info'
    private readonly _logDir = process.env.LOG_DIR || Default.LOG_DIR

    constructor() {
        if (!fs.existsSync(this._logDir)) fs.mkdirSync(this._logDir) // create directory if it does not exist
        this._logger = this.internalCreateLogger()

        // If we're not in production then log to the `console`
        this.addTransportDevelopment()
    }

    get logger(): Logger {
        return this._logger
    }

    private internalCreateLogger(): Logger {
        return winston.createLogger({
            // change level if in dev environment versus production
            level: this._env,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(info => `${info.timestamp} ${info.level}: ${info.message}  ${info.level}`)
            ),
            transports: [
                new winston.transports.DailyRotateFile({
                    handleExceptions: true,
                    filename: `${this._logDir}/%DATE%-results.log`,
                    datePattern: 'YYYY-MM-DD',
                    maxSize: '20m',
                    maxFiles: '15d'
                })
            ],
            exitOnError: false
        })
    }

    private addTransportDevelopment(): void {
        if (this._env === 'debug') {
            this.addTransport(new winston.transports.Console({
                level: 'debug',
                handleExceptions: true,
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.printf(
                        info => `${info.timestamp} ${info.level}: ${info.message}`
                    )
                )
            }))
        }
    }

    public addTransport(transport: any): Logger {
        return this._logger.add(transport)
    }

    public error(message: string): void {
        this._logger.error(message)
    }

    public warn(message: string): void {
        this._logger.warn(message)
    }

    public info(message: string): void {
        this._logger.info(message)
    }

    public verbose(message: string): void {
        this._logger.verbose(message)
    }

    public debug(message: string): void {
        this._logger.debug(message)
    }

    public silly(message: string): void {
        this._logger.silly(message)
    }
}

/**
 * Logger interface.
 * logging levels are prioritized from 0 to 5 (highest to lowest):
 *   error: 0,
 *   warn: 1,
 *   info: 2,
 *   verbose: 3,
 *   debug: 4,
 *   silly: 5
 *
 * @see {@link https://github.com/winstonjs/winston#using-logging-levels} for further information.
 */
export interface ILogger {
    logger: Logger

    error(message: string): void

    warn(message: string): void

    info(message: string): void

    verbose(message: string): void

    debug(message: string): void

    silly(message: string): void

    addTransport(transport: any): Logger
}
