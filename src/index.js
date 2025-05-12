import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import serverConfig from './config/serverConfig.js';
import connectDB from './config/dbConfig.js'
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import auctionRouter from './routes/auctionRoutes.js';
import bidRouter from './routes/bidRoutes.js';
import adminRouter from './routes/adminRoutes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());
app.use(express.text());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routing middleware
// if your req route starts with /users then handle it using userRouter
app.use('/users', userRouter); // connects the router to the server
app.use('/auth', authRouter)
app.use('/auctions', auctionRouter);
app.use("/bids", bidRouter)
app.use("/", adminRouter);

app.post('/ping', (req, res) => {
    console.log(req.body);
    return res.json({message: "pong"});
})

app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${serverConfig.PORT}...!!`);
});