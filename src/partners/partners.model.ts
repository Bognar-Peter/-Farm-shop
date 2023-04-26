import { model, Schema } from "mongoose";

import IPartner from "./partners.interface";

const partnerSchema = new Schema<IPartner>(
    {
        name: String,
        address: String,
        email: String,
        phone_number: String,
        user_id: {
            ref: "User",
            type: Schema.Types.ObjectId,
        }
    },
    { versionKey: false, timestamps: true },
);

const partnerModel = model<IPartner>("Partner", partnerSchema, "partners");

export default partnerModel;
