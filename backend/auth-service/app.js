import express, { json } from "express";
import { connect } from "mongoose";
import authRoutes from "./src/routes/authRoutes";
import { config } from "dotenv";
import cors from "cors";

config();

const app = express();
app.use(cors());
app.use(json());

app.use("/api/auth", authRoutes);

connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT || 3000, () => {
    console.log("Auth Service running on port", process.env.PORT || 3000);
  });
}).catch(err => console.error("MongoDB connection error:", err));