import { inject, injectable } from 'inversify'
import { Identifier } from '../di/identifiers'
import { IDBConnection } from '../infrastructure/port/db.connection.interface'
import { IEventBus } from '../infrastructure/port/event.bus.interface'
import { CustomLogger } from '../utils/custom.logger'

@injectable()
export class BackgroundService {
    // private readonly _diContainer: Container

    constructor(
        @inject(Identifier.MONGODB_CONNECTION) private _mongodb: IDBConnection,
        @inject(Identifier.RABBITMQ_EVENT_BUS) private _eventBus: IEventBus,
        @inject(Identifier.LOGGER) private _logger: CustomLogger
    ) {
        // this._diContainer = DI.getInstance().getContainer()
    }

    public async startServices(): Promise<void> {
        this._logger.debug('startServices()')
        try {
            await this._mongodb.tryConnect() // Initialize mongodb

            /**
             * Register your events using the event bus instance here.
             */
        } catch (err) {
            this._logger.error('Error initializing services in background: '.concat(err.message))
        }
    }

    public async stopServices(): Promise<void> {
        this._logger.debug('stopServices()')
        try {
            await this._eventBus.dispose()
            await this._mongodb.dispose()
        } catch (err) {
            this._logger.error('Error stopping background services: '.concat(err.message))
        }
    }
}
