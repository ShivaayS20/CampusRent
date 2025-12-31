import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Left */}
        <div style={styles.left}>
          <div style={styles.logoBox}>
            <span style={styles.lockIcon}>🔒</span>
            <span style={styles.logoText}>CampusRent</span>
          </div>
        </div>

        {/* Center */}
        <div style={styles.center}>
          <span style={styles.link}>Privacy</span>
          <span style={styles.link}>Terms</span>
          <span style={styles.link}>Safety Guide</span>
        </div>

        {/* Right */}
        <div style={styles.right}>
          © 2025 Built for students, by students.
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "#fff",
    padding: "18px 80px",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "15px",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "600",
    color: "#111827",
    fontSize: "16px",
  },
  lockIcon: {
    backgroundColor: "#111827",
    color: "#fff",
    borderRadius: "6px",
    padding: "4px 6px",
    fontSize: "14px",
  },
  logoText: {
    fontWeight: "600",
  },
  center: {
    display: "flex",
    gap: "25px",
    fontSize: "13px",
    color: "#6b7280",
  },
  link: {
    cursor: "pointer",
  },
  right: {
    fontSize: "12px",
    color: "#9ca3af",
  },
};

export default Footer;
