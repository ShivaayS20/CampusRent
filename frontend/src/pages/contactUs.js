import React, { useState } from 'react';
import { Mail, Headset, Clock, Lock } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message Sent:", formData);
    alert("Thank you! Your message has been sent.");
  };

  return (
    <div style={styles.pageWrapper}>
      {/* --- HEADER SECTION --- */}
      <header style={styles.headerSection}>
        <h1 style={styles.mainTitle}>Contact Us</h1>
        <p style={styles.subTitle}>
          We're here to help you. Have any question, feedback, or need support?<br />
          Reach out to us and we'll get back to you as soon as possible.
        </p>
      </header>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div style={styles.contentContainer}>
        
        {/* Left Side: Form Card */}
        <div style={styles.formCard}>
          <h2 style={styles.cardTitle}>Get in Touch</h2>
          <p style={styles.cardDesc}>Fill out the form and we'll respond shortly.</p>
          
          <form onSubmit={handleSubmit} style={styles.form}>
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              style={styles.input} 
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              style={styles.input} 
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <textarea 
              name="message"
              placeholder="Your Message" 
              style={styles.textarea} 
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            <div style={styles.btnWrapper}>
              <button type="submit" style={styles.sendBtn}>Send Message</button>
            </div>
          </form>
        </div>

        {/* Right Side: Info Cards */}
        <div style={styles.infoColumn}>
          
          {/* Email Us Card */}
          <div style={styles.infoCard}>
            <div style={styles.iconCircle}>
              <Mail size={24} color="#3b82f6" fill="#dbeafe" />
            </div>
            <div style={styles.infoText}>
              <h3 style={styles.infoTitle}>Email Us</h3>
              <p style={styles.infoDetail}>support@campusrent.com</p>
            </div>
          </div>

          {/* Help Desk Card */}
          <div style={styles.infoCard}>
            <div style={styles.iconCircle}>
              <Headset size={24} color="#3b82f6" />
            </div>
            <div style={styles.infoText}>
              <h3 style={styles.infoTitle}>Campus Help Desk</h3>
              <p style={styles.infoDetail}>Visit your on-campus student support center.</p>
            </div>
          </div>

          {/* Response Time Card */}
          <div style={styles.infoCard}>
            <div style={styles.iconCircle}>
              <Clock size={24} color="#3b82f6" />
            </div>
            <div style={styles.infoText}>
              <h3 style={styles.infoTitle}>Response Time</h3>
              <p style={styles.infoDetail}>We reply within <strong>24 hours.</strong></p>
            </div>
          </div>

        </div>
      </div>

     
    </div>
  );
};

// --- STYLES ---
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: '#f9faff',
    // Background wave effect simulation
    backgroundImage: `linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '60px',
    position: 'relative',
    overflowX: 'hidden'
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: '50px',
    zIndex: 2,
  },
  mainTitle: {
    fontSize: '36px',
    color: '#1e293b',
    fontWeight: '600',
    marginBottom: '15px'
  },
  subTitle: {
    fontSize: '16px',
    color: '#64748b',
    lineHeight: '1.6',
    maxWidth: '600px'
  },
  contentContainer: {
    display: 'flex',
    gap: '30px',
    maxWidth: '1000px',
    width: '90%',
    zIndex: 2,
    marginBottom: '100px'
  },
  formCard: {
    flex: 1.2,
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
  },
  cardTitle: {
    fontSize: '24px',
    color: '#1e293b',
    marginBottom: '10px'
  },
  cardDesc: {
    fontSize: '15px',
    color: '#64748b',
    marginBottom: '30px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '12px 15px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: '14px',
    outline: 'none',
    transition: 'border 0.2s',
  },
  textarea: {
    padding: '12px 15px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: '14px',
    minHeight: '120px',
    outline: 'none',
    resize: 'none'
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px'
  },
  sendBtn: {
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  infoColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
  },
  iconCircle: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#f0f7ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  infoTitle: {
    fontSize: '16px',
    color: '#1e293b',
    margin: 0,
    fontWeight: '600'
  },
  infoDetail: {
    fontSize: '14px',
    color: '#4f46e5',
    margin: 0
  },
  footer: {
    marginTop: 'auto',
    width: '100%',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e2e8f0',
    padding: '20px 8%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#94a3b8',
    fontSize: '12px'
  },
  footerBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  lockIcon: {
    backgroundColor: '#1e293b',
    borderRadius: '4px',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  brandName: {
    fontWeight: '700',
    color: '#1e293b',
    fontSize: '16px'
  },
  footerLinks: {
    fontWeight: '600',
    letterSpacing: '0.5px'
  },
  footerCopyright: {
    letterSpacing: '0.5px'
  }
};

export default ContactUs;