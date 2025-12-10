import mongoose, {Document, Schema} from 'mongoose';

export interface IUser extends Document{
    fullName: string;
    email:string;
    password:string;
    phoneNumber:string;
    createdAt:Date;
    updatedAt:Date;
}
const userSchema: Schema<IUser> = new Schema({
    fullName:{
        type:String,
        required:[true, 'Please enter your full name']
    },
    email:{
        type:String,
        required:[true, 'Please enter your email'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Please enter your password']
    }
},
{
    timestamps:true
}
)
export const User = mongoose.model<IUser>('User', userSchema)