import { inject } from 'inversify'
import { Identifier } from '../../../di/identifiers'
import { IActivityService } from '../../port/activity.service.interface'
import { IIntegrationEventHandler } from './integration.event.handler.interface'
import { ActivitySaveEvent } from '../event/activity.save.event'
import { Activity } from '../../domain/model/activity'

export class ActivitySaveEventHandler implements IIntegrationEventHandler<ActivitySaveEvent> {

    /**
     * Creates an instance of ActivityRemoveEventHandler.
     *
     * @param {IActivityService} activityService
     */
    constructor(@inject(Identifier.ACTIVITY_SERVICE) readonly activityService: IActivityService) {
    }

    public handle(event: ActivitySaveEvent): void {
        const activity: Activity = new Activity().deserialize(event.activity)
        this.activityService.add(activity)
            .then((result: Activity) => {
                // console.log('ActivitySaveEventHandler success:')
            })
            .catch(err => {
                //  console.log('ActivitySaveEventHandler Error:', err.message)
            })
    }
}
