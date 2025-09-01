import React, { useState } from "react";

export default function CustomerForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const update = (k, v) => setValues((s) => ({ ...s, [k]: v }));

  const validate = () => {
    const e = {};
    if (!values.first_name?.trim()) e.first_name = "First name is required";
    if (!values.last_name?.trim()) e.last_name = "Last name is required";
    if (!values.phone_number?.trim()) e.phone_number = "Phone is required";
    else if (!/^[0-9+\-\s]{7,20}$/.test(values.phone_number.trim()))
      e.phone_number = "Enter a valid phone";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit(values);
  };

  return (
    <form onSubmit={submit}>
      <div className="form-grid">
        <div>
          <label>First Name</label>
          <input
            className="input"
            value={values.first_name}
            onChange={(e) => update("first_name", e.target.value)}
          />
          {errors.first_name && <div className="badge" style={{ borderColor: "#e11d48", color: "#fecaca" }}>{errors.first_name}</div>}
        </div>
        <div>
          <label>Last Name</label>
          <input
            className="input"
            value={values.last_name}
            onChange={(e) => update("last_name", e.target.value)}
          />
          {errors.last_name && <div className="badge" style={{ borderColor: "#e11d48", color: "#fecaca" }}>{errors.last_name}</div>}
        </div>
        <div>
          <label>Phone</label>
          <input
            className="input"
            value={values.phone_number}
            onChange={(e) => update("phone_number", e.target.value)}
          />
          {errors.phone_number && <div className="badge" style={{ borderColor: "#e11d48", color: "#fecaca" }}>{errors.phone_number}</div>}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="button">Save</button>
      </div>
    </form>
  );
}
