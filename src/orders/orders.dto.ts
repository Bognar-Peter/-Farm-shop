import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

import IOrder from "./orders.interface";

export default class CreateOrderDto implements IOrder {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsMongoId()
    public user_id: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    public ship_date: Date;

    @IsNotEmpty()
    @IsNumber()
    public order_date: Date;
}
