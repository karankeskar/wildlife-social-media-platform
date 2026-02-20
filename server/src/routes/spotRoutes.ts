import express from 'express';
import { toggleSpot, checkSpot } from '../controllers/spotController';
import {protect} from '../middleware/authMiddleware';

const router = express.Router();

router.post('/:postId', protect, toggleSpot);

router.get('/:postId', protect, checkSpot);

export default router;