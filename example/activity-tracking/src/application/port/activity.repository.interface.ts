import { IRepository } from './repository.interface'
import { Activity } from '../domain/model/activity'

/**
 * Interface of the activity repository.
 * Must be implemented by the user repository at the infrastructure layer.
 *
 * @see {@link ActivityRepository} for further information.
 * @extends {IRepository<Activity>}
 */
export interface IActivityRepository extends IRepository<Activity> {
    /**
     * Checks if an activity already has a registration.
     * What differs from one activity to another is the start date and associated user.
     *
     * @param activity
     * @return {Promise<boolean>} True if it exists or False, otherwise
     * @throws {ValidationException | RepositoryException}
     */
    checkExist(activity: Activity): Promise<boolean>
}
