import { inject, injectable } from 'inversify'
import { User } from '../../application/domain/model/user'
import { Identifier } from '../../di/identifiers'
import { IUserRepository } from '../../application/port/user.repository.interface'
import { UserEntity } from '../entity/user.entity'
import { BaseRepository } from './base/base.repository'
import { IEntityMapper } from '../entity/mapper/entity.mapper.interface'
import { Query } from './query/query'
import { IQuery } from '../../application/port/query.interface'
import { ILogger } from '../../utils/custom.logger'
import { IEventBus } from '../port/event.bus.interface'
import { UserSaveEvent } from '../../application/integration-event/event/user.save.event'

/**
 * Implementation of the user repository.
 *
 * @implements {IUserRepository}
 */
@injectable()
export class UserRepository extends BaseRepository<User, UserEntity> implements IUserRepository {
    constructor(
        @inject(Identifier.USER_REPO_MODEL) protected readonly userModel: any,
        @inject(Identifier.USER_ENTITY_MAPPER) protected readonly userMapper: IEntityMapper<User, UserEntity>,
        @inject(Identifier.RABBITMQ_EVENT_BUS) protected readonly _rabbitMQEventBus: IEventBus,
        @inject(Identifier.LOGGER) protected readonly logger: ILogger
    ) {
        super(userModel, userMapper, logger)
    }

    public create(item: User): Promise<User> {
        const itemNew: UserEntity = this.mapper.transform(item)
        return new Promise<User>((resolve, reject) => {
            this.Model.create(itemNew)
                .then(result => {
                    resolve(this.mapper.transform(result))
                    this.logger.info('Publish user on message bus...')
                    this._rabbitMQEventBus.publish(
                        new UserSaveEvent('UserSaveEvent', new Date(), result),
                        'users.save'
                    )
                })
                .catch(err => reject(super.mongoDBErrorListener(err)))
        })
    }

    /**
     * Retrieves the user by your email.
     *
     * @param e User email.
     * @param query Defines object to be used for queries.
     * @return {Promise<User>}
     * @throws {RepositoryException}
     */
    public async getByEmail(e: string, query: IQuery): Promise<User> {
        query.filters = { email: e }
        return super.findOne(query)
    }

    /**
     * Checks if an user already has a registration.
     * What differs one user to another is your email.
     *
     * @param user
     * @return {Promise<boolean>} True if it exists or False, otherwise.
     * @throws {ValidationException | RepositoryException}
     */
    public checkExist(user: User): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const email: any = user.getEmail() ? user.getEmail() : ''
            this.getByEmail(email, new Query())
                .then((result: User) => {
                    if (result) return resolve(true)
                    return resolve(false)
                }).catch(err => reject(super.mongoDBErrorListener(err)))
        })
    }
}
