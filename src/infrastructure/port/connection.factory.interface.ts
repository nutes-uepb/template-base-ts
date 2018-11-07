export interface IConnectionFactory {
    createConnection(): Promise<any>
}
