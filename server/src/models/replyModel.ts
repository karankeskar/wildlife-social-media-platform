import mongoose, {Document, Schema, Types} from 'mongoose';

export interface IReply extends Document{
    commentId:Types.ObjectId,
    content:string
}