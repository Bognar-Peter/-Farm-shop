// import { Type } from "class-transformer";
import { Schema } from "mongoose";
export default interface IOrderDetail {
    _id?: Schema.Types.ObjectId;
    price: number;
    quantity: number;
    order_id: Schema.Types.ObjectId;
    product_id: Schema.Types.ObjectId;
}
