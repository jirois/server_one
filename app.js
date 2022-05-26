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
import mongoSanitize from "express-mongo-sanitize";

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
app.use(cookieParser(process.env.JW_SECRET));

app.get("/", (req, res) => {
  res.send("Welcokim!");
});

const port = process.env.PORT || 7500;
app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
