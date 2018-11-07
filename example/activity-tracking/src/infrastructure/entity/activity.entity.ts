export class ActivityEntity {
    private id?: string
    private name?: string
    private start_time?: Date
    private end_time?: Date
    private duration?: number
    private max_intensity?: string
    private max_intensity_duration?: number
    private calories?: number
    private steps?: number
    private user?: string
    private created_at?: Date

    public getId(): string | undefined {
        return this.id
    }

    public setId(value: string | undefined) {
        this.id = value
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

    public getUser(): string | undefined {
        return this.user
    }

    public setUser(value?: string | undefined) {
        if (value) this.user = value
    }

    public getCreatedAt(): Date | undefined {
        return this.created_at
    }

    public setCreatedAt(value: Date | undefined) {
        this.created_at = value
    }
}
