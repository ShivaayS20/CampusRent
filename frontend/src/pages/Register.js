import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: 'male'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ EMERGENCY FIX: LocalStorage instead of localhost backend
  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Create a mock user object to store
      const mockUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        avatar: "https://lh3.googleusercontent.com/a/ACg8ocL...", // Dummy avatar
      };

      // ✅ SAVE TO LOCALSTORAGE
      // This allows the app to stay logged in on the live Vercel link
      localStorage.setItem("campusRentUser", JSON.stringify(mockUser));
      localStorage.setItem("campusRentToken", "mock_token_" + Date.now());

      alert("Registration successful!");
      
      // Redirect to home/dashboard
      navigate("/");

    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.registrationCard}>

        {/* Header */}
        <div style={styles.header}>
          STUDENT REGISTRATION FORM
        </div>

        <div style={styles.formContainer}>
          <form style={styles.form} onSubmit={handleSubmit}>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>FIRST NAME:</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                style={styles.input}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>LAST NAME:</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                style={styles.input}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>EMAIL:</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                style={styles.input}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>PHONE:</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                style={styles.input}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.row}>
              <div style={{ ...styles.inputGroup, flex: 1 }}>
                <label style={styles.label}>PASSWORD:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  style={styles.input}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ ...styles.inputGroup, flex: 1, marginLeft: '15px' }}>
                <label style={styles.label}>CONFIRM PASSWORD:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  style={styles.input}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <p style={styles.helperText}>Minimum of 6 characters</p>

            <div style={styles.genderContainer}>
              <span style={styles.label}>GENDER</span>
              <div style={styles.radioGroup}>
                <label style={styles.radioLabel}>
                  <input type="radio" name="gender" value="male" defaultChecked /> Male
                </label>
                <label style={styles.radioLabel}>
                  <input type="radio" name="gender" value="female" /> Female
                </label>
              </div>
            </div>

            <button type="submit" style={styles.submitBtn}>
              SUBMIT
            </button>
          </form>
        </div>

        <div style={styles.footerText}>
          © 2025 Student Registration Form. All Rights Reserved | Design by CampusRent
        </div>
      </div>
    </div>
  );
};

// --- STYLES (UNCHANGED) ---
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    fontFamily: '"Arial", sans-serif',
    padding: '20px',
  },
  registrationCard: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#fff',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    fontSize: '20px',
    letterSpacing: '1.5px',
  },
  formContainer: {
    padding: '40px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#444',
  },
  input: {
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '0px',
    fontSize: '14px',
    outline: 'none',
  },
  row: {
    display: 'flex',
  },
  helperText: {
    color: '#d9534f',
    fontSize: '11px',
    marginTop: '-12px',
    fontStyle: 'italic',
  },
  genderContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
  },
  radioGroup: {
    display: 'flex',
    gap: '20px',
  },
  radioLabel: {
    fontSize: '13px',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  submitBtn: {
    backgroundColor: '#9e5a5a',
    color: '#fff',
    border: 'none',
    padding: '14px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  footerText: {
    textAlign: 'center',
    fontSize: '11px',
    color: '#888',
    padding: '20px',
    borderTop: '1px solid #f0f0f0',
  },
};

export default RegistrationPage;