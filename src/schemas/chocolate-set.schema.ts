import mongoose, { Schema } from "mongoose";

const ChocolateSet = new Schema(
    {
        uniqueId: { type: String, unique: true },
    }
)

const ChocolateSetSchema = mongoose.model('ChocolateSet', ChocolateSet);
export default ChocolateSetSchema;