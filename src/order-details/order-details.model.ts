import { model, Schema } from "mongoose";

import IOrderDetail from "./order-details.interface";

// https://mongoosejs.com/docs/validation.html
const partnerSchema = new Schema<IOrderDetail>(
    {
        price: Number,
        quantity: {
            type: Number,
            min: [1, "A megrendelt mennyidség nullánál nagyobb"],
        },
        order_id: {
            ref: "Order",
            type: Schema.Types.ObjectId,
        },
        product_id: {
            ref: "Product",
            type: Schema.Types.ObjectId,
        },
    },
    { versionKey: false, timestamps: true },
);

const partnerModel = model<IOrderDetail>("Partner", partnerSchema, "partners");

export default partnerModel;
