import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';
import connectDB from "./utils/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
