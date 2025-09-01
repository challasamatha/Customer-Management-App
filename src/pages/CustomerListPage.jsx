import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api";
import CustomerList from "../components/CustomerList";

export default function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 10, pages: 1, total: 0 });
  const [loading, setLoading] = useState(false);

  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const city = params.get("city") || "";
  const sortBy = params.get("sortBy") || "id";
  const order = params.get("order") || "asc";
  const page = Number(params.get("page") || 1);
  const limit = Number(params.get("limit") || 10);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value === "" || value === null) next.delete(key);
    else next.set(key, value);
    next.set("page", "1");
    setParams(next);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/customers", {
          params: { q, city, sortBy, order, page, limit }
        });
        setCustomers(data.data || []);
        setMeta(data.pagination);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [q, city, sortBy, order, page, limit]); // eslint-disable-line

  const goToPage = (p) => {
    const next = new URLSearchParams(params);
    next.set("page", String(p));
    setParams(next);
  };

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Customers</h2>

      <div className="toolbar" style={{ margin: "12px 0" }}>
        <input
          className="input"
          placeholder="Search name/phone..."
          value={q}
          onChange={(e) => updateParam("q", e.target.value)}
        />
        <input
          className="input"
          placeholder="Filter by city..."
          value={city}
          onChange={(e) => updateParam("city", e.target.value)}
        />
        <select
          className="select"
          value={sortBy}
          onChange={(e) => updateParam("sortBy", e.target.value)}
        >
          <option value="id">Sort: ID</option>
          <option value="first_name">First name</option>
          <option value="last_name">Last name</option>
          <option value="phone_number">Phone</option>
        </select>
        <select
          className="select"
          value={order}
          onChange={(e) => updateParam("order", e.target.value)}
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <select
          className="select"
          value={limit}
          onChange={(e) => updateParam("limit", e.target.value)}
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>{n}/page</option>
          ))}
        </select>
        <Link to="/customers/new" className="button">+ New Customer</Link>
      </div>

      <CustomerList rows={customers} loading={loading} />

      <div className="toolbar" style={{ justifyContent: "space-between", marginTop: 12 }}>
        <span className="badge">
          Page {meta.page} / {meta.pages} • {meta.total} total
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="button secondary" disabled={meta.page <= 1} onClick={() => goToPage(meta.page - 1)}>Prev</button>
          <button className="button secondary" disabled={meta.page >= meta.pages} onClick={() => goToPage(meta.page + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}
