import { IPagination } from '../../../application/port/query.interface'

/**
 * Defines object for pagination, containing page number and bound per page.
 *
 * @implements {IPagination}
 */
export class Pagination implements IPagination {
    private _page!: number
    private _limit!: number

    constructor(page?: number, limit?: number) {
        this.page = (page) ? page : 1
        this.limit = (limit) ? limit : 100
    }

    get page(): number {
        return this._page
    }

    set page(value: number) {
        this._page = value
    }

    get limit(): number {
        return this._limit
    }

    set limit(value: number) {
        this._limit = value
    }

    /**
     * Called as default when the object
     * is displayed in console.log()
     */
    public toJSON(): string {
        return JSON.stringify(this.serialize())
    }

    /**
     * Convert this object to json.
     *
     * @returns {any}
     */
    public serialize(): any {
        return {
            page: this.page,
            limit: this.limit
        }
    }

    /**
     * Transform JSON into Pagination object.
     *
     * @param json
     */
    public deserialize(json: any): Pagination {
        if (!json) return this
        if (json.page) this.page = json.page
        if (json.limit) this.limit = json.limit
        return this
    }
}
