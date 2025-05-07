import express from 'express';
import cookieParser from 'cookie-parser';
import serverConfig from './config/serverConfig.js';
import connectDB from './config/dbConfig.js'
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import auctionRouter from './routes/auctionRoutes.js';
import bidRouter from './routes/bidRoutes.js';

const app = express();

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

app.post('/ping', (req, res) => {
    console.log(req.body);
    return res.json({message: "pong"});
})

app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${serverConfig.PORT}...!!`);
});