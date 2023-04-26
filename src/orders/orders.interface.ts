// import { Type } from "class-transformer";
import { Schema } from "mongoose";
export default interface IOrder {
    _id?: Schema.Types.ObjectId;
    ship_date: Date;
    order_date: Date;
    order_id?: Schema.Types.ObjectId;
    product_id?: Schema.Types.ObjectId;
    discount: boolean;
    price: number;
    quantity: number;
}
