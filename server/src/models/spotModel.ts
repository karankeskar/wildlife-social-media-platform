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
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:'Post',
        required: true,
    },
},
{
    timestamps:true,
}
);

spotSchema.index({userId:1, postId:1}, {unique:true});

export const Spot = mongoose.model<ISpot>('Spot', spotSchema);