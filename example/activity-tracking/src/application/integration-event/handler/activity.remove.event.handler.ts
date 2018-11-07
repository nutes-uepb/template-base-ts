import { ActivityRemoveEvent } from '../event/activity.remove.event'
import { inject } from 'inversify'
import { Identifier } from '../../../di/identifiers'
import { IActivityService } from '../../port/activity.service.interface'
import { IIntegrationEventHandler } from './integration.event.handler.interface'

export class ActivityRemoveEventHandler implements IIntegrationEventHandler<ActivityRemoveEvent> {

    /**
     * Creates an instance of ActivityRemoveEventHandler.
     *
     * @param {IActivityService} activityService
     */
    constructor(@inject(Identifier.ACTIVITY_SERVICE) readonly activityService: IActivityService) {
    }

    public handle(event: ActivityRemoveEvent): void {
        const id_activity: string = event.id_activity

        this.activityService.remove(id_activity)
            .then((res: boolean) => {
                // console.log('ActivityRemoveEvent Success!', res)
            })
            .catch(err => {
                // console.log('ActivityRemoveEvent Error:', err.message)
            })
    }
}
