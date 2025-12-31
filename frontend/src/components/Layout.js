import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("campusRentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* --- NAVBAR --- */}
      <nav style={styles.navbar}>
  <div
    style={styles.logo}
    onClick={() => navigate("/")}
  >
    CampusRent
    {user && (
      <span style={styles.welcomeText}>
        | Welcome, {user.firstName}
      </span>
    )}
  </div>

  <div style={styles.navLinks}>
    <span
      style={{
        ...styles.link,
        ...(isActive("/") && styles.activeLink),
      }}
      onClick={() => navigate("/")}
    >
      Home
    </span>

    <span
      style={{
        ...styles.link,
        ...(isActive("/market") && styles.activeLink),
      }}
      onClick={() => navigate("/market")}
    >
      Rental Market
    </span>

    <span
      style={{
        ...styles.link,
        ...(isActive("/contactus") && styles.activeLink),
      }}
      onClick={() => navigate("/contactus")}
    >
      Contact Us
    </span>

    {/* ✅ LIST ITEM BUTTON */}
    {user && (
      <button
        style={styles.listBtn}
        onClick={() => navigate("/add-item")}
      >
        + List Item
      </button>
    )}

    {/* ✅ UPDATED PROFILE ICON: Now shows the Google Avatar */}
    {user && (
      <div
        style={styles.profileWrapper}
        onClick={() => navigate("/profile")}
        title="View Profile"
      >
        <img
          src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName}`}
          alt="Profile"
          style={styles.navAvatar}
          onError={(e) => {
            e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName}`;
          }}
        />
      </div>
    )}

    {!user && (
      <div style={styles.authButtons}>
        <button
          style={styles.loginBtn}
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button
          style={styles.registerBtn}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    )}
  </div>
</nav>

      {/* --- PAGE CONTENT --- */}
      <Outlet />
      {/* --- FOOTER (GLOBAL) --- */}
    <Footer />
    </>
  );
};

/* --- STYLES --- */
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 80px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1a73e8",
    cursor: "pointer",
  },
  welcomeText: {
    fontSize: "14px",
    marginLeft: "10px",
    color: "#555",
    fontWeight: "400",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  link: {
    fontSize: "15px",
    color: "#555",
    cursor: "pointer",
    fontWeight: "400",
    transition: "color 0.2s ease",
  },
  activeLink: {
    color: "#1a73e8",
    fontWeight: "600",
  },
  authButtons: {
    display: "flex",
    gap: "15px",
    marginLeft: "10px",
  },
  loginBtn: {
    border: "none",
    background: "none",
    color: "#1a73e8",
    fontWeight: "600",
    cursor: "pointer",
  },
  registerBtn: {
    padding: "10px 25px",
    backgroundColor: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    fontWeight: "600",
    cursor: "pointer",
  },
  listBtn: {
    padding: "8px 18px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
 profileWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    border: '2px solid #1a73e8',
    overflow: 'hidden', // Ensures the image stays within the circle
    marginLeft: '15px',
    transition: 'transform 0.2s ease',
  },
  navAvatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};

export default Layout;
