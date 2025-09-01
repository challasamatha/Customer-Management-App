import express from "express";
import { all, get, run } from "../db.js";

const router = express.Router();

// POST /api/customers/:id/addresses
router.post("/customers/:id/addresses", async (req, res) => {
  try {
    const customer_id = Number(req.params.id);
    const customer = await get("SELECT * FROM customers WHERE id = ?", [customer_id]);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    const { address_details, city, state, pin_code } = req.body || {};
    if (!address_details || !city || !state || !pin_code) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await run(
      `INSERT INTO addresses (customer_id, address_details, city, state, pin_code)
       VALUES (?, ?, ?, ?, ?)`,
      [customer_id, address_details.trim(), city.trim(), state.trim(), pin_code.trim()]
    );
    const created = await get("SELECT * FROM addresses WHERE id = ?", [result.id]);
    res.status(201).json({ message: "created", data: created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/customers/:id/addresses
router.get("/customers/:id/addresses", async (req, res) => {
  try {
    const customer_id = Number(req.params.id);
    const customer = await get("SELECT * FROM customers WHERE id = ?", [customer_id]);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    const rows = await all(
      "SELECT * FROM addresses WHERE customer_id = ? ORDER BY id ASC",
      [customer_id]
    );
    res.json({ message: "success", data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/addresses/:addressId
router.put("/addresses/:addressId", async (req, res) => {
  try {
    const addressId = Number(req.params.addressId);
    const existing = await get("SELECT * FROM addresses WHERE id = ?", [addressId]);
    if (!existing) return res.status(404).json({ error: "Address not found" });

    const {
      address_details = existing.address_details,
      city = existing.city,
      state = existing.state,
      pin_code = existing.pin_code
    } = req.body || {};

    await run(
      `UPDATE addresses SET address_details = ?, city = ?, state = ?, pin_code = ? WHERE id = ?`,
      [address_details, city, state, pin_code, addressId]
    );
    const updated = await get("SELECT * FROM addresses WHERE id = ?", [addressId]);
    res.json({ message: "updated", data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/addresses/:addressId
router.delete("/addresses/:addressId", async (req, res) => {
  try {
    const addressId = Number(req.params.addressId);
    const existing = await get("SELECT * FROM addresses WHERE id = ?", [addressId]);
    if (!existing) return res.status(404).json({ error: "Address not found" });

    await run("DELETE FROM addresses WHERE id = ?", [addressId]);
    res.json({ message: "deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
