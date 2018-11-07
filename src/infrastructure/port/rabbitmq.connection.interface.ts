export interface IRabbitMQConnection {
    isConnected: boolean

    conn?: any

    tryConnect(): Promise<void>
}
