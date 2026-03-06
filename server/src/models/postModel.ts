import mongoose, {Document, Schema, Types} from 'mongoose';

export interface IPost extends Document{
    userId:Types.ObjectId,
    title:string,
    caption:string,
    hashtag:string[],
    category:string,
    location:string,
    country:string,
    image:string,
    nationalpark:string,
    camera:string,
    lens:string,
    spot_count:Number,
    field_notes_count:Number,
    conservation_status:string,
    longitude:number,
    latitude:number,
    created_at:Date,
    updated_at:Date
}
const postSchema:Schema<IPost> = new Schema({
    userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
    title:{
        type:String,
        required:[true, "Please enter the title of the post."]
    },
    caption:{
        type:String,
    },
    hashtag:[{
        type:String,
        required:[true, "Please enter hashtags"]
    }],
    category:{
        type:String,
        required:[true, "Please select the Category"],
        enum:["Mammals", "Birds", "Reptiles and Amphibians", "Insects and Inverterbes", "Landscapes"]
    },
    country:{
        type:String,
        required:[true, "Please select the country"]
    },
    image:{
        type:String
    },
    nationalpark:{
        type:String
    },
    camera:{
        type:String
    },
    lens:{
        type:String
    },
    spot_count:{
        type:Number,
        default:0
    },
    field_notes_count:{
        type:Number,
        default:0
    },
    conservation_status:{
        type:String, 
        enum: ["Least Concern", "Near Threatened", "Vulnerable","Endangered", "Critically Endangered", "Extinct in Wild", "Extinct"]
    },
        latitude: {
        type: Number,
        default: null
    },
    longitude: {       
        type: Number,
        default: null
    }
},{
    timestamps:true
});

export const Post= mongoose.model<IPost>('Post',postSchema)