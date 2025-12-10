import express, {Router} from 'express';
import {getUser, loginUser, registerUser} from '../controllers/userController'
import {protect} from '../middleware/authMiddleware'

const router: Router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUser)

export default router;