import { DI } from '../di/di'
import { Container, inject, injectable } from 'inversify'
import { Identifier } from '../di/identifiers'
import { IActivityService } from '../application/port/activity.service.interface'
import { ActivitySaveEventHandler } from '../application/integration-event/handler/activity.save.event.handler'
import { ActivitySaveEvent } from '../application/integration-event/event/activity.save.event'
import { IDBConnection } from '../infrastructure/port/db.connection.interface'
import { IEventBus } from '../infrastructure/port/event.bus.interface'
import { CustomLogger } from '../utils/custom.logger'

@injectable()
export class BackgroundService {
    private readonly _diContainer: Container

    constructor(
        @inject(Identifier.MONGODB_CONNECTION) private _mongodb: IDBConnection,
        @inject(Identifier.RABBITMQ_EVENT_BUS) private _eventBus: IEventBus,
        @inject(Identifier.LOGGER) private _logger: CustomLogger
    ) {
        this._diContainer = DI.getInstance().getContainer()
    }

    public async startServices(): Promise<void> {
        this._logger.debug('startServices()')
        try {
            await this._mongodb.tryConnect() // Initialize mongodb

            /**
             * Subscribe in event activity save
             */
            const activitySaveEvent = new ActivitySaveEvent('ActivitySaveEvent', new Date())
            const event_save_handle = new ActivitySaveEventHandler(
                this._diContainer.get<IActivityService>(Identifier.ACTIVITY_SERVICE))
            await this._eventBus.subscribe(activitySaveEvent, event_save_handle, 'users.activities.save')
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

export interface IBackroudTask {

}
