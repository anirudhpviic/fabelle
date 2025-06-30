import mongoose, { Schema } from 'mongoose';

const Logs = new Schema(
    {
        method: String,
        path: String,
        status: Number,
        headers: mongoose.Schema.Types.Mixed,
        body: mongoose.Schema.Types.Mixed,
        query: mongoose.Schema.Types.Mixed,
    },
    {
        timestamps: true,
    }
)


const LogsSchema = mongoose.model('Logs', Logs);
export default LogsSchema;