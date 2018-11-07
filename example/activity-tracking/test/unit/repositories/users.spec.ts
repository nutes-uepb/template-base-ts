import sinon from 'sinon'
import { assert } from 'chai'
import { UserRepository } from '../../../src/infrastructure/repository/user.repository'
import { UserEntityMapper } from '../../../src/infrastructure/entity/mapper/user.entity.mapper'
import { IEventBus } from '../../../src/infrastructure/port/event.bus.interface'
import { EventBusRabbimqMock } from '../../mocks/event.bus.rabbimq.mock'
import { CustomLoggerMock } from '../../mocks/custom.logger.mock'
import { IUserRepository } from '../../../src/application/port/user.repository.interface'
import { UserRepoModel } from '../../../src/infrastructure/database/schema/user.schema'
import { User } from '../../../src/application/domain/model/user'

require('sinon-mongoose')

describe('Repositories: Users', () => {

    const defaultUser: User = new User()
    defaultUser.setId('5b13826de00324086854584a')
    defaultUser.setName('Lorem Ipsum')
    defaultUser.setEmail('loremipsum@mail.com')
    defaultUser.setCreatedAt(new Date())

    const modelFake: any = UserRepoModel
    const eventBusRabbitMQ: IEventBus = new EventBusRabbimqMock()
    // const userRepository: IUserRepository = new UserRepository(modelFake,
    //     new UserEntityMapper(), eventBusRabbitMQ, new CustomLoggerMock())
    const queryMock: any = {
        serialize: () => {
            return {
                fields: {},
                ordination: {},
                pagination: { page: 1, limit: 100 },
                filters: {}
            }
        }
    }

    beforeEach(() => {
        // sinon.stub(modelFake, 'find')
        // sinon.stub(modelFake, 'findById')
        // sinon.stub(modelFake, 'create')
    })

    afterEach(() => {
        // modelFake.find.restore()
        // modelFake.findById.restore()
        // modelFake.create.restore()
    })

    describe('getAll()', () => {
        it('should return a list of users', () => {
            const resultExpected: Array<User> = new Array(defaultUser)

            sinon
                .mock(modelFake)
                .expects('find')
                .chain('select')
                .withArgs({})
                .chain('sort')
                .withArgs()
                .chain('skip')
                .withArgs(0)
                .chain('limit')
                .withArgs(100)
                .chain('exec')
                .resolves(resultExpected)

            const repo: IUserRepository = new UserRepository(modelFake,
                new UserEntityMapper(), eventBusRabbitMQ, new CustomLoggerMock())

            return repo.find(queryMock)
                .then((users: Array<User>) => {
                    assert.equal(users.length, resultExpected.length)
                    assert.equal(users[0], resultExpected[0])
                })
        })

        // context('when there are no registered users', () => {
        //     it('should return error 404 and message: Users not found!', () => {
        //         ModelFake.find
        //             .withArgs({})
        //             .resolves([])

        //         let userRepository = new UserRepository(User)

        //         return userRepository
        //             .find().catch((err: IExceptionError) => {
        //                 assert.equal(err.code, 404)
        //                 assert.equal(err.message, 'Users not found!')
        //             })
        //     })
        // });
    })

    // describe('getById()', () => {
    //     it('should return a user according to its ID', () => {
    //         UserFake.findById
    //             .withArgs(defaultUser._id)
    //             .resolves(defaultUser)

    //         let userRepository = new UserRepository(UserFake)

    //         return userRepository
    //             .getById(defaultUser._id)
    //             .then((user) => {
    //                 assert.isNotEmpty(user)
    //                 assert.equal(user, defaultUser)
    //             })
    //     })

    //     context('When the user is not found', () => {
    //         it('should return error 404 and message: User not found!', () => {
    //             UserFake.findById
    //                 .withArgs(defaultUser._id)
    //                 .resolves(null)

    //             let userRepository = new UserRepository(UserFake)

    //             return userRepository
    //                 .getById(defaultUser._id)
    //                 .catch((err: IExceptionError) => {
    //                     assert.equal(err.code, 404)
    //                     assert.equal(err.message, 'User not found!')
    //                 })
    //         })
    //     })

    //     context('when the user ID is not in the valid format', () => {
    //         it('should return error 400 and message: Invalid parameter!', () => {
    //             let invalidId: string = 'xxxx'
    //             UserFake.findById
    //                 .withArgs(invalidId)
    //                 .rejects({ name: 'CastError' })

    //             let userRepository = new UserRepository(UserFake)

    //             return userRepository
    //                 .getById(invalidId).catch((err: IExceptionError) => {
    //                     assert.equal(err.code, 400)
    //                     assert.equal(err.message, 'Invalid parameter!')
    //                 })
    //         })
    //     })
    // })

    // describe('save()', () => {
    //     it('should return the saved user', () => {
    //         let newUser: IUserModel = new User(defaultUser)

    //         UserFake.create
    //             .withArgs(newUser)
    //             .resolves(defaultUser)

    //         let userRepository = new UserRepository(UserFake)

    //         return userRepository
    //             .save(newUser)
    //             .then((user) => {
    //                 assert.isNotEmpty(user)
    //                 assert.equal(user, defaultUser)
    //             })
    //     })

    //     context('When there are validation errors', () => {
    //         it('should return error 400 for the user with missing required fields', () => {
    //             let newUser: IUserModel = new User({ age: 22 })

    //             UserFake.create
    //                 .withArgs(newUser)
    //                 .rejects({ name: 'ValidationError' })

    //             let userRepository = new UserRepository(UserFake)

    //             return userRepository
    //                 .save(newUser)
    //                 .catch((err: IExceptionError) => {
    //                     assert.equal(err.code, 400)
    //                     assert.equal(err.message, 'Required fields were not included!')
    //                 })
    //         })

    //         it('should return error 409 for the duplicate user', () => {
    //             let newUser: IUserModel = new User(defaultUser)

    //             UserFake.create
    //                 .withArgs(newUser)
    //                 .rejects({ code: 11000 })

    //             let userRepository = new UserRepository(UserFake)

    //             return userRepository
    //                 .save(newUser)
    //                 .catch((err: IExceptionError) => {
    //                     assert.equal(err.code, 409)
    //                     assert.equal(err.message, 'Duplicate data is not allowed!')
    //                 })
    //         })
    //     })
    // })
})
