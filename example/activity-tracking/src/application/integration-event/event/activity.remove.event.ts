import { IntegrationEvent } from './integration.event'

export class ActivityRemoveEvent extends IntegrationEvent {

    constructor(readonly event_name: string, readonly timestamp: Date, readonly id_activity: string) {
        super(event_name, timestamp)
    }
}
