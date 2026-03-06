import mongoose, {Document, Schema} from 'mongoose';

export interface IUser extends Document{
    fullName: string;
    email:string;
    password:string;
    phoneNumber:string;
    bio:string,
    profile_picture:string,
    location:string,
    role:string,
    camera:string,
    lens:string,
    is_verified:boolean,
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
    },
    phoneNumber: {
        type: String,
    },
    bio: {
        type: String,
        default: ''
    },
    profile_picture: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: 'user'
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    camera: {
        type: String,
        default: ''
    },
    lens: {
        type: String,
        default: ''
    },
},{
    timestamps: true
});
export const User = mongoose.model<IUser>('User', userSchema)