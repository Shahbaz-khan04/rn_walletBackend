// const express = require()
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { initDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import transactionsRoute from "./routes/transactionRoute.js"

dotenv.config();

const app = express();

// 1) CORS setup — allow all origins (you can lock this down to your client’s origin later)
app.use(cors({
  origin: '*' ,                       // you can change '*' to e.g. 'http://localhost:19006'
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// middleware
// if we dont use middleware the passed values in req body on api call will be undefined
app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use("/api/transactions", transactionsRoute)

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on PORT:5001");
  });
})

