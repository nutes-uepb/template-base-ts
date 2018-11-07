import 'reflect-metadata'
import { Container } from 'inversify'
import { HomeController } from '../ui/controllers/home.controller'
import { Identifier } from './identifiers'
import { UserController } from '../ui/controllers/user.controller'
import { ActivityController } from '../ui/controllers/activity.controller'
import { IUserService } from '../application/port/user.service.interface'
import { UserService } from '../application/service/user.service'
import { IActivityService } from '../application/port/activity.service.interface'
import { ActivityService } from '../application/service/activity.service'
import { IUserRepository } from '../application/port/user.repository.interface'
import { UserRepository } from '../infrastructure/repository/user.repository'
import { IActivityRepository } from '../application/port/activity.repository.interface'
import { ActivityRepository } from '../infrastructure/repository/activity.repository'
import { UserEntity } from '../infrastructure/entity/user.entity'
import { ActivityEntity } from '../infrastructure/entity/activity.entity'
import { UserRepoModel } from '../infrastructure/database/schema/user.schema'
import { TaskRepoModel } from '../infrastructure/database/schema/activity.schema'
import { UserEntityMapper } from '../infrastructure/entity/mapper/user.entity.mapper'
import { ActivityEntityMapper } from '../infrastructure/entity/mapper/activity.entity.mapper'
import { IEntityMapper } from '../infrastructure/entity/mapper/entity.mapper.interface'
import { User } from '../application/domain/model/user'
import { RabbitMQConnectionFactory } from '../infrastructure/eventbus/rabbitmq/rabbitmp.connection.factory'
import { RabbitMQConnection } from '../infrastructure/eventbus/rabbitmq/rabbitmq.connection'
import { EventBusRabbitMQ } from '../infrastructure/eventbus/rabbitmq/eventbus.rabbittmq'
import { MongoDBConnectionFactory } from '../infrastructure/database/mongodb.connection.factory'
import { MongoDBConnection } from '../infrastructure/database/mongodb.connection'
import { IDBConnection } from '../infrastructure/port/db.connection.interface'
import { IRabbitMQConnection } from '../infrastructure/port/rabbitmq.connection.interface'
import { IConnectionFactory } from '../infrastructure/port/connection.factory.interface'
import { IEventBus } from '../infrastructure/port/event.bus.interface'
import { Activity } from '../application/domain/model/activity'
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
        this.container.bind<UserController>(Identifier.USER_CONTROLLER).to(UserController).inSingletonScope()
        this.container.bind<ActivityController>(Identifier.ACTIVITY_CONTROLLER).to(ActivityController).inSingletonScope()

        // Services
        this.container.bind<IUserService>(Identifier.USER_SERVICE).to(UserService).inSingletonScope()
        this.container.bind<IActivityService>(Identifier.ACTIVITY_SERVICE).to(ActivityService).inSingletonScope()

        // Repositories
        this.container
            .bind<IUserRepository>(Identifier.USER_REPOSITORY)
            .to(UserRepository).inSingletonScope()
        this.container
            .bind<IActivityRepository>(Identifier.ACTIVITY_REPOSITORY)
            .to(ActivityRepository).inSingletonScope()

        // Models
        this.container.bind(Identifier.USER_ENTITY).toConstantValue(UserEntity)
        this.container.bind(Identifier.ACTIVITY_ENTITY).toConstantValue(ActivityEntity)
        this.container.bind(Identifier.USER_REPO_MODEL).toConstantValue(UserRepoModel)
        this.container.bind(Identifier.ACTIVITY_REPO_MODEL).toConstantValue(TaskRepoModel)

        // Mappers
        this.container
            .bind<IEntityMapper<User, UserEntity>>(Identifier.USER_ENTITY_MAPPER)
            .to(UserEntityMapper).inSingletonScope()
        this.container
            .bind<IEntityMapper<Activity, ActivityEntity>>(Identifier.ACTIVITY_ENTITY_MAPPER)
            .to(ActivityEntityMapper).inSingletonScope()

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
