import { sql } from "../config/db.js";

export async function getTransactionByUserId(req, res) {
  try {
    const { userID } = req.params;
    const transactions = await sql`
      SELECT * from transactions WHERE user_id = ${userID}
    `;
    res.status(200).json(transactions);

  } catch (e) {
    console.log("Error getting the transaction", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createTransaction(req, res) {
  try {
    const { user_id, title, ammount, category } = req.body;
    if (!title, !user_id, ammount == undefined, !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const transactions = await sql`
      INSERT INTO transactions(user_id,title,ammount,category) 
      VALUES(${user_id},${title},${ammount},${category})
      RETURNING *
    `;
    res.status(201).json(transactions[0]);

  } catch (e) {
    console.log("Error creating the transaction", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      res.status(400).json({ message: "Invalid ID" });
    }
    const result = await sql`
      DELETE FROM transactions WHERE id = ${id} RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not Found." });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });

  } catch (e) {
    console.log("Error deleting the transaction", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getSummaryByUserId(req, res) {
  try {
    const { userID } = req.params;

    // income is ammount > 0
    // expense is ammount < 0

    const balanceResult = await sql`
      SELECT COALESCE(SUM(ammount), 0) as balance FROM transactions WHERE user_id = ${userID}
    `;

    const incomeResult = await sql`
      SELECT COALESCE(SUM(ammount), 0) as income FROM transactions WHERE user_id = ${userID} AND ammount > 0
    `;
    const expensesResult = await sql`
      SELECT COALESCE(SUM(ammount), 0) as expenses FROM transactions WHERE user_id = ${userID} AND ammount < 0
    `;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    });

  } catch (e) {
    console.log("Error getting the transaction", e);
    res.status(500).json({ message: "Internal Server Error" });
  }

}