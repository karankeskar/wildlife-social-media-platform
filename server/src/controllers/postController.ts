import {Request, Response} from 'express';
import {Post} from '../models/postModel';

export const CreatePost = async(req: Request, res: Response) =>{
    try{
        const {
            title, 
            caption,
            hashtag,
            category,
            location,
            country,
            image,
            nationalpark,
            camera,
            lens,
            conservation_status,
        } = req.body;
        const userId = req.user?._id;
        if(!userId){
            return res.status(401).json({message:"User not authenticated"})
        }
        if(!title){
            return res.status(401).json({message:"Please add a title"})
        }
        if(!category){
            return res.status(401).json({message:"Please add a category"})
        }
        if(!location){
            return res.status(401).json({message:"Please enter your location"})
        }

        const createPost = new Post({
            userId,
            title, 
            caption,
            hashtag: hashtag||[],
            category,
            location,
            country,
            image,
            nationalpark,
            camera,
            lens,
            conservation_status,
            like_count:0,
            comment_count:0
        });
        await createPost.save();

        return res.status(201).json({
            message:'Post created successfully',
            post:createPost,
        })
        
    }catch(err: unknown){
        if(err instanceof Error){
            return res.status(500).json({message:err.message});
        }
        return res.status(500).json({message:'Server error'});

    }
};