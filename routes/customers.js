import express from "express";
import { all, get, run } from "../db.js";

const router = express.Router();

/**
 * GET /api/customers
 * Query params:
 *  - q: search (matches first_name, last_name, phone_number)
 *  - city: filter by city (joins addresses)
 *  - sortBy: first_name|last_name|phone_number|id (default: id)
 *  - order: asc|desc (default: asc)
 *  - page: number (default: 1)
 *  - limit: number (default: 10)
 */
router.get("/", async (req, res) => {
  try {
    const {
      q = "",
      city = "",
      sortBy = "id",
      order = "asc",
      page = 1,
      limit = 10
    } = req.query;

    const validSort = ["id", "first_name", "last_name", "phone_number"].includes(
      String(sortBy)
    )
      ? sortBy
      : "id";
    const validOrder = String(order).toLowerCase() === "desc" ? "DESC" : "ASC";

    const offset = (Number(page) - 1) * Number(limit);

    const params = [];
    let where = "WHERE 1=1 ";

    if (q) {
      where +=
        "AND (c.first_name LIKE ? OR c.last_name LIKE ? OR c.phone_number LIKE ?) ";
      params.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }
    if (city) {
      where += "AND EXISTS (SELECT 1 FROM addresses a WHERE a.customer_id = c.id AND a.city LIKE ?) ";
      params.push(`%${city}%`);
    }

    const dataSql = `
      SELECT c.*
      FROM customers c
      ${where}
      ORDER BY ${validSort} ${validOrder}
      LIMIT ? OFFSET ?;
    `;
    const countSql = `
      SELECT COUNT(*) as total
      FROM customers c
      ${where};
    `;

    const data = await all(dataSql, [...params, Number(limit), Number(offset)]);
    const countRow = await get(countSql, params);
    const total = countRow?.total || 0;

    res.json({
      message: "success",
      data,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/customers/:id
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const customer = await get("SELECT * FROM customers WHERE id = ?", [id]);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    const addresses = await all(
      "SELECT * FROM addresses WHERE customer_id = ? ORDER BY id ASC",
      [id]
    );
    res.json({ message: "success", data: { ...customer, addresses } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/customers
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, phone_number } = req.body || {};
    if (!first_name || !last_name || !phone_number) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const result = await run(
      "INSERT INTO customers (first_name, last_name, phone_number) VALUES (?, ?, ?)",
      [first_name.trim(), last_name.trim(), phone_number.trim()]
    );
    const created = await get("SELECT * FROM customers WHERE id = ?", [
      result.id
    ]);
    res.status(201).json({ message: "created", data: created });
  } catch (err) {
    if (String(err?.message || "").includes("UNIQUE")) {
      return res
        .status(409)
        .json({ error: "Phone number must be unique" });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/customers/:id
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existing = await get("SELECT * FROM customers WHERE id = ?", [id]);
    if (!existing) return res.status(404).json({ error: "Customer not found" });

    const { first_name, last_name, phone_number } = req.body || {};

    const updatedFirst = first_name ?? existing.first_name;
    const updatedLast = last_name ?? existing.last_name;
    const updatedPhone = phone_number ?? existing.phone_number;

    await run(
      "UPDATE customers SET first_name = ?, last_name = ?, phone_number = ? WHERE id = ?",
      [updatedFirst, updatedLast, updatedPhone, id]
    );
    const updated = await get("SELECT * FROM customers WHERE id = ?", [id]);
    res.json({ message: "updated", data: updated });
  } catch (err) {
    if (String(err?.message || "").includes("UNIQUE")) {
      return res
        .status(409)
        .json({ error: "Phone number must be unique" });
    }
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/customers/:id
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existing = await get("SELECT * FROM customers WHERE id = ?", [id]);
    if (!existing) return res.status(404).json({ error: "Customer not found" });

    await run("DELETE FROM addresses WHERE customer_id = ?", [id]);
    await run("DELETE FROM customers WHERE id = ?", [id]);
    res.json({ message: "deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
