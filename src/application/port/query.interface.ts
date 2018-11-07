import { ISerializable } from '../domain/utils/serializable.interface'

/**
 * Query interface.
 *
 * @extends {ISerializable<IQuery>}
 */
export interface IQuery extends ISerializable<IQuery> {
    fields: Array<string>
    ordination: Map<string, string>
    pagination: IPagination
    filters: object | string
}

/**
 * Pagination interface.
 *
 * @extends {ISerializable<IQuery>}
 */
export interface IPagination extends ISerializable<IPagination> {
    page: number
    limit: number
}
