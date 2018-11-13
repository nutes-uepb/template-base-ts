import { injectable } from 'inversify'
import { IRepository } from '../../../application/port/repository.interface'
import { RepositoryException } from '../../../application/domain/exception/repository.exception'
import { Entity } from '../../../application/domain/model/entity'
import { ValidationException } from '../../../application/domain/exception/validation.exception'
import { ConflictException } from '../../../application/domain/exception/conflict.exception'
import { IEntityMapper } from '../../entity/mapper/entity.mapper.interface'
import { IQuery } from '../../../application/port/query.interface'
import { ILogger } from '../../../utils/custom.logger'

/**
 * Base implementation of the repository.
 *
 * @implements {IRepository<T>}
 * @template <T extends Entity, TModel extends Document>
 */
@injectable()
export abstract class BaseRepository<T extends Entity, TModel> implements IRepository<T> {

    protected constructor(
        protected readonly Model: any,
        protected readonly mapper: IEntityMapper<T, TModel>,
        private readonly _logger: ILogger
    ) {
    }

    public create(item: T): Promise<T> {
        const itemNew: TModel = this.mapper.transform(item)
        return new Promise<T>((resolve, reject) => {
            this.Model.create(itemNew)
                .then((result: TModel) => resolve(this.mapper.transform(result)))
                .catch(err => reject(this.mongoDBErrorListener(err)))
        })
    }

    public find(query: IQuery): Promise<Array<T>> {
        const q: any = query.serialize()
        return new Promise<Array<T>>((resolve, reject) => {
            this.Model.find(q.filters)
                .select(q.fields)
                .sort(q.ordination)
                .skip(Number((q.pagination.limit * q.pagination.page) - q.pagination.limit))
                .limit(Number(q.pagination.limit))
                .exec() // execute query
                .then((result: any) => resolve(result.map(item => this.mapper.transform(item))))
                .catch(err => reject(this.mongoDBErrorListener(err)))
        })
    }

    public findOne(query: IQuery): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.Model.findOne(query.serialize().filters)
                .select(query.serialize().fields)
                .exec()
                .then((result: TModel) => {
                    if (!result) return resolve(undefined)
                    return resolve(this.mapper.transform(result))
                })
                .catch(err => reject(this.mongoDBErrorListener(err)))
        })
    }

    public update(item: T): Promise<T> {
        const itemUp: T = this.mapper.transform(item)
        return new Promise<T>((resolve, reject) => {
            this.Model.findOneAndUpdate({ _id: itemUp.getId() }, itemUp, { new: true })
                .exec()
                .then(result => {
                    if (!result) return resolve(undefined)
                    return resolve(this.mapper.transform(result))
                })
                .catch(err => reject(this.mongoDBErrorListener(err)))
        })
    }

    public delete(id: string | number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.Model.findOneAndDelete({ _id: id })
                .exec()
                .then(result => {
                    if (!result) return resolve(false)
                    resolve(true)
                })
                .catch(err => reject(this.mongoDBErrorListener(err)))
        })
    }

    public count(query: IQuery): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.Model.estimatedDocumentCount(query.serialize().filters)
                .exec()
                .then(result => resolve(Number(result)))
                .catch(err => reject(this.mongoDBErrorListener(err)))
        })
    }

    protected mongoDBErrorListener(err: any): ValidationException | ConflictException | RepositoryException {
        if (err && err.name) {
            this._logger.error(err.message)

            if (err.name === 'ValidationError') {
                return new ValidationException('Required fields were not provided!', err.message)
            }

            if (err.name === 'CastError') {
                return new ValidationException('The given ID is not in valid format.',
                    'A 12 bytes hexadecimal ID similar to this')
            }

            if (err.name === 'MongoError' && err.code === 11000) {
                return new ConflictException('A registration with the same unique data already exists!')
            }

            if (err.name === 'ObjectParameterError') {
                return new ValidationException('Invalid query parameters!')
            }
        }
        return new RepositoryException('An internal error has occurred in the database!',
            'Please try again later...')
    }
}
