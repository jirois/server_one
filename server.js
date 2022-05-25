import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Welcokim!");
});

const PORT = process.env.PORT || 7500;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
