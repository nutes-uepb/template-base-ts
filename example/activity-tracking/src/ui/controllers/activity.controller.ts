import HttpStatus from 'http-status-codes'
import { inject } from 'inversify'
import { controller, httpDelete, httpGet, httpPatch, httpPost, request, response } from 'inversify-express-utils'
import { Request, Response } from 'express'
import { Identifier } from '../../di/identifiers'
import { ApiExceptionManager } from '../exceptions/api.exception.manager'
import { Query } from '../../infrastructure/repository/query/query'
import { ApiException } from '../exceptions/api.exception'
import { Activity } from '../../application/domain/model/activity'
import { IActivityService } from '../../application/port/activity.service.interface'
import { User } from '../../application/domain/model/user'
import { ILogger } from '../../utils/custom.logger'

/**
 * Controller that implements Activity feature operations.
 *
 * @remarks To define paths, we use library inversify-express-utils.
 * @see {@link https://github.com/inversify/inversify-express-utils} for further information.
 */
@controller('/users/:user_id/activities')
export class ActivityController {

    /**
     * Creates an instance of Activity controller.
     *
     * @param {IActivityService} _activityService
     * @param {ILogger} _logger
     */
    constructor(
        @inject(Identifier.ACTIVITY_SERVICE) private readonly _activityService: IActivityService,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
    }

    /**
     * Add new activity.
     *
     * @param {Request} req
     * @param {Response} res
     */
    @httpPost('/')
    public async addActivity(@request() req: Request, @response() res: Response) {
        try {
            const user = new User()
            const activity: Activity = new Activity().deserialize(req.body)
            user.setId(req.params.user_id)
            activity.setUser(user)

            const result: Activity = await this._activityService.add(activity)
            return res.status(HttpStatus.CREATED).send(result)
        } catch (err) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJson())
        }
    }

    /**
     * Get all activities.
     * For the query strings, the query-strings-parser middleware was used.
     * @see {@link https://www.npmjs.com/package/query-strings-parser} for further information.
     *
     * @param {Request} req
     * @param {Response} res
     */
    @httpGet('/')
    public async getAllActivities(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result = await this._activityService.getAll(new Query().deserialize(req.query))
            return res.status(HttpStatus.OK).send(result)
        } catch (err) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJson())
        }
    }

    /**
     * Get activity by id.
     * For the query strings, the query-strings-parser middleware was used.
     * @see {@link https://www.npmjs.com/package/query-strings-parser} for further information.
     *
     * @param {Request} req
     * @param {Response} res
     */
    @httpGet('/:activity_id')
    public async getActivityById(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result: Activity = await this._activityService.getById(req.params.activity_id,
                new Query().deserialize(req.query))
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFoundActivity())
            return res.status(HttpStatus.OK).send(result)
        } catch (err) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJson())
        }
    }

    /**
     * Update activity by id.
     *
     * @param {Request} req
     * @param {Response} res
     */
    @httpPatch('/:activity_id')
    public async updateActivity(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const activity: Activity = new Activity().deserialize(req.body)
            activity.setId(req.params.activity_id)
            const result = await this._activityService.update(activity)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFoundActivity())
            return res.status(HttpStatus.OK).send(result)
        } catch (err) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJson())
        }
    }

    /**
     * Remove activity by id.
     *
     * @param {Request} req
     * @param {Response} res
     */
    @httpDelete('/:activity_id')
    public async removeActivity(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result: boolean = await this._activityService.remove(req.params.activity_id)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFoundActivity())
            return res.status(HttpStatus.NO_CONTENT).send()
        } catch (err) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJson())
        }
    }

    private getMessageNotFoundActivity(): object {
        return new ApiException(
            HttpStatus.NOT_FOUND,
            'Activity not found!',
            'Activity not found or already removed. A new operation for the same resource is not required!'
        ).toJson()
    }
}
