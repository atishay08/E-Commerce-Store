import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import { connectDB } from './lib/db.js';
import cors from 'cors';


dotenv.config();

const app=express();

const PORT = process.env.PORT ||5000;

const __dirname = path.resolve();

app.use(cors({
  origin: 'http://localhost:5173', // Vite default dev server
  credentials: true                // Allow cookies
}));


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);


if(process.env.NODE_ENV == "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
  })
}

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDB();
})