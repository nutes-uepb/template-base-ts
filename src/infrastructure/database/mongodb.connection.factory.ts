import { injectable } from 'inversify'
import mongoose, { Connection, Mongoose } from 'mongoose'
import { IConnectionFactory } from '../port/connection.factory.interface'
import { Default } from '../../utils/default'

@injectable()
export class MongoDBConnectionFactory implements IConnectionFactory {
    private readonly options: object = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        bufferMaxEntries: 0,
        reconnectTries: this.getRetryCount(),
        reconnectInterval: this.getRetryInterval()
    }

    public createConnection(): Promise<Connection> {
        return new Promise<Connection>((resolve, reject) => {
            mongoose.connect(this.getDBUri(), this.options)
                .then((result: Mongoose) => resolve(result.connection))
                .catch(err => reject(err))
        })
    }

    /**
     * Retrieve the URI for connection to MongoDB.
     *
     * @return {string}
     */
    private getDBUri(): string {
        if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
            return process.env.MONGODB_URI_TEST || Default.MONGODB_URI_TEST
        }
        return process.env.MONGODB_URI || Default.MONGODB_URI
    }

    /**
     * Retrieve the number of retries to reconnect.
     *
     * @return {number}
     */
    private getRetryCount(): number {
        const retryCount = Number(process.env.MONGODB_CON_RETRY_COUNT) || Default.MONGODB_CON_RETRY_COUNT
        return (retryCount === 0) ? Number.MAX_SAFE_INTEGER : retryCount
    }

    /**
     * Retrieve the time interval in ms for a new attempt to reconnect.
     *
     * @return {number}
     */
    private getRetryInterval(): number {
        return Number(process.env.MONGODB_CON_RETRY_INTERVAL) || Default.MONGODB_CON_RETRY_INTERVAL
    }
}
