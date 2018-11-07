import { ValidationException } from '../exception/validation.exception'
import { Activity } from '../model/activity'

export class ActivityValidator {
    public static validate(activity: Activity): void | ValidationException {
        const fields: Array<string> = []

        // validate null
        if (!activity.getName()) fields.push('Name')
        if (!activity.getStartTime()) fields.push('Start time')
        if (!activity.getEndTime()) fields.push('End time')
        if (!activity.getDuration()) fields.push('Duration')
        if (!activity.getCalories()) fields.push('Calories')
        if (!activity.getSteps()) fields.push('Steps')

        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Activity validation failed: '.concat(fields.join(', ')).concat(' required!'))
        }
    }
}
