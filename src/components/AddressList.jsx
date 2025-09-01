import React, { useState } from "react";
import api from "../api";
import AddressForm from "./AddressForm";

export default function AddressList({ rows = [], onChange }) {
  const [editingId, setEditingId] = useState(null);

  const remove = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    await api.delete(`/addresses/${id}`);
    onChange?.();
  };

  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Details</th>
              <th>City</th>
              <th>State</th>
              <th>PIN</th>
              <th style={{ width: 160 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.address_details}</td>
                <td>{a.city}</td>
                <td>{a.state}</td>
                <td>{a.pin_code}</td>
                <td style={{ display: "flex", gap: 8 }}>
                  <button className="button secondary" onClick={() => setEditingId(a.id)}>Edit</button>
                  <button className="button danger" onClick={() => remove(a.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td colSpan="6">No addresses yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editingId && (
        <div style={{ padding: 16, borderTop: "1px solid var(--border)" }}>
          <h4 style={{ marginTop: 0 }}>Edit Address #{editingId}</h4>
          <AddressForm
            addressId={editingId}
            initial={rows.find((x) => x.id === editingId)}
            onSuccess={() => {
              setEditingId(null);
              onChange?.();
            }}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}
    </div>
  );
}
