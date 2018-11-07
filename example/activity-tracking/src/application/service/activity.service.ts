import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IActivityService } from '../port/activity.service.interface'
import { IActivityRepository } from '../port/activity.repository.interface'
import { Activity } from '../domain/model/activity'
import { ActivityValidator } from '../domain/validator/activity.validator'
import { ConflictException } from '../domain/exception/conflict.exception'
import { IQuery } from '../port/query.interface'

/**
 * Implementing activity Service.
 *
 * @implements {IActivityService}
 */
@injectable()
export class ActivityService implements IActivityService {

    constructor(@inject(Identifier.ACTIVITY_REPOSITORY) private readonly _activityRepository: IActivityRepository) {
    }

    /**
     * Adds a new activity.
     * Before adding, it is checked whether the activity already exists.
     *
     * @param {Activity} activity
     * @returns {(Promise<Activity>)}
     * @throws {ConflictException | RepositoryException} If a data conflict occurs, as an existing activity.
     */
    public async add(activity: Activity): Promise<Activity> {
        ActivityValidator.validate(activity)
        const activityExist = await this._activityRepository.checkExist(activity)
        if (activityExist) throw new ConflictException('Activity is already registered...')
        return this._activityRepository.create(activity)
    }

    /**
     * Get the data of all activity in the infrastructure.
     *
     * @param query Defines object to be used for queries.
     * @return {Promise<Array<Activity>>}
     * @throws {RepositoryException}
     */
    public async getAll(query: IQuery): Promise<Array<Activity>> {
        return this._activityRepository.find(query)
    }

    /**
     * Get in infrastructure the activity data.
     *
     * @param id Unique identifier.
     * @param query Defines object to be used for queries.
     * @return {Promise<Activity>}
     * @throws {RepositoryException}
     */
    public async getById(id: string | number, query: IQuery): Promise<Activity> {
        query.filters = { _id: id }
        return this._activityRepository.findOne(query)
    }

    /**
     * Updates activity data.
     *
     * @param activity - Activity containing the data to be updated
     * @return {Promise<Activity>}
     * @throws {ConflictException | RepositoryException}
     */
    public async update(activity: Activity): Promise<Activity> {
        return this._activityRepository.update(activity)
    }

    /**
     * Removes the activity according to their unique identifier.
     *
     * @param id - Unique identifier.
     * @return {Promise<boolean>}
     * @throws {ValidationException | RepositoryException}
     */
    public async remove(id: string | number): Promise<boolean> {
        return this._activityRepository.delete(id)
    }
}
