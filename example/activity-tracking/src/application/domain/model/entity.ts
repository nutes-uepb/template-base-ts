/**
 * Implementation of generic entity.
 * Theoretically, the other entity must inherit it.
 *
 * @abstract
 */
export class Entity {
    private id?: string

    protected constructor(id?: string) {
        this.id = id
    }

    public getId(): string | undefined {
        return this.id
    }

    public setId(value: string | undefined) {
        if (value) this.id = value
    }
}
