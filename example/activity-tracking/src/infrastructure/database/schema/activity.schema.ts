import Mongoose from 'mongoose'

interface IActivitykModel extends Mongoose.Document {
}

const activitySchema = new Mongoose.Schema({
        name: {
            type: String,
            required: 'Name of activity is required!'
        },
        start_time: {
            type: Date,
            required: 'Activity start time is required!',
        },
        end_time: { type: Date },
        duration: {
            type: Number,
            required: 'Duration of activity is required!'
        },
        max_intensity: { type: String },
        max_intensity_duration: { type: Number },
        calories: {
            type: Number,
            required: 'Calories spent during activity is required!'
        },
        steps: {
            type: Number,
            required: 'Number of steps taken during the activity is required!'
        },
        user: {
            type: Mongoose.Schema.Types.ObjectId, ref: 'User',
            required: 'User required!'
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: false },
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id
                delete ret._id
                delete ret.__v
                delete ret.updatedAt
                return ret
            }
        }
    }
)
activitySchema.index({ user: 1, start_time: 1 }, { unique: true }) // define index at schema level
export const TaskRepoModel = Mongoose.model<IActivitykModel>('Activity', activitySchema)
