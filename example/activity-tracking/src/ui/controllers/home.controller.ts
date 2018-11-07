import { controller, httpGet, request, response } from 'inversify-express-utils'
import { Request, Response } from 'express'

/**
 * Controller that implements Home feature operations.
 * @remarks
 * To define paths, we use library inversify-express-utils.
 *
 * @see {@link https://github.com/inversify/inversify-express-utils} for further information.
 */
@controller('/')
export class HomeController {
    /**
     * List APIRest information.
     *
     * @returns void
     */
    @httpGet('/')
    public getReference(@request() req: Request, @response() res: Response): void {
        return res.redirect('/api/v1/reference')
    }
}
