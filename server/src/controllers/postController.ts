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
        let longitude = null;
        let latitude = null;
        
        const query = [location, country].filter(Boolean).join(", ");
        if(query){
            try{
                const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`;                
                const geoRes = await fetch(url, {
                    headers:{"User-Agent":"NatureConnect/1.0"}
                });
                const geoData = await geoRes.json();                
                if(geoData && geoData[0]){
                    latitude = parseFloat(geoData[0].lat);
                    longitude = parseFloat(geoData[0].lon);
                } else {
                    console.log("No results returned from Nominatim");
                }
            } catch(err) {
                console.warn("Geocoding failed for:", query, err); // log actual error
            }
        }
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
            spot_count:0,
            field_notes_count:0,
            longitude,
            latitude,
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

export const GetPosts = async(req:Request, res:Response)=>{
    try{
        const posts = await Post.find().populate('userId', 'fullName profile_picture').sort({createdAt: -1});
        return res.status(200).json({
            success:true,
            count:posts.length,
            posts
        });
    }
    catch(err:unknown){
        if(err instanceof Error){
            return res.status(500).json({message:err.message});
        }
        return res.status(500).json({message:'Server error'});
    }
};