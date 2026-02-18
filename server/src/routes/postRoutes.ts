import express, { Router } from 'express';
import {CreatePost, GetPosts} from '../controllers/postController';
import {protect} from '../middleware/authMiddleware';

const router: Router = express.Router()

router.post('/create',protect, CreatePost);
router.get('/', protect, GetPosts);

export default router;