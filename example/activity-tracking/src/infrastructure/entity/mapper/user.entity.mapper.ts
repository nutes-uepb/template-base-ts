import { injectable } from 'inversify'
import { User } from '../../../application/domain/model/user'
import { UserEntity } from '../user.entity'
import { IEntityMapper } from './entity.mapper.interface'

@injectable()
export class UserEntityMapper implements IEntityMapper<User, UserEntity> {
    public transform(item: any): any {
        if (item instanceof User) return this.modelToModelEntity(item)
        if (item instanceof UserEntity) return this.modelEntityToModel(item)
        return this.jsonToModel(item) // json
    }

    /**
     * Convert {User} for {UserEntity}.
     *
     * @see Before setting the value, it is important to verify that the type is valid.
     * Therefore, you do not run the risk that in an UPDATE / PATCH action type,
     * attributes that should not be updated are saved with null values.
     * @see Creation Date should not be mapped to the type the repository understands.
     * Because this attribute is created automatically by the database.
     * Therefore, if a null value is passed at update time, an exception is thrown.
     * @param item
     */
    public modelToModelEntity(item: User): UserEntity {
        const result: UserEntity = new UserEntity()
        if (item.getId()) result.setId(item.getId())
        if (item.getName()) result.setName(item.getName())
        if (item.getEmail()) result.setEmail(item.getEmail())
        return result
    }

    /**
     * Convert {UserEntity} for {User}.
     *
     * @see Each attribute must be mapped only if it contains an assigned value,
     * because at some point the attribute accessed may not exist.
     * @param item
     */
    public modelEntityToModel(item: UserEntity): User {
        const result: User = new User()
        result.setId(item.getId())
        if (item.getName()) result.setName(item.getName())
        if (item.getEmail()) result.setEmail(item.getEmail())
        if (item.getCreatedAt()) result.setCreatedAt(item.getCreatedAt())
        return result
    }

    /**
     * Convert JSON for {User}.
     *
     * @see Each attribute must be mapped only if it contains an assigned value,
     * because at some point the attribute accessed may not exist.
     * @param json
     */
    public jsonToModel(json: any): User {
        const result: User = new User()
        if (!json) return result
        if (json.id !== undefined) result.setId(json.id)
        if (json.name !== undefined) result.setName(json.name)
        if (json.email !== undefined) result.setEmail(json.email)
        if (json.created_at !== undefined) result.setCreatedAt(new Date(json.created_at))
        return result
    }
}
