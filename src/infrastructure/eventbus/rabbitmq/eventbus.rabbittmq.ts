import { inject, injectable } from 'inversify'
import { Exchange, Message, Queue } from 'amqp-ts'
import { IEventBus } from '../../port/event.bus.interface'
import { IRabbitMQConnection } from '../../port/rabbitmq.connection.interface'
import { Default } from '../../../utils/default'
import { IntegrationEvent } from '../../../application/integration-event/event/integration.event'
import { IIntegrationEventHandler } from '../../../application/integration-event/handler/integration.event.handler.interface'
import { Identifier } from '../../../di/identifiers'
import { IDisposable } from '../../port/disposable.interface'
import StartConsumerResult = Queue.StartConsumerResult
import { ILogger } from '../../../utils/custom.logger'

@injectable()
export class EventBusRabbitMQ implements IEventBus, IDisposable {
    private event_handlers: Map<string, IIntegrationEventHandler<IntegrationEvent>>
    private queue_consumer: boolean
    private queue!: Queue

    constructor(
        @inject(Identifier.RABBITMQ_CONNECTION) private _connection: IRabbitMQConnection,
        @inject(Identifier.LOGGER) private readonly _logger: ILogger
    ) {
        this.event_handlers = new Map()
        this.queue_consumer = false
    }

    /**
     * Publish in topic.
     *
     * @param event {IntegrationEvent}
     * @param routing_key {string}
     * @return {Promise<void>}
     */
    public async publish(event: IntegrationEvent, routing_key: string): Promise<void> {
        if (!this._connection.isConnected) await this._connection.tryConnect()
        if (!this._connection.conn) return

        await this._connection.conn.completeConfiguration()

        const exchange: Exchange = this._connection.conn.declareExchange(
            this.getBrokerName(), 'topic', { durable: true }) // name, type, options
        exchange.send(new Message(event), routing_key) // message, key

        this._logger.info(`Publish event: ${event.event_name}`)
    }

    /**
     * Subscribe in topic.
     *
     * @param event {IntegrationEvent}
     * @param handler {IIntegrationEventHandler<IntegrationEvent>}
     * @param routing_key {string}
     *
     * @return {Promise<void>}
     */
    public async subscribe(event: IntegrationEvent, handler: IIntegrationEventHandler<IntegrationEvent>,
                           routing_key: string): Promise<void> {
        if (!this._connection.isConnected) await this._connection.tryConnect()
        if (this.event_handlers.has(event.event_name) || !this._connection.conn) return

        this.queue = this._connection.conn.declareQueue(this.getQueueName(), { durable: true })
        const exchange: Exchange = this._connection.conn.declareExchange(
            this.getBrokerName(), 'topic', { durable: true }) // name, type, options
        this.event_handlers.set(event.event_name, handler)

        await this.queue.bind(exchange, routing_key)
        await this.internalSubscribe()

        this._logger.info(`Subscribe event: ${event.event_name}`)
    }

    /**
     * Internal Subscribe.
     * Ensures that the queue will only be consumed once.
     * Events handle are returned for the specific subscribe.
     *
     * @return Promise<void>
     */
    private async internalSubscribe(): Promise<void> {
        if (!this.queue) return

        if (!this.queue_consumer) {
            this.queue_consumer = true
            await this.queue
                .activateConsumer((message: Message) => {
                    // console.log('onMessage', message.getContent())
                    this._logger.info(`Bus event message received: ${message.getContent()}`)

                    const event_name: string = message.getContent().event_name
                    if (event_name) {
                        const event_handler: IIntegrationEventHandler<IntegrationEvent> | undefined =
                            this.event_handlers.get(event_name)
                        if (event_handler) {
                            event_handler.handle(message.getContent())
                        }
                    }
                }, { noAck: true })
                .then((result: StartConsumerResult) => {
                    this._logger.info('Queue consumer successfully created!')
                })
        }
    }

    /**
     * Retrieve the name of the broker.
     *
     * @return {string}
     */
    private getBrokerName(): string {
        return process.env.RABBITMQ_BROKER_NAME || Default.RABBITMQ_BROKER_NAME
    }

    /**
     * Retrieve the queue name.
     *
     * @return {string}
     */
    private getQueueName(): string {
        return process.env.RABBITMQ_QUEUE_NAME || Default.RABBITMQ_QUEUE_NAME
    }

    /**
     * Releases the resources.
     *
     * @return {Promise<void>}
     */
    public async dispose(): Promise<void> {
        if (this.queue) {
            await this.queue.stopConsumer()
            await this.queue.close()
        }
        if (this._connection.conn) await this._connection.conn.close()
        this._connection.conn = undefined
    }
}
