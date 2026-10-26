import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/appRoutes.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cookieParser());
app.use(cors());
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "AutoCare Pro backend is running!",
  });
});
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is connected");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error(`error: ${err.message}`);
    process.exit(1);
  }
};
startServer();
