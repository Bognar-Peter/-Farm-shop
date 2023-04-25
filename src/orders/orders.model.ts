import { model, Schema } from "mongoose";

import IOrder from "./orders.interface";

const orderSchema = new Schema<IOrder>(
    {
        ship_date: Date,
        order_date: Date,
        // discount: False,
        price: Number,
        quantity: Number
    },
    { versionKey: false, timestamps: true },
);

const orderModel = model<IOrder>("Order", orderSchema, "orders");

export default orderModel;
