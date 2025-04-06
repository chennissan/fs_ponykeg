import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.css";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./pages/Sidebar";

export default function Layout() {
  return (
    <div className="layout-grid">
      <header className="layout-header">{<Dashboard />}</header>
      <aside className="layout-menu">{<Sidebar />}</aside>
      <main className="layout-main">
        <Outlet /> {/* This is where routed pages will show up */}
      </main>
      <footer className="layout-footer">
  <div className="footer-content">
    <img src="/pklogo.png" alt="Company Logo" className="footer-logo" />
    <div className="footer-quote">
      <h2>“Here’s to alcohol: the cause of, and solution to, all of life’s problems.”</h2>
      <h3>Homer Simpson</h3>
    </div>
  </div>
</footer>
    </div>
  );
}