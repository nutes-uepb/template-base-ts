import { IntegrationEvent } from './integration.event'
import { User } from '../../domain/model/user'

export class UserSaveEvent extends IntegrationEvent {
    constructor(public event_name: string, public timestamp?: Date, public user?: User) {
        super(event_name, timestamp)
    }
}
