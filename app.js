// importing modules
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import bodyParser from "body-parser";
import session from "express-session";
import dbConnect from "./database/dbConnection.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/posts.routes.js";
import { jwtAuthentication } from "./middlewares/jwtAuth.middleware.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import otpRouter from "./routes/otp.routes.js";

// creating instance
const app = express();
// setting up environment variables
dotenv.config({ path: "./config/.env" });

// application level middleware configuration
// Configure session middleware
app.use(
  session({
    secret: "tiZC+Dw$V3EU*hfxfi7TuEqCgE0S80Jth",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(bodyParser.json());

// creating application routes
app.use("/api/users", userRouter);
app.use("/api/posts", jwtAuthentication, postRouter);
app.use("/api/comments", jwtAuthentication, commentRouter);
app.use("/api/likes", jwtAuthentication, likeRouter);
app.use("/api/otp", jwtAuthentication, otpRouter);

// creating postaway request
app.get("/", (req, res) => {
  res.send("Hello, Postaway!");
});

// creating server
app.listen(process.env.PORT, () => {
  console.log(
    `Postaway ${process.env.ENVIRONMENT} server is running on port ${process.env.PORT}`
      .bgGreen
  );
  // connecting to the database
  dbConnect();
});
