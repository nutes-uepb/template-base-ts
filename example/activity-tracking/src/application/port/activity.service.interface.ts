import { IService } from './service.interface'
import { Activity } from '../domain/model/activity'

/**
 * Activity service interface.
 *
 * @extends {IService}
 */
export interface IActivityService extends IService<Activity> {
}
