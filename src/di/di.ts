import 'reflect-metadata'
import { Container } from 'inversify'
import { HomeController } from '../ui/controllers/home.controller'
import { Identifier } from './identifiers'
import { RabbitMQConnectionFactory } from '../infrastructure/eventbus/rabbitmq/rabbitmp.connection.factory'
import { RabbitMQConnection } from '../infrastructure/eventbus/rabbitmq/rabbitmq.connection'
import { EventBusRabbitMQ } from '../infrastructure/eventbus/rabbitmq/eventbus.rabbittmq'
import { MongoDBConnectionFactory } from '../infrastructure/database/mongodb.connection.factory'
import { MongoDBConnection } from '../infrastructure/database/mongodb.connection'
import { IDBConnection } from '../infrastructure/port/db.connection.interface'
import { IRabbitMQConnection } from '../infrastructure/port/rabbitmq.connection.interface'
import { IConnectionFactory } from '../infrastructure/port/connection.factory.interface'
import { IEventBus } from '../infrastructure/port/event.bus.interface'
import { BackgroundService } from '../background/background.service'
import { App } from '../app'
import { CustomLogger, ILogger } from '../utils/custom.logger'

export class DI {
    private static instance: DI
    private readonly container: Container

    /**
     * Creates an instance of DI.
     *
     * @private
     */
    private constructor() {
        this.container = new Container()
        this.initDependencies()
    }

    /**
     * Recover single instance of class.
     *
     * @static
     * @return {App}
     */
    public static getInstance(): DI {
        if (!this.instance) this.instance = new DI()
        return this.instance
    }

    /**
     * Get Container inversify.
     *
     * @returns {Container}
     */
    public getContainer(): Container {
        return this.container
    }

    /**
     * Initializes injectable containers.
     *
     * @private
     * @return void
     */
    private initDependencies(): void {
        this.container.bind(Identifier.APP).to(App).inSingletonScope()

        // Controllers
        this.container.bind<HomeController>(Identifier.HOME_CONTROLLER).to(HomeController).inSingletonScope()

        // Services

        // Repositories

        // Models

        // Mappers

        // Background Services
        this.container
            .bind<IConnectionFactory>(Identifier.RABBITMQ_CONNECTION_FACTORY)
            .to(RabbitMQConnectionFactory).inSingletonScope()
        this.container
            .bind<IRabbitMQConnection>(Identifier.RABBITMQ_CONNECTION)
            .to(RabbitMQConnection).inSingletonScope()
        this.container
            .bind<IEventBus>(Identifier.RABBITMQ_EVENT_BUS)
            .to(EventBusRabbitMQ).inSingletonScope()
        this.container
            .bind<IConnectionFactory>(Identifier.MONGODB_CONNECTION_FACTORY)
            .to(MongoDBConnectionFactory).inSingletonScope()
        this.container
            .bind<IDBConnection>(Identifier.MONGODB_CONNECTION)
            .to(MongoDBConnection).inSingletonScope()
        this.container
            .bind(Identifier.BACKGROUND_SERVICE)
            .to(BackgroundService).inSingletonScope()

        // Log
        this.container.bind<ILogger>(Identifier.LOGGER).to(CustomLogger).inSingletonScope()
    }
}
