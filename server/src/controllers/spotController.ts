import {Request, Response} from 'express';
import {Spot} from '../models/spotModel';
import {Post} from '../models/postModel';

export const toggleSpot = async (req:Request, res:Response) => {
    try{
        const {postId} = req.params;
        const userId = req.user?._id;

        if(!userId){
            return res.status(401).json({message:'User not authenticated'});
        }

        const existingSpot = await Spot.findOne({userId, postId});
        if(existingSpot){
            await Spot.deleteOne({userId, postId});
            await Post.findByIdAndUpdate(postId, {$inc:{spot_count:-1}});

            return res.status(200).json({
                message:'Spot removed',
                spotted:false
            });
        }
        else{
            await Spot.create({userId, postId});
            await Post.findByIdAndUpdate(postId, {$inc: {spot_count:1}});
            return res.status(200).json({
                message:'Post spotted!',
                spotted:true,
            });
        } 
        }catch(error: unknown){
            if(error instanceof Error){
                return res.status(500).json({message: error.message});
            }
            return res.status(500).json({message: 'Server error'})
    }
};

export const checkSpot = async(req:Request, res: Response)=>{
    try{
        const{postId} = req.params;
        const userId = req.user?._id;
        if(!userId){
            return res.status(401).json({message:'User not authenticated'});
        }
        const spot = await Spot.findOne({userId, postId});

        return res.status(200).json({
            spotted: !!spot,
        });
    }catch (error:unknown){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
        return res.status(500).json({ message:'Server error'})
    }
}