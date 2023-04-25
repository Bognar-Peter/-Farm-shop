import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CreateOrdersDto {
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
