/**
 * Class that defines variables with default values.
 *
 * @see Variables defined in .env will have preference.
 * @see Be careful not to put critical data in this file as it is not in .gitignore.
 * Sensitive data such as database, passwords and keys should be stored in secure locations.
 *
 * @abstract
 */
export abstract class Default {
    public static readonly APP_TITLE: string = 'Activity Tracking Service'
    public static readonly APP_DESCRIPTION: string = 'Micro-service for tracking activities, implemented ' +
        'following principles of clean architecture proposed by Robert C. Martin.'
    public static readonly NODE_ENV: string = 'development' // development, test, production
    public static readonly PORT_HTTP: number = 80
    public static readonly PORT_HTTPS: number = 443
    public static readonly SWAGGER_PATH: string = './src/ui/swagger/api.yaml'

    // MongoDB
    public static readonly MONGODB_URI: string = 'mongodb://127.0.0.1:27017/activity-tracking'
    public static readonly MONGODB_URI_TEST: string = 'mongodb://127.0.0.1:27017/activity-tracking-test'
    public static readonly MONGODB_CON_RETRY_COUNT: number = 0 // infinite
    public static readonly MONGODB_CON_RETRY_INTERVAL: number = 1000 // 1s

    // RabbitMQ
    public static readonly RABBITMQ_AMQP_URI: string = 'amqp://127.0.0.1:5672'
    public static readonly RABBITMQ_BROKER_NAME: string = 'activity-tracking-service'
    public static readonly RABBITMQ_QUEUE_NAME: string = 'task_queue'
    public static readonly RABBITMQ_CON_RETRY_COUNT: number = 0 // infinite
    public static readonly RABBITMQ_CON_RETRY_INTERVAL: number = 1000 // 1s

    // Log
    public static readonly LOG_DIR: string = 'logs'
}
