import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

import IPartner from "./partners.interface";

export default class CreatePartnerDto implements IPartner {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsMongoId()
    public user_id: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsNumber()
    public address: string;

    @IsNotEmpty()
    @IsString()
    public phone_number: string;

    @IsNotEmpty()
    @IsString()
    public email: string;
}
