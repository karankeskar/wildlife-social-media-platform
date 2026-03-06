import mongoose, {Document, Schema} from "mongoose";

export interface IFieldNote extends Document{
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
}

const fieldNoteSchema = new Schema<IFieldNote>(
    {
        userId: {type: Schema.Types.ObjectId, ref:"User", required:true},
        postId:{type:Schema.Types.ObjectId, ref:"Post, required: true"},
        content:{type:String, required:true, trim:true, maxlength:500},
    },
    {timestamps:true}
);

export const FieldNote = mongoose.model<IFieldNote>("FieldNote", fieldNoteSchema);