import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../utils/user";
const API_URL = process.env.REACT_APP_API_URL;

export default function AddProduct() {
  const [formData, setFormData] = useState({
    product_id: "",
    name: "",
    description: "",
    creation_date: "",
    status: false,
    current_stock_level: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = await checkToken();
    if (!token) {
      navigate(`/login`)
    }

    try {
      const res = await fetch(`${API_URL}/protected/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          ...formData,
          current_stock_level: parseFloat(formData.current_stock_level),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create product");
        return;
      }

      setSuccess("Product created successfully!");
      setFormData({
        product_id: "",
        name: "",
        description: "",
        creation_date: "",
        status: false,
        current_stock_level: "",
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="product_id"
          placeholder="Product ID"
          value={formData.product_id}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="date"
          name="creation_date"
          value={formData.creation_date}
          onChange={handleChange}
          style={styles.input}
        />
        <label style={styles.checkbox}>
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
          Active
        </label>
        <input
          type="number"
          name="current_stock_level"
          placeholder="Stock Level"
          value={formData.current_stock_level}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Product</button>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: "600px", margin: "80px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "10px", fontSize: "16px" },
  checkbox: { textAlign: "left", padding: "10px" },
  button: { padding: "10px", fontSize: "16px", cursor: "pointer" },
  error: { color: "red" },
  success: { color: "green" },
};