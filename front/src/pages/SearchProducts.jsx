import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPageSize } from "../utils/user";
import { checkToken } from "../utils/user";
const API_URL = process.env.REACT_APP_API_URL;

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0); // starts at page 0
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPageSize = async () => {
      const size = await getUserPageSize();
      setPageSize(size);
    };
  
    loadPageSize(); //consider dependencies on some variable that will be changed whenever handleSearch is called with page == 0
  }, []);

  const handleSearch = async (page = 0) => {
    setError("");
    const token = await checkToken();
    if (!token) {
      navigate(`/login`)
    }
    //let mypage = page;
    //console.log("handle search mypage=", page);
    try {
      const pageSize = await getUserPageSize();
      const res = await fetch(
        `${API_URL}/protected/products?search=${encodeURIComponent(query)}&limit=${pageSize}&skip=${page * pageSize}`,
        {
            headers: {
            Authorization: `${token}`,
            },
        });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to search");
        return;
      }

      setResults(data.products);
      setTotal(data.total);
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
      setError("Search failed.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h2>Search Products</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name, ID or description"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={() => handleSearch(0)} style={{ padding: "10px" }}>
          Search
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {Array.isArray(results) && results.length > 0 && (
        <table border="1" cellPadding="8" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {results.map((p) => (
                    <tr
                        key={p._id}
                        onClick={() => navigate(`/edit-product/${p._id}`)}
                        style={{ cursor: "pointer", backgroundColor: "#f9f9f9" }}
                    >
                        <td>{p.product_id}</td>
                        <td>{p.name}</td>
                        <td>{p.description}</td>
                        <td>{p.current_stock_level}</td>
                        <td>{p.status ? "Active" : "Inactive"}</td>
                    </tr>
                    ))}
          </tbody>
        </table>
      )}
      <button
        disabled={currentPage === 0}
        onClick={() => handleSearch(currentPage - 1)}
      >
        Previous
      </button>

       <button
        disabled={(currentPage + 1) * pageSize >= total}
        onClick={() => handleSearch(currentPage + 1)}
       >
        Next
       </button>
    </div>
        
  );
}