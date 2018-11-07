export class UserEntity {
    private id?: string
    private name?: string
    private email?: string
    private created_at?: Date

    public getId(): string | undefined {
        return this.id
    }

    public setId(value: string | undefined) {
        this.id = value
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
}
