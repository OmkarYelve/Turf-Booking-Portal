import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoute from './routes/adminRoutes.js';
import userRoute from './routes/userRoutes.js';
import connectdb from './dbconfig/connectdb.js';

dotenv.config();

const app = express();

//connect db
connectdb();

app.use(cors({
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'email'],
    exposedHeaders: ['Content-Length', 'X-Requested-With'],
}));

app.options("*", cors());

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/user', userRoute);

//img uploads
app.use('/uploads', express.static('uploads'));

//port
const PORT = process.env.PORT || 8080;

//listen 
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});