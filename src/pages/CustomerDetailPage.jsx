import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../api";
import AddressList from "../components/AddressList";
import AddressForm from "../components/AddressForm";

export default function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/customers/${id}`);
      setCustomer(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  const handleDeleteCustomer = async () => {
    if (!window.confirm("Delete this customer and all addresses?")) return;
    await api.delete(`/customers/${id}`);
    navigate("/");
  };

  if (loading) return <div className="card">Loading...</div>;
  if (!customer) return <div className="card">Not found.</div>;

  return (
    <div className="card">
      <div className="row">
        <div>
          <h2 style={{ marginTop: 0 }}>
            {customer.first_name} {customer.last_name}
          </h2>
          <div className="kv">
            <div className="muted">ID</div><div>{customer.id}</div>
            <div className="muted">Phone</div><div>{customer.phone_number}</div>
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <Link className="button" to={`/customers/${id}/edit`}>Edit</Link>
            <button className="button danger" onClick={handleDeleteCustomer}>Delete</button>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: 24 }}>Addresses</h3>
      <AddressList
        rows={customer.addresses || []}
        onChange={load}
      />

      <h3 style={{ marginTop: 24 }}>Add New Address</h3>
      <AddressForm customerId={customer.id} onSuccess={load} />
    </div>
  );
}
