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
import getAllUsersRoutes from './routes/getAllUsersRoutes.js';
import reportRouter from './routes/reportRoutes.js';
import otpRouter from './routes/otpRoutes.js';
import LeaderboardRouter from './routes/userLeaderboardRoutes.js';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://ulta-auction-frontend.vercel.app',
  "https://ulta-auction-frontend-git-main-saroj-kumar-das-projects.vercel.app",
  "https://ulta-auction-frontend-3n2i11on4-saroj-kumar-das-projects.vercel.app"  // ✅ Add your Vercel domain
];


// app.use(cors({
//     origin: allowedOrigins,
//     credentials: true
// }));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

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
app.use('/', getAllUsersRoutes)
app.use('/', reportRouter)
app.use('/otp', otpRouter);
app.use('/leaderboard', LeaderboardRouter);

app.post('/ping', (req, res) => {
    console.log(req.body);
    return res.json({message: "pong"});
})

app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${serverConfig.PORT}...!!`);
});