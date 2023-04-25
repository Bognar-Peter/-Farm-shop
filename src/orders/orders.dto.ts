import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CreateOrdersDto {
    @IsNotEmpty()
    @IsString()
    public ship_date: Date;

    @IsNotEmpty()
    @IsNumber()
    public order_date: Date;

    @IsNotEmpty()
    @IsString()
    public discount: false;

    @IsNotEmpty()
    @IsString()
    public price: number;

    @IsNotEmpty()
    @IsString()
    public quantity: number;
}
