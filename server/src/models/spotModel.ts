import mongoose, {Document, Schema, Types} from 'mongoose';

export interface ISpot extends Document{
    userId:Types.ObjectId;
    postId:Types.ObjectId;
    createdAt:Date;
}

const spotSchema:Schema<ISpot> = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
})