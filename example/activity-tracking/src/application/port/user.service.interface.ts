import { IService } from './service.interface'
import { User } from '../domain/model/user'

/**
 * User service interface.
 *
 * @extends {IService}
 */
export interface IUserService extends IService<User> {
}
