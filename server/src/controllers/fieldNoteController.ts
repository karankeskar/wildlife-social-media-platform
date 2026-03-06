import {Request, Response} from "express";
import {FieldNote} from "../models/fieldNoteModel";
import {Post} from "../models/postModel";

export const getFieldNotes = async (req:Request, res:Response)=>{
    try{
        const notes = await FieldNote.find({postId:req.params.postId})
        .populate("userId", "fullName profile_picture")
        .sort({createdAt: -1});

        res.status(200).json({notes});
    }catch{
        res.status(500).json({message:"Failed to fetch field notes"});
    }
};

export const addFieldNote = async(req:Request, res:Response) =>{
    try{
        const {content} = req.body
        if(!content || content.trim().length === 0){
            res.status(400).json({message:"content is required"});
            return;
        }
        const note = await FieldNote.create({
            userId: req.user?._id,
            postId: req.params.postId,
            content: content.trim(),
        });

        await Post.findByIdAndUpdate(req.params.postId,{
            $inc:{field_notes_count:1},
        });
        const populated = await note.populate("userId", "fullName profile_picture");
        res.status(201).json({note:populated});
    }catch{
        res.status(500).json({message:"Failed to add field note"});
    }
};

export const deleteFieldNote = async(req:Request, res:Response) => {
    try{
        const note = await FieldNote.findById(req.params.noteId);
        if(!note){
            res.status(404).json({message:"Note not found"});
            return;
        }
        if(note.userId.toString()!== req.user?._id.toString()){
            res.status(403).json({message:"Not Authorised"});
            return;
        }

        await FieldNote.deleteOne({_id:note._id});

        await Post.findByIdAndUpdate(note.postId,{
            $inc:{field_notes_count:-1},
        });
        res.status(200).json({message:"Note delted"});

    }catch{
        res.status(500).json({message:"Failed to delete field note"});
    }
}