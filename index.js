import express from "express";
import cors from "cors";
import { initDb } from "./db.js";
import customersRouter from "./routes/customers.js";
import addressesRouter from "./routes/addresses.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Routes
app.use("/api/customers", customersRouter);
app.use("/api", addressesRouter);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Init DB and start server
initDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
