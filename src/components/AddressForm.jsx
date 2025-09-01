import React, { useState } from "react";
import api from "../api";

export default function AddressForm({ customerId, initial, addressId, onSuccess, onCancel }) {
  const [values, setValues] = useState(
    initial || { address_details: "", city: "", state: "", pin_code: "" }
  );
  const [errors, setErrors] = useState({});

  const update = (k, v) => setValues((s) => ({ ...s, [k]: v }));

  const validate = () => {
    const e = {};
    if (!values.address_details?.trim()) e.address_details = "Required";
    if (!values.city?.trim()) e.city = "Required";
    if (!values.state?.trim()) e.state = "Required";
    if (!values.pin_code?.trim()) e.pin_code = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    if (addressId) {
      await api.put(`/addresses/${addressId}`, values);
    } else {
      await api.post(`/customers/${customerId}/addresses`, values);
    }
    onSuccess?.();
  };

  return (
    <form onSubmit={submit} className="form-grid">
      <div>
        <label>Address Details</label>
        <input className="input" value={values.address_details} onChange={(e) => update("address_details", e.target.value)} />
        {errors.address_details && <div className="badge">{errors.address_details}</div>}
      </div>
      <div>
        <label>City</label>
        <input className="input" value={values.city} onChange={(e) => update("city", e.target.value)} />
        {errors.city && <div className="badge">{errors.city}</div>}
      </div>
      <div>
        <label>State</label>
        <input className="input" value={values.state} onChange={(e) => update("state", e.target.value)} />
        {errors.state && <div className="badge">{errors.state}</div>}
      </div>
      <div>
        <label>PIN Code</label>
        <input className="input" value={values.pin_code} onChange={(e) => update("pin_code", e.target.value)} />
        {errors.pin_code && <div className="badge">{errors.pin_code}</div>}
      </div>

      <div className="form-actions" style={{ gridColumn: "1 / -1" }}>
        {onCancel && <button type="button" className="button secondary" onClick={onCancel}>Cancel</button>}
        <button type="submit" className="button">{addressId ? "Update" : "Add"}</button>
      </div>
    </form>
  );
}
