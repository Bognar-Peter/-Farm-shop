import { model, Schema } from "mongoose";

import IOrder from "./orders.interface";

const orderSchema = new Schema<IOrder>(
    {
        price: Number,
        quantity: Number,
        ship_date: String,
        order_date: String,
        product_id: {
            ref: "Product",
            type: Schema.Types.ObjectId,
        },
        orders_id: {
            ref: "Order",
            type: Schema.Types.ObjectId,
        },
    },
    { versionKey: false, timestamps: true },
);

const orderModel = model<IOrder>("Order", orderSchema, "orders");

export default orderModel;
