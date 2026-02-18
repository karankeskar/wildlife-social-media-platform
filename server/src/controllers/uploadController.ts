import {Request, Response} from 'express';
import cloudinary from '../config/cloudinary';

interface MulterRequest extends Request{
    file?:Express.Multer.File
}

export const uploadImage = async(req:MulterRequest, res:Response) => {
    try{
        if(!req.file){
            return res.status(400).json({message:'No file uploaded'})
        }
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        const uploadResult = await cloudinary.uploader.upload(dataURI,{
            folder:'wildlife-posts',
            resource_type:'auto'
        });

        return res.status(200).json({
            message:'Image uploaded successfully',
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
        });
    } catch(error:unknown){
        if(error instanceof Error){
            return res.status(500).json({message:error.message});
        }
        return res.status(500).json({message:'Upload Failed'});
    }
}