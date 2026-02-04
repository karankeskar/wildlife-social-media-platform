import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri: string =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/your-app';

(async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to the database');
    } catch(error) {
        console.error(error);
    }
})();

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).send('Server is running');
});

// User Routes
app.use('/api/user', userRoutes)

// Post Routes
app.use('/api/posts', postRoutes)

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});