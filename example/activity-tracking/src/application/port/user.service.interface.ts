import { User } from 'application/domain/model/user'
import { IService } from './service.interface'

/**
 * User service interface.
 *
 * @extends {IService}
 */
export interface IUserService extends IService<User> {
}
