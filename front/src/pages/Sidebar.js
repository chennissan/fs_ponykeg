import { NavLink } from "react-router-dom";
import { FaUser, FaCog, FaShoppingCart } from "react-icons/fa";
import { checkToken } from "../utils/user";
export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>
         <NavLink to="/" style={styles.link}>
        <FaUser style={styles.icon} />
        <span style={styles.label}>Home</span>
      </NavLink>

      <NavLink to="/about" style={styles.link}>
        <FaUser style={styles.icon} />
        <span style={styles.label}>About</span>
      </NavLink>

      <NavLink to="/profile" style={styles.link}>
        <FaUser style={styles.icon} />
        <span style={styles.label}>Profile</span>
      </NavLink>

      <NavLink to="/change_password" style={styles.link}>
        <FaUser style={styles.icon} />
        <span style={styles.label}>Password</span>
      </NavLink>

      <NavLink to="/search_users" style={styles.link}>
        <FaUser style={styles.icon} />
        <span style={styles.label}>Search users</span>
      </NavLink>

      <NavLink to="/products" style={styles.link}>
        <FaCog style={styles.icon} />
        <span style={styles.label}>Search products</span>
      </NavLink>
 

      <NavLink to="/add_product" style={styles.link}>
        <FaCog style={styles.icon} />
        <span style={styles.label}>Add product</span>
      </NavLink>
            
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "160px", // slightly wider to fit text
    background: "#f0f0f0",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    paddingTop: "20px",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  },
  link: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    color: "#333",
    textDecoration: "none",
    fontSize: "16px",
    gap: "10px",
  },
  icon: {
    fontSize: "20px",
  },
  label: {
    whiteSpace: "nowrap",
  },
};