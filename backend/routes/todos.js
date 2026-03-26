import Router from "express";
import pool from "../db.js";

const router = Router();

// Create todo
router.post("/", async (req, res) => {
	try {
		const { description, date } = req.body;
		const newRow = await pool.query(
			"INSERT INTO notebook (description, date) VALUES ($1, $2) RETURNING *",
			[description, date],
		);
		res.json(newRow.rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
});

// Get all todos
router.get("/", async (req, res) => {
	try {
		const allRows = await pool.query("SELECT * FROM notebook");
		res.json(allRows.rows);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
});

// Update todo
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { description, date } = req.body;
		const updatedRow = await pool.query(
			"UPDATE notebook SET description = $1, date = $2 WHERE id = $3 RETURNING *",
			[description, date, id],
		);
		res.json(updatedRow.rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
});

// Delete todo
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await pool.query("DELETE FROM notebook WHERE id = $1", [id]);
		res.json("Todo was deleted!");
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
});

export default router;
