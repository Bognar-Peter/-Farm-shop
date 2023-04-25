import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CreateProductsDto {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsNumber()
    public price: number;

    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsNotEmpty()
    @IsString()
    public types: string;

    @IsNotEmpty()
    @IsString()
    public picture: string;

    @IsNotEmpty()
    @IsString()
    public unit: string;

    @IsNotEmpty()
    @IsString()
    public weight: string;
}
