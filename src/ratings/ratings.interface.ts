// import { Type } from "class-transformer";
import { Schema } from "mongoose";
export default interface IRating {
    _id?: Schema.Types.ObjectId;
    star: number;
    comment: string;
    user_id: Schema.Types.ObjectId;
    partner_id: Schema.Types.ObjectId;
    product_id: Schema.Types.ObjectId;
}
