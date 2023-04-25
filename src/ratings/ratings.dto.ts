import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CreateOrdersDto {
    @IsNotEmpty()
    @IsString()
    public star: number;

    @IsNotEmpty()
    @IsNumber()
    public comment: string;
}
