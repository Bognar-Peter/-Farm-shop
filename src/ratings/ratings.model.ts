import { model, Schema } from "mongoose";

import IRating from "./ratings.interface";

const ratingSchema = new Schema<IRating>(
    {
        star: Number,
        comment: String,
    },
    { versionKey: false, timestamps: true },
);

const ratingModel = model<IRating>("Rating", ratingSchema, "ratings");

export default ratingModel;
