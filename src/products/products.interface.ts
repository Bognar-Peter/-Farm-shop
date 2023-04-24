// import { Type } from "class-transformer";
import { Schema } from "mongoose";
export default interface IProduct {
    _id?: Schema.Types.ObjectId;
    name: string;
    price: number;
    type: string;
    description: string;
    picture: string;
    unit: string; // g, kg, liter, stb.
    weight: string;
}
