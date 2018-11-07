/**
 * ISerializable entity.
 * It should be implemented by domain entity.
 *
 * @template T
 */
export interface ISerializable<T> {
    serialize(): any
    deserialize(item: any): T
}
