import { model, Schema } from "mongoose";

import IOrder from "./orders.interface";

const orderSchema = new Schema<IOrder>(
    {
        ship_date: String,
        order_date: String,
        user_id: {
            ref: "User",
            type: Schema.Types.ObjectId,
        },
    },
    { versionKey: false, timestamps: true },
);

const orderModel = model<IOrder>("Order", orderSchema, "orders");

export default orderModel;
