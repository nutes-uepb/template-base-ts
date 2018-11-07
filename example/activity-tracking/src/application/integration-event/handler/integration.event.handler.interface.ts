import { IntegrationEvent } from '../event/integration.event'

export interface IIntegrationEventHandler<T extends IntegrationEvent> {
    handle(event: T): void
}
