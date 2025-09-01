import React from "react";
import { Link } from "react-router-dom";

export default function CustomerList({ rows = [], loading }) {
  if (loading) return <div>Loading...</div>;
  if (!rows.length) return <div>No customers found.</div>;

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First</th>
            <th>Last</th>
            <th>Phone</th>
            <th style={{ width: 120 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.first_name}</td>
              <td>{c.last_name}</td>
              <td>{c.phone_number}</td>
              <td>
                <Link className="button ghost" to={`/customers/${c.id}`}>Open</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
