import express, { Router } from 'express';
import {CreatePost} from '../controllers/postController';
import {protect} from '../middleware/authMiddleware';

const router: Router = express.Router()

router.post('/createpost', CreatePost);

export default router;