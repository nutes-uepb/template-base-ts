import { Entity } from './entity'
import { User } from './user'
import { ISerializable } from '../utils/serializable.interface'

/**
 * Implementation of the activity entity.
 *
 * @extends {Entity}
 * @implements {ISerializable<Activity>}
 */
export class Activity extends Entity implements ISerializable<Activity> {
    private name?: string
    private start_time?: Date
    private end_time?: Date
    private duration?: number
    private max_intensity?: string
    private max_intensity_duration?: number
    private calories?: number
    private steps?: number
    private user!: User
    private created_at?: Date

    constructor(name?: string, start_time?: Date, end_time?: Date, duration?: number, max_intensity?: string,
                max_intensity_duration?: number, calories?: number, steps?: number, user?: User, id?: string) {
        super(id)
        this.name = name
        this.start_time = start_time
        this.end_time = end_time
        this.duration = duration
        this.max_intensity = max_intensity
        this.max_intensity_duration = max_intensity_duration
        this.calories = calories
        this.steps = steps
        this.setUser(user)
    }

    public getName(): string | undefined {
        return this.name
    }

    public setName(value: string | undefined) {
        this.name = value
    }

    public getStartTime(): Date | undefined {
        return this.start_time
    }

    public setStartTime(value: Date | undefined) {
        this.start_time = value
    }

    public getEndTime(): Date | undefined {
        return this.end_time
    }

    public setEndTime(value: Date | undefined) {
        this.end_time = value
    }

    public getDuration(): number | undefined {
        return this.duration
    }

    public setDuration(value: number | undefined) {
        this.duration = value
    }

    public getMaxIntensity(): string | undefined {
        return this.max_intensity
    }

    public setMaxIntensity(value: string | undefined) {
        this.max_intensity = value
    }

    public getMaxIntensityDuration(): number | undefined {
        return this.max_intensity_duration
    }

    public setMaxIntensityDuration(value: number | undefined) {
        this.max_intensity_duration = value
    }

    public getCalories(): number | undefined {
        return this.calories
    }

    public setCalories(value: number | undefined) {
        this.calories = value
    }

    public getSteps(): number | undefined {
        return this.steps
    }

    public setSteps(value: number | undefined) {
        this.steps = value
    }

    public getUser(): User {
        return this.user
    }

    public setUser(value: User | undefined) {
        if (value) this.user = value
    }

    public getCreatedAt(): Date | undefined {
        return this.created_at
    }

    public setCreatedAt(value: Date | undefined) {
        this.created_at = value
    }

    /**
     * Called as default when the object
     * is displayed in console.log()
     */
    public toJSON(): string {
        return this.serialize()
    }

    /**
     * Convert this object to json.
     *
     * @returns {any}
     */
    public serialize(): any {
        return {
            id: this.getId(),
            name: this.name,
            start_time: this.start_time ? this.start_time.toISOString() : this.start_time,
            end_time: this.end_time ? this.end_time.toISOString() : this.end_time,
            duration: this.duration,
            max_intensity: this.max_intensity,
            max_intensity_duration: this.max_intensity_duration,
            calories: this.calories,
            steps: this.steps,
            created_at: this.created_at ? this.created_at.toISOString() : this.created_at,
            user: this.user ? this.user.serialize() : undefined
        }
    }

    /**
     * Transform JSON into Activity object.
     *
     * @param json
     */
    public deserialize(json: any): Activity {
        if (!json) return this
        if (typeof json === 'string') json = JSON.parse(json)

        if (json.id) this.setId(json.id)
        if (json.name) this.name = json.name
        if (json.start_time) this.start_time = new Date(json.start_time)
        if (json.end_time) this.end_time = new Date(json.end_time)
        if (json.duration) this.duration = json.duration
        if (json.max_intensity) this.max_intensity = json.max_intensity
        if (json.max_intensity_duration) this.max_intensity_duration = json.max_intensity_duration
        if (json.calories) this.calories = json.calories
        if (json.steps) this.steps = json.steps
        if (json.created_at) this.created_at = new Date(json.created_at)
        if (json.user) this.user = new User().deserialize(json.user)

        return this
    }
}
