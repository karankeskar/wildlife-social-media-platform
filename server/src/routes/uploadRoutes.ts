import express from 'express';
import multer from 'multer';
import {uploadImage} from '../controllers/uploadController';
import {protect} from '../middleware/authMiddleware';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits:{
        fileSize: 5* 1024 *1024,
    },
    fileFilter:(req,file,cb) =>{
        if(file.mimetype.startsWith('image/')){
            cb(null,true);
        }else{
        cb(new Error('Only image files are allowed'));
        }
    },
})

router.post('/', protect, upload.single('image'), uploadImage);

export default router;