import sqlite3 from "sqlite3";
sqlite3.verbose();

const DB_PATH = "./database.db";

export const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Failed to connect to SQLite:", err.message);
  } else {
    console.log("Connected to SQLite database:", DB_PATH);
  }
});

// Initialize schema
export const initDb = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        phone_number TEXT NOT NULL UNIQUE
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS addresses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL,
        address_details TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        pin_code TEXT NOT NULL,
        FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE
      );
    `);

    // Optional seed (comment out if not needed)
    db.run(
      `INSERT OR IGNORE INTO customers (id, first_name, last_name, phone_number)
       VALUES (1, 'Asha', 'Verma', '9990010010'),
              (2, 'Ravi', 'Kumar', '9990010011');`
    );
    db.run(
      `INSERT OR IGNORE INTO addresses (id, customer_id, address_details, city, state, pin_code)
       VALUES (1, 1, '12/3 MG Road', 'Bengaluru', 'Karnataka', '560001'),
              (2, 1, 'Flat 404, Sunrise Apts', 'Bengaluru', 'Karnataka', '560034'),
              (3, 2, 'Sector 22', 'Chandigarh', 'Chandigarh', '160022');`
    );
  });
};

// Small helpers for promises
export const run = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });

export const get = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row)));
  });

export const all = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });
