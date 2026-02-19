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
    like_count:Number,
    comment_count:Number,
    conservation_status:string,
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
    }


})

export const Post= mongoose.model<IPost>('Post',postSchema)