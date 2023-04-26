import { model, Schema } from "mongoose";

import IOrder from "./orders.interface";

const orderSchema = new Schema<IOrder>(
    {
        ship_date: String,
        order_date: String,
<<<<<<< HEAD
        product_id: {
            ref: "Product",
            type: Schema.Types.ObjectId,
        },
        order_id: {
            ref: "Order",
=======
        user_id: {
            ref: "User",
>>>>>>> ae9c0b6bee11cdc03cd3572600df0502dc033019
            type: Schema.Types.ObjectId,
        },
    },
    { versionKey: false, timestamps: true },
);

const orderModel = model<IOrder>("Order", orderSchema, "orders");

export default orderModel;
