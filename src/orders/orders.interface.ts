// import { Type } from "class-transformer";
import { Schema } from "mongoose";
export default interface IOrder {
    _id?: Schema.Types.ObjectId;
    ship_date: Date;
    order_date: Date;
    orders_id?: Schema.Types.ObjectId;
    produts: [];
    produts_id?: Schema.Types.ObjectId;
    discount: boolean;
    price: number;
    quantity: number;
}
