import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import CustomerListPage from "./pages/CustomerListPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomerFormPage from "./pages/CustomerFormPage";

export default function App() {
  return (
    <div className="container">
      <header className="nav">
        <Link to="/" className="brand">Customer Manager</Link>
        <nav>
          <Link to="/">Customers</Link>
          <Link className="primary" to="/customers/new">Add Customer</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<CustomerListPage />} />
          <Route path="/customers/new" element={<CustomerFormPage mode="create" />} />
          <Route path="/customers/:id" element={<CustomerDetailPage />} />
          <Route path="/customers/:id/edit" element={<CustomerFormPage mode="edit" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="footer">© {new Date().getFullYear()} Qwipo Assignment</footer>
    </div>
  );
}
















