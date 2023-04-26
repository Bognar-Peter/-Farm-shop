// import { Type } from "class-transformer";
import { Schema } from "mongoose";
export default interface IPartner {
    _id?: Schema.Types.ObjectId;
    name: string;
    address: string;
    phone_number: string;
    email: string;
    user_id: Schema.Types.ObjectId;
}
