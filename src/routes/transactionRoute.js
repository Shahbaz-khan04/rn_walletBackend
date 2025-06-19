import express from "express"
import { createTransaction, deleteTransaction, getSummaryByUserId, getTransactionByUserId } from "../controllers/transactionsController.js";

const router = express.Router()

router.get("/:userID", getTransactionByUserId);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

router.get("/summary/:userID", getSummaryByUserId);


export default router;