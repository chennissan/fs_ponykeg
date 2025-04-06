import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../utils/user";

const API_URL = process.env.REACT_APP_API_URL;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchProfile = async () => {
      const token = await checkToken();
      if (!token) {
        navigate(`/login`)
      }
      try {
        //console.log("fetching by token ", `${API_URL}/protected/profile`);
        const res = await fetch(`${API_URL}/protected/profile`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load profile");
        }

        setUser(data);
        setFormData({
          first_name: data.first_name || "",
          family_name: data.family_name || "",
          email: data.email || "",
          page_size: data.preferences?.page_size || 12,
          date_of_birth: data.date_of_birth ? data.date_of_birth.slice(0, 10) : "", // 🗓️ format for input[type="date"]
        });
      } catch (err) {
        console.error("Profile load error:", err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "page_size" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const token = await checkToken();
    if (!token) {
      navigate(`/login`)
    }

    try {
      const res = await fetch(`${API_URL}/protected/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          family_name: formData.family_name,
          email: formData.email,
          date_of_birth: formData.date_of_birth,
          preferences: { page_size: formData.page_size },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      setUser(data.user);
      setMessage("Profile updated successfully.");
      setEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user || !formData) return <p>Loading profile...</p>;

  return (
    <div className="container">
      <h2>My Profile</h2>

      {editing ? (
        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <strong>Username:</strong> {user.username}
          </div>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="input"
          />
          <input
            type="text"
            name="family_name"
            value={formData.family_name}
            onChange={handleChange}
            placeholder="Family Name"
            className="input"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input"
          />
          <input
            type="number"
            name="page_size"
            value={formData.page_size}
            onChange={handleChange}
            placeholder="Page Size"
            className="input"
            min={1}
          />
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className="input"
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" className="button">Save</button>
            <button type="button" onClick={() => setEditing(false)} className="button">Cancel</button>
          </div>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      ) : (
        <>
          <div className="field"><strong>Username:</strong> {user.username}</div>
          <div className="field"><strong>First Name:</strong> {user.first_name}</div>
          <div className="field"><strong>Family Name:</strong> {user.family_name}</div>
          <div className="field"><strong>Email:</strong> {user.email}</div>
          <div className="field">
            <strong>Date of Birth:</strong>{" "}
            {user.date_of_birth ? user.date_of_birth.slice(0, 10) : "N/A"}
          </div>
          <div className="field"><strong>Admin:</strong> {user.is_admin ? "Yes" : "No"}</div>
          <div className="field">
            <strong>Page Size Preference:</strong>{" "}
            {user.preferences?.page_size ?? "Default (12)"}
          </div>
          <button onClick={() => setEditing(true)} className="button">Edit Profile</button>
        </>
      )}
    </div>
  );
}


