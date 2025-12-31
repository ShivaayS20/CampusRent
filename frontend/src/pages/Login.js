import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ STORE TOKEN
      localStorage.setItem("campusRentToken", data.token);

      // ✅ STORE USER (THIS WAS MISSING)
      localStorage.setItem("campusRentUser", JSON.stringify(data.user));

      setShowSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    }
  };

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userData = {
      uid: user.uid,
      email: user.email,
      firstName: user.displayName ? user.displayName.split(" ")[0] : "Shivam",
      lastName: user.displayName ? user.displayName.split(" ")[1] || "" : "",
      // ✅ Map Google's photoURL to 'avatar' so Profile.js can see it
      avatar: user.photoURL 
    };

    localStorage.setItem("campusRentUser", JSON.stringify(userData));

    setShowSuccess(true);
    setTimeout(() => {
      navigate("/profile"); // Redirect straight to profile to see the fix
      window.location.reload(); 
    }, 800);

  } catch (err) {
    if (err.code !== "auth/popup-closed-by-user") {
      console.error(err);
    }
  }
};


  return (
    <div style={styles.container}>
      {showSuccess && (
        <div style={styles.successToast}>
          ✅ Login successful
        </div>
      )}

      <div style={styles.card}>
        <h2 style={styles.title}>Login to CampusRent</h2>
        <p style={styles.subtitle}>
          Access your campus rental dashboard
        </p>

        {error && (
          <p style={{ color: "red", fontSize: "13px", textAlign: "center" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>College Email</label>
            <input
              type="email"
              placeholder="example@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.loginBtn}>
            Login
          </button>

              <button
  onClick={handleGoogleLogin}
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  }}
>
  Continue with Google
</button>


        </form>

        <p style={styles.footerText}>
          Don’t have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

/* --- STYLES (UNCHANGED) --- */
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f7ff",
    fontFamily: '"Inter", sans-serif',
    position: "relative",
  },
  successToast: {
    position: "absolute",
    top: "20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  },
  card: {
    width: "380px",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    marginBottom: "8px",
    color: "#0d1b3e",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "6px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  loginBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  footerText: {
    textAlign: "center",
    fontSize: "13px",
    marginTop: "20px",
    color: "#555",
  },
  link: {
    color: "#1a73e8",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Login;
