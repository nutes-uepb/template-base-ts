import { injectable } from 'inversify'
import { ActivityEntity } from '../activity.entity'
import { Activity } from '../../../application/domain/model/activity'
import { UserEntityMapper } from './user.entity.mapper'
import { IEntityMapper } from './entity.mapper.interface'

@injectable()
export class ActivityEntityMapper implements IEntityMapper<Activity, ActivityEntity> {

    public transform(item: any): any {
        if (item instanceof Activity) return this.modelToModelEntity(item)
        if (item instanceof ActivityEntity) return this.modelEntityToModel(item)
        return this.jsonToModel(item) // json
    }

    /**
     * Convert {Activity} for {ActivityEntity}.
     *
     * @see Before setting the value, it is important to verify that the type is valid.
     * Therefore, you do not run the risk that in an UPDATE / PATCH action type,
     * attributes that should not be updated are saved with null values.
     * @see Creation Date should not be mapped to the type the repository understands.
     * Because this attribute is created automatically by the database.
     * Therefore, if a null value is passed at update time, an exception is thrown.
     * @param item
     */
    public modelToModelEntity(item: Activity): ActivityEntity {
        const result: ActivityEntity = new ActivityEntity()

        if (item.getId()) result.setId(item.getId())
        if (item.getName()) result.setName(item.getName())
        if (item.getStartTime()) result.setStartTime(item.getStartTime())
        if (item.getEndTime()) result.setEndTime(item.getEndTime())
        if (item.getDuration()) result.setDuration(item.getDuration())
        if (item.getMaxIntensity()) result.setMaxIntensity(item.getMaxIntensity())
        if (item.getMaxIntensityDuration()) result.setMaxIntensityDuration(item.getMaxIntensityDuration())
        if (item.getCalories()) result.setCalories(item.getCalories())
        if (item.getSteps()) result.setSteps(item.getSteps())
        if (item.getUser() && item.getUser().getId()) result.setUser(item.getUser().getId())

        return result
    }

    /**
     * Convert {ActivityEntity} for {Activity}.
     *
     * @see Each attribute must be mapped only if it contains an assigned value,
     * because at some point the attribute accessed may not exist.
     * @param item
     */
    public modelEntityToModel(item: ActivityEntity): Activity {
        const result: Activity = new Activity()

        result.setId(item.getId())
        result.setName(item.getName())
        result.setStartTime(item.getStartTime())
        result.setEndTime(item.getEndTime())
        result.setDuration(item.getDuration())
        result.setMaxIntensity(item.getMaxIntensity())
        result.setMaxIntensityDuration(item.getMaxIntensityDuration())
        result.setCalories(item.getCalories())
        result.setSteps(item.getSteps())
        result.setCreatedAt(item.getCreatedAt())
        result.setUser(new UserEntityMapper().transform(item.getUser()))

        return result
    }

    /**
     * Convert JSON for Activity.
     *
     * @see Each attribute must be mapped only if it contains an assigned value,
     * because at some point the attribute accessed may not exist.
     * @param json
     */
    public jsonToModel(json: any): Activity {
        const result: Activity = new Activity()

        if (!json) return result
        if (json.id !== undefined) result.setId(json.id)
        if (json.name !== undefined) result.setName(json.name)
        if (json.start_time !== undefined) result.setStartTime(new Date(json.start_time))
        if (json.end_time !== undefined) result.setEndTime(new Date(json.end_time))
        if (json.duration !== undefined) result.setDuration(Number(json.duration))
        if (json.max_intensity !== undefined) result.setMaxIntensity(json.max_intensity)
        if (json.max_intensity_duration !== undefined) result.setMaxIntensityDuration(Number(json.max_intensity_duration))
        if (json.calories !== undefined) result.setCalories(Number(json.calories))
        if (json.steps !== undefined) result.setSteps(Number(json.steps))
        if (json.created_at !== undefined) result.setCreatedAt(new Date(json.created_at))
        if (json.user !== undefined) result.setUser(new UserEntityMapper().transform(json.user))

        return result
    }
}
