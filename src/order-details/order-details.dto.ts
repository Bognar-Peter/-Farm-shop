import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Schema } from "mongoose";

import IOrderDetail from "./order-details.interface";

export default class CreateOrdersDto implements IOrderDetail {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsMongoId()
    public order_id: Schema.Types.ObjectId;

    @IsMongoId()
    public product_id: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsNumber()
    public price: number;

    @IsNotEmpty()
    @IsNumber()
    public quantity: number;
}
