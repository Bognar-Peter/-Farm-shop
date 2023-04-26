// import { Type } from "class-transformer";
import { Schema } from "mongoose";
export default interface IOrder {
    _id?: Schema.Types.ObjectId;
    ship_date: Date;
    order_date: Date;
<<<<<<< HEAD
    order_id?: Schema.Types.ObjectId;
    product_id?: Schema.Types.ObjectId;
    discount: boolean;
    price: number;
    quantity: number;
=======
    user_id?: Schema.Types.ObjectId;
>>>>>>> ae9c0b6bee11cdc03cd3572600df0502dc033019
}
