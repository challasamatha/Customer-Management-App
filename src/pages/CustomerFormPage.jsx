import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerForm from "../components/CustomerForm";
import api from "../api";

export default function CustomerFormPage({ mode = "create" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initial, setInitial] = useState(null);
  const isEdit = mode === "edit";

  useEffect(() => {
    const load = async () => {
      if (isEdit && id) {
        const { data } = await api.get(`/customers/${id}`);
        setInitial(data.data);
      } else {
        setInitial({ first_name: "", last_name: "", phone_number: "" });
      }
    };
    load();
  }, [isEdit, id]);

  const handleSubmit = async (values) => {
    if (isEdit) {
      await api.put(`/customers/${id}`, values);
      navigate(`/customers/${id}`);
    } else {
      const { data } = await api.post("/customers", values);
      navigate(`/customers/${data.data.id}`);
    }
  };

  if (!initial) return <div className="card">Loading...</div>;

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>{isEdit ? "Edit Customer" : "New Customer"}</h2>
      <CustomerForm initialValues={initial} onSubmit={handleSubmit} />
    </div>
  );
}
