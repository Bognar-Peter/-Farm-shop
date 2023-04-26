import { IsNotEmpty, IsNumber, IsString, IsOptional, IsMongoId } from "class-validator";
import IPartner from "./partners.interface";
import { Schema } from "mongoose";

export default class CreatePartnerDto implements IPartner {
    @IsMongoId()
    @IsOptional()
    public _id: Schema.Types.ObjectId;

    @IsMongoId()
    public users_id: Schema.Types.ObjectId;

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
