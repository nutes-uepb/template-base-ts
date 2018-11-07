import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IActivityRepository } from '../../application/port/activity.repository.interface'
import { Activity } from '../../application/domain/model/activity'
import { ActivityEntity } from '../entity/activity.entity'
import { BaseRepository } from './base/base.repository'
import { IEntityMapper } from '../entity/mapper/entity.mapper.interface'
import { IQuery } from '../../application/port/query.interface'
import { Query } from './query/query'
import { IEventBus } from '../port/event.bus.interface'
import { ILogger } from '../../utils/custom.logger'

/**
 * Implementation of the activity repository.
 *
 * @implements {IActivityRepository}
 */
@injectable()
export class ActivityRepository extends BaseRepository<Activity, ActivityEntity> implements IActivityRepository {
    constructor(
        @inject(Identifier.ACTIVITY_REPO_MODEL) protected readonly activityModel: any,
        @inject(Identifier.ACTIVITY_ENTITY_MAPPER)  protected readonly activityMapper: IEntityMapper<Activity, ActivityEntity>,
        @inject(Identifier.RABBITMQ_EVENT_BUS)  protected readonly _rabbitMQEventBus: IEventBus,
        @inject(Identifier.LOGGER) protected readonly logger: ILogger
    ) {
        super(activityModel, activityMapper, logger)
    }

    /**
     * @override
     */
    public create(item: Activity): Promise<Activity> {
        const activity: ActivityEntity = this.activityMapper.transform(item)
        return new Promise<Activity>((resolve, reject) => {
            this.Model.create(activity)
                .then((result) => {
                    result.populate('user').execPopulate()
                        .then((res) => resolve(this.activityMapper.transform(res)))
                })
                .catch(err => reject(super.mongoDBErrorListener(err)))
        })
    }

    /**
     * @override
     */
    public find(query: IQuery): Promise<Array<Activity>> {
        const q: any = query.serialize()
        return new Promise<Array<Activity>>((resolve, reject) => {
            this.Model.find(q.filters)
                .select(q.fields)
                .populate('user')
                .sort(q.ordination)
                .skip(Number((q.pagination.limit * q.pagination.page) - q.pagination.limit))
                .limit(Number(q.pagination.limit))
                .exec() // execute query
                .then((result: Array<ActivityEntity>) => {
                    resolve(result.map(item => this.activityMapper.transform(item)))
                })
                .catch(err => reject(super.mongoDBErrorListener(err)))
        })
    }

    /**
     * @override
     */
    public findOne(query: IQuery): Promise<Activity> {
        const q: any = query.serialize()
        return new Promise<Activity>((resolve, reject) => {
            this.Model.findOne(q.filters)
                .select(q.fields)
                .populate('user')
                .exec()
                .then((result: ActivityEntity) => {
                    if (!result) return resolve(undefined)
                    return resolve(this.activityMapper.transform(result))
                })
                .catch(err => reject(super.mongoDBErrorListener(err)))
        })
    }

    /**
     * @override
     */
    public update(item: Activity): Promise<Activity> {
        const activity: ActivityEntity = this.activityMapper.transform(item)
        return new Promise<Activity>((resolve, reject) => {
            this.Model.findOneAndUpdate({ _id: item.getId() }, activity, { new: true })
                .exec()
                .then(result => {
                    if (!result) return resolve(undefined)
                    result.populate('user')
                        .execPopulate()
                        .then((res) => resolve(this.activityMapper.transform(res)))
                })
                .catch(err => reject(super.mongoDBErrorListener(err)))
        })
    }

    /**
     * Checks if an activity already has a registration.
     * What differs from one activity to another is the start date and associated user.
     *
     * @param activity
     * @return {Promise<boolean>} True if it exists or False, otherwise
     * @throws {ValidationException | RepositoryException}
     */
    public async checkExist(activity: Activity): Promise<boolean> {
        const query: Query = new Query()
        return new Promise<boolean>((resolve, reject) => {
            if (activity.getStartTime() && activity.getUser()) {
                query.filters = { start_time: activity.getStartTime(), user: activity.getUser().getId() }
            }
            super.findOne(query)
                .then((result: Activity) => {
                    if (result) return resolve(true)
                    return resolve(false)
                })
                .catch(err => reject(super.mongoDBErrorListener(err)))
        })
    }
}
