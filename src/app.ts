import 'reflect-metadata'
import yaml from 'yamljs'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import HttpStatus from 'http-status-codes'
import swaggerUi from 'swagger-ui-express'
import qs from 'query-strings-parser'
import express, { Application, Request, Response } from 'express'
import { Container, inject, injectable } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import { ApiException } from './ui/exceptions/api.exception'
import { Default } from './utils/default'
import { DI } from './di/di'
import { Identifier } from './di/identifiers'
import { ILogger } from './utils/custom.logger'

/**
 * Implementation of class App.
 * You must initialize all application settings,
 * such as dependency injection and middleware settings.
 */
@injectable()
export class App {
    private readonly container: Container
    private express: Application

    /**
     * Creates an instance of App.
     */
    constructor(@inject(Identifier.LOGGER) private readonly _logger: ILogger) {
        this.express = express()
        this.container = DI.getInstance().getContainer()
        this.bootstrap()
    }

    /**
     * Get express instance.
     *
     * @return {Application}
     */
    public getExpress(): Application {
        return this.express
    }

    /**
     * Initialize app settings.
     *
     * @private
     * @return void
     */
    private bootstrap(): void {
        this.middleware()
    }

    /**
     * Initialize middleware.
     *
     * @private
     * @return void
     */
    private middleware(): void {
        const inversifyExpress: InversifyExpressServer = new InversifyExpressServer(
            this.container, null, { rootPath: '/api/v1' })

        inversifyExpress.setConfig((app) => {
            // for handling query strings
            // {@link https://www.npmjs.com/package/query-strings-parser}
            app.use(qs({ use_page: true, default: { pagination: { limit: 20 }, sort: { created_at: 'desc' } } }))

            // helps you secure your Express apps by setting various HTTP headers.
            // {@link https://www.npmjs.com/package/helmet}
            app.use(helmet())

            // create application/json parser
            // {@link https://www.npmjs.com/package/body-parser}
            app.use(bodyParser.json())
            // create application/x-www-form-urlencoded parser
            app.use(bodyParser.urlencoded({ extended: false }))

            app.use(morgan(':remote-addr :remote-user ":method :url HTTP/:http-version" ' +
                ':status :res[content-length] :response-time ms ":referrer" ":user-agent"', {
                    stream: { write: (str: string) => this._logger.info(str) }
                }
            ))

            // Middleware swagger. It should not run in the test environment.
            if (process.env.NODE_ENV && process.env.NODE_ENV !== 'test') {
                const options = {
                    customCss: '.swagger-ui .topbar { display: none }',
                    customfavIcon: 'http://nutes.uepb.edu.br/wp-content/uploads/2014/01/icon.fw_.png',
                    customSiteTitle: `API Reference | ${Default.APP_TITLE}`
                }

                app.use('/api/v1/reference', swaggerUi.serve, swaggerUi.setup(yaml.load(Default.SWAGGER_PATH), options))
            }
        })
        this.express = inversifyExpress.build()
        this.handleError()
    }

    /**
     * Initializes error routes available in the application.
     *
     * @private
     * @return void
     */
    private handleError(): void {
        // Handle 404
        this.express.use((req: Request, res: Response) => {
            const errorMessage: ApiException = new ApiException(404, `${req.url} not found.`,
                `Specified resource: ${req.url} was not found or does not exist.`)
            res.status(HttpStatus.NOT_FOUND).send(errorMessage.toJson())
        })

        // Handle 500
        this.express.use((err: any, req: Request, res: Response) => {
            res.locals
            const errorMessage: ApiException = new ApiException(err.code, err.message, err.description)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(errorMessage.toJson())
        })
    }
}
