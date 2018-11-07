import sinon from 'sinon'

export class MongoDBModelMock {
    public mock = {
        find: {},
        select: this.select(null)
    }

    public find(conditions: any) {
        return this
    }

    public select(arg: string | any) {
        return this
    }

    public sort(arg: string | any) {
        return this
    }

    public skip(arg: number) {
        return this
    }

    public limit(arg: number) {
        return this
    }

    public exec() {
        return this
    }

    constructor() {
        sinon.stub(this.mock, `find`)
        sinon.stub(this.mock, `select`)
    }
}
