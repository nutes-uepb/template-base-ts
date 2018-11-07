import { IEventBus } from '../../src/infrastructure/port/event.bus.interface'
import { IntegrationEvent } from '../../src/application/integration-event/event/integration.event'
import { IIntegrationEventHandler } from '../../src/application/integration-event/handler/integration.event.handler.interface'

export class EventBusRabbimqMock implements IEventBus {

    public publish(event: IntegrationEvent, routing_key: string): void {
        return
    }

    public subscribe(event: IntegrationEvent, handler: IIntegrationEventHandler<IntegrationEvent>, routing_key: string): void {
        return
    }

    public dispose(): Promise<void> {
        return Promise.resolve()
    }
}
