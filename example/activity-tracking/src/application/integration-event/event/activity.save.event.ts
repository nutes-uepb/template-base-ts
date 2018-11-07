import { Activity } from '../../domain/model/activity'
import { IntegrationEvent } from './integration.event'

export class ActivitySaveEvent extends IntegrationEvent {
    constructor(public event_name: string, public timestamp?: Date, public activity?: Activity) {
        super(event_name, timestamp)
    }
}
