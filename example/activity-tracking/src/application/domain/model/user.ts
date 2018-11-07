// import { ISerializable } from './serializable.interface'
import { Entity } from './entity'
import { ISerializable } from '../utils/serializable.interface'

/**
 * Implementation of the user entity.
 *
 * @extends {Entity}
 * @implements {ISerializable<User>}
 */
export class User extends Entity implements ISerializable<User> {
    private name?: string
    private email?: string
    private created_at?: Date

    constructor(name?: string, email?: string, id?: string) {
        super(id)
        this.setName(name)
        this.setEmail(email)
    }

    public getName(): string | undefined {
        return this.name
    }

    public setName(value: string | undefined) {
        this.name = value
    }

    public getEmail(): string | undefined {
        return this.email
    }

    public setEmail(value: string | undefined) {
        this.email = value
    }

    /**
     * Get registration date.
     * @remarks Date in ISO 8601 format.
     */
    public getCreatedAt(): Date | undefined {
        return this.created_at
    }

    public setCreatedAt(value: Date | undefined) {
        this.created_at = value
    }

    /**
     * Called as default when the object
     * is displayed in console.log()
     */
    public toJSON(): string {
        return this.serialize()
    }

    /**
     * Convert this object to json.
     *
     * @returns {object}
     */
    public serialize(): any {
        return {
            id: super.getId(),
            name: this.name,
            email: this.email,
            created_at: this.created_at ? this.created_at.toISOString() : this.created_at
        }
    }

    /**
     * Transform JSON into User object.
     *
     * @param json
     */
    public deserialize(json: any): User {
        if (!json) return this
        if (typeof json === 'string') json = JSON.parse(json)

        if (json.id) this.setId(json.id)
        if (json.name) this.setName(json.name)
        if (json.email) this.setEmail(json.email)
        if (json.created_at) this.setCreatedAt(new Date(json.created_at))

        return this
    }
}
