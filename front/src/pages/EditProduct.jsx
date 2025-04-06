import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { checkToken } from "../utils/user";
const API_URL = process.env.REACT_APP_API_URL;

export default function EditProduct() {
  
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {

      const token = await checkToken();
      if (!token) {
        navigate(`/login`)
      }

      try {
        const res = await fetch(`${API_URL}/protected/products/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
  
        const data = await res.json();
  
        if (!res.ok) {
            // Show different messages depending on the status
            if (res.status === 403) {
              setError("You are not authorized to access this page.");
            } else if (res.status === 404) {
              setError("Product not found.");
            } else {
              setError(data.error || "Failed to load product.");
            }
            return;
        }

  
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching the product.");
      }
    };
  
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
  
    const token = await checkToken();
    if (!token) {
      navigate(`/login`)
    }

    try {
      const res = await fetch(`${API_URL}/protected/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.error || "Failed to delete product.");
        return;
      }
  
      alert("Product deleted successfully.");
      navigate("/products"); // Or wherever your product list lives
    } catch (err) {
      console.error("Delete product error:", err);
      alert("An error occurred while deleting the product.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const token = await checkToken();
    if (!token) {
      navigate(`/login`)
    }

    const res = await fetch(`${API_URL}/protected/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(product),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to update product");
    } else {
      setMessage("Product updated successfully");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input name="product_id" value={product.product_id} disabled style={styles.input} />
        <input name="name" value={product.name} onChange={handleChange} required style={styles.input} />
        <textarea name="description" value={product.description} onChange={handleChange} required style={styles.input} />
        <input type="date" name="creation_date" value={product.creation_date?.slice(0, 10)} onChange={handleChange} style={styles.input} />
        <input type="number" name="current_stock_level" value={product.current_stock_level} onChange={handleChange} style={styles.input} />
        <label>
          <input type="checkbox" name="status" checked={product.status} onChange={handleChange} />
          Active
        </label>
        <button type="submit" style={styles.button}>Update Product</button>
        <button
            onClick={handleDelete}
            type="button"
            style={{ ...styles.button, backgroundColor: "#dc2626", color: "white" }}
            >
            Delete Product
        </button>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

const styles = {
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", fontSize: "16px", cursor: "pointer" },
};