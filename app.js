import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";

const app = express();

import cookieParser from "cookie-parser";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";
import connectDb from "./db/connect.js";
import mongoSanitize from "express-mongo-sanitize";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("Welcokim!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 7500;

const start = async () => {
  try {
    connectDb(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`Server listening at port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
