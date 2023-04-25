// import { Type } from "class-transformer";
import { Schema } from "mongoose";
export default interface IOrder {
    _id?: Schema.Types.ObjectId;
    star: number;
    comment: string;
    users_id: Schema.Types.ObjectId;
    partners_id: Schema.Types.ObjectId;
    product_id: Schema.Types.ObjectId;
}
