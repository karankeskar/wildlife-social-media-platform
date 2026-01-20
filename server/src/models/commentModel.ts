import mongoose, {Document, Schema, Types} from 'mongoose';

export interface IComments extends Document{
    postId:Types.ObjectId,
    userId:Types.ObjectId,
    content:string
}