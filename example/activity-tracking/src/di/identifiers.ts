/**
 * Constants used in dependence injection.
 *
 * @abstract
 */
export abstract class Identifier {
    public static readonly APP: any = Symbol.for('App')

    // Controllers
    public static readonly HOME_CONTROLLER: any = Symbol.for('HomeController')
    public static readonly USER_CONTROLLER: any = Symbol.for('UserController')
    public static readonly ACTIVITY_CONTROLLER: any = Symbol.for('ActivityController')

    // Services
    public static readonly USER_SERVICE: any = Symbol.for('UserService')
    public static readonly ACTIVITY_SERVICE: any = Symbol.for('ActivityService')

    // Repositories
    public static readonly USER_REPOSITORY: any = Symbol.for('UserRepository')
    public static readonly ACTIVITY_REPOSITORY: any = Symbol.for('ActivityRepository')

    // Models
    public static readonly USER_REPO_MODEL: any = Symbol.for('UserRepoModel')
    public static readonly ACTIVITY_REPO_MODEL: any = Symbol.for('ActivityRepoModel')
    public static readonly USER_ENTITY: any = Symbol.for('UserEntity')
    public static readonly ACTIVITY_ENTITY: any = Symbol.for('ActivityEntity')

    // Mappers
    public static readonly USER_ENTITY_MAPPER: any = Symbol.for('UserEntityMapper')
    public static readonly ACTIVITY_ENTITY_MAPPER: any = Symbol.for('ActivityEntityMapper')

    // Background Services
    public static readonly RABBITMQ_EVENT_BUS: any = Symbol.for('EventBusRabbitMQ')
    public static readonly RABBITMQ_CONNECTION_FACTORY: any = Symbol.for('RabbitMQConnectionFactory')
    public static readonly RABBITMQ_CONNECTION: any = Symbol.for('RabbitMQConnection')
    public static readonly MONGODB_CONNECTION_FACTORY: any = Symbol.for('MongoDBConnectionFactory')
    public static readonly MONGODB_CONNECTION: any = Symbol.for('MongoDBConnection')
    public static readonly BACKGROUND_SERVICE: any = Symbol.for('BackgroundService')

    // Log
    public static readonly LOGGER: any = Symbol.for('CustomLogger')
}
