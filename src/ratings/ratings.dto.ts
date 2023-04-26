import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

import IRating from "./ratings.interface";

export default class CreateRatingDto implements IRating {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsMongoId()
    public user_id: Schema.Types.ObjectId;

    @IsMongoId()
    public partner_id: Schema.Types.ObjectId;

    @IsMongoId()
    public product_id: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    public star: number;

    @IsNotEmpty()
    @IsNumber()
    public comment: string;
}
