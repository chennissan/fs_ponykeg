import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // Redirect to login, but remember where the user was going
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}