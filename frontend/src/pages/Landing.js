import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // ✅ MOVE handleLogout HERE
  const handleLogout = () => {
    localStorage.removeItem("campusRentUser");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("campusRentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  return (
    <div style={styles.container}>
      {/* ✅ ADDED HOVER & GLOW EFFECTS VIA CSS CLASSES */}
      <style>{`
        .primary-btn-glow {
          transition: all 0.3s ease !important;
          cursor: pointer;
        }
        .primary-btn-glow:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(26, 115, 232, 0.5);
          filter: brightness(1.1);
        }
        .secondary-btn-glow {
          transition: all 0.3s ease !important;
          cursor: pointer;
        }
        .secondary-btn-glow:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(26, 115, 232, 0.2);
          background-color: rgba(26, 115, 232, 0.05) !important;
        }
        .feature-card-hover {
          transition: all 0.3s ease !important;
        }
        .feature-card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Rent Everything You Need for College</h1>
          <p style={styles.heroSubtitle}>
            From textbooks and calculators to mini-fridges and lab coats.
            Save money, reduce waste, and help your campus community.
          </p>
          <div style={styles.heroBtns}>
            <button
              className="primary-btn-glow"
              style={styles.primaryBtn}
              onClick={() => navigate("/login")}
            >
              Start Renting
            </button>

            <button className="secondary-btn-glow" style={styles.secondaryBtn}>Explore Market</button>
          </div>
        </div>

        <div style={styles.heroImageContainer}>
          <div style={styles.placeholderIllustration}>
            <div style={styles.blueCurve}></div>

            <img
              src="https://img.freepik.com/free-vector/hand-drawn-back-school-elements-collection_23-2149492927.jpg?semt=ais_hybrid&w=740&q=80"
              alt="College Items"
              style={{
                ...styles.heroImg,
                borderRadius: "20px",
                marginLeft: "60px",
              }}
            />
          </div>
        </div>
      </header>

      {/* --- FEATURES SECTION --- */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Your Campus Rental Hub</h2>
        <p style={styles.sectionSubtitle}>
          Whether you're looking to save or earn, we make it easy.
        </p>

        <div style={styles.featuresGrid}>
          <div style={styles.featureColumn}>
            <h3 style={styles.columnHeader}>For Students Renting</h3>
            <div className="feature-card-hover" style={styles.featureCard}>
              <div style={styles.iconBox}>🔍</div>
              <div>
                <h4 style={styles.cardTitle}>Easy Search</h4>
                <p style={styles.cardText}>
                  Find textbooks, gadgets, and furniture near your dorm instantly.
                </p>
              </div>
            </div>

            <div className="feature-card-hover" style={styles.featureCard}>
              <div style={styles.iconBox}>💰</div>
              <div>
                <h4 style={styles.cardTitle}>Save Money</h4>
                <p style={styles.cardText}>
                  Rent items for a fraction of the retail price instead of buying new.
                </p>
              </div>
            </div>
          </div>

          <div style={styles.featureColumn}>
            <h3 style={styles.columnHeader}>For Students Listing Items</h3>
            <div className="feature-card-hover" style={styles.featureCard}>
              <div style={styles.iconBox}>📈</div>
              <div>
                <h4 style={styles.cardTitle}>Earn Extra Cash</h4>
                <p style={styles.cardText}>
                  Turn your unused items into a steady stream of passive income.
                </p>
              </div>
            </div>

            <div className="feature-card-hover" style={styles.featureCard}>
              <div style={styles.iconBox}>🤝</div>
              <div>
                <h4 style={styles.cardTitle}>Verified Users</h4>
                <p style={styles.cardText}>
                  Rent only to verified students on your campus for total peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- STYLES (RESTORED TO ORIGINAL FULL VERSION) ---
const styles = {
  container: {
    fontFamily: '"Inter", sans-serif',
    color: '#333',
    backgroundColor: '#fff',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 80px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
  },
  link: {
    textDecoration: 'none',
    color: '#555',
    fontWeight: '500',
    fontSize: '15px',
    cursor: 'pointer', 
  },
  authButtons: {
    display: 'flex',
    gap: '15px',
    marginLeft: '20px',
  },
  loginBtn: {
    border: 'none',
    background: 'none',
    color: '#1a73e8',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  registerBtn: {
    padding: '10px 25 kept exactly as same as your input 5',
    backgroundColor: '#1a73e8',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  hero: {
    display: 'flex',
    padding: '60px 80px',
    background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)',
  },
  heroContent: { flex: 1 },
  heroTitle: { fontSize: '48px', marginBottom: '20px' },
  heroSubtitle: { fontSize: '18px', marginBottom: '30px' },
  heroBtns: { display: 'flex', gap: '15px' },
  primaryBtn: {
    padding: '15px 30px',
    backgroundColor: '#1a73e8',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
  },
  secondaryBtn: {
    padding: '15px 30px',
    backgroundColor: 'transparent',
    border: '2px solid #1a73e8',
    color: '#1a73e8',
    borderRadius: '8px',
  },
  heroImageContainer: { flex: 1, display: 'flex', justifyContent: 'center' },
  heroImg: { width: '300px' },
  featuresSection: {
    padding: '80px',
    backgroundColor: '#f9fbff',
    textAlign: 'center',
  },
  sectionTitle: { fontSize: '32px' },
  sectionSubtitle: { marginBottom: '50px', color: '#777' },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
  },
  featureColumn: { textAlign: 'left' },
  columnHeader: {
    fontSize: '20px',
    borderBottom: '3px solid #1a73e8',
    display: 'inline-block',
    marginBottom: '25px',
  },
  featureCard: {
    display: 'flex',
    gap: '20px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
  },
  iconBox: {
    fontSize: '30px',
    backgroundColor: '#e8f0fe',
    padding: '15px',
    borderRadius: '10px',
  },
  cardTitle: { fontSize: '18px' },
  cardText: { fontSize: '14px', color: '#666' },
  footer: {
    padding: '40px 80px',
    backgroundColor: '#0d1b3e',
    color: '#fff',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  footerLinks: { display: 'flex', gap: '20px' },
  fLink: { color: '#bbb', textDecoration: 'none' },
  footerCopyright: {
    width: '100%',
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '13px',
    color: '#777',
  },
};

export default LandingPage;