import { IsNotEmpty, IsNumber, IsString, IsMongoId, IsOptional } from "class-validator";
import IRating from "./ratings.interface";
import { Schema } from "mongoose";

export default class CreateRatingDto implements IRating {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsMongoId()
    public users_id: Schema.Types.ObjectId;

    @IsMongoId()
    public partners_id: Schema.Types.ObjectId;

    @IsMongoId()
    public product_id: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    public star: number;

    @IsNotEmpty()
    @IsNumber()
    public comment: string;
}
