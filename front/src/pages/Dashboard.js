import { useNavigate, Link } from "react-router-dom";
export default function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard.welcome">
        Welcome, {username || "Guest"}
      </h2>
      {username ? (
      <button onClick={handleLogout} className="dashboard.button">
        Logout
      </button>
    ) : (
      <Link to="/login" className="dashboard.link">please login</Link>
    )}
  </div>
  
  );
}

/*const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between", // pushes children to left and right
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
  },
  welcome: {
    margin: 0,
    fontSize: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
  button: {
    fontSize: "16px",
    cursor: "pointer",
    padding: "6px 12px",
    backgroundColor: "#f44336",
    border: "none",
    color: "white",
    borderRadius: "4px",
  },
};*/
/*const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between", // spread items across full width
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
  },
  
  link : {color: "white"},
  button: {
    marginTop: "5 px",
    fontSize: "16px",
    cursor: "pointer",
  },
};*/
