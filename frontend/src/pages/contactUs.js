import React, { useState } from 'react';
import { Mail, Headset, Clock, CheckCircle, Send } from 'lucide-react';

const ORANGE = '#ff6b35';
const ORANGE2 = '#f7931e';
const DARK = '#0F172A';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message Sent:", formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const infoItems = [
    {
      icon: <Mail size={22} color={ORANGE} />,
      title: "Email Us",
      detail: "support@campusrent.com",
    },
    {
      icon: <Headset size={22} color={ORANGE} />,
      title: "Campus Help Desk",
      detail: "Visit your on-campus student support center.",
    },
    {
      icon: <Clock size={22} color={ORANGE} />,
      title: "Response Time",
      detail: "We reply within 24 hours.",
    },
  ];

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Plus Jakarta Sans', system-ui, sans-serif !important; box-sizing: border-box; }
        @keyframes fadeUp {
  0%{
    opacity:0;
    transform:translateY(35px) scale(.96);
    filter:blur(6px);
  }

  100%{
    opacity:1;
    transform:translateY(0) scale(1);
    filter:blur(0);
  }
}
        @keyframes successPop { from { opacity:0; transform:scale(0.92) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
        .anim-fade-up{
  opacity:0;
  animation:fadeUp .8s cubic-bezier(.16,1,.3,1) forwards;
}
        .success-pop { animation: successPop 0.5s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      {/* HERO HEADER */}
      <header style={styles.heroHeader} className="anim-fade-up">
        <div style={styles.heroBg1} />
        <div style={styles.heroBg2} />
        <div style={styles.heroContent}>
          
          <h1 style={styles.mainTitle}>Contact <span style={styles.titleAccent}>Us</span></h1>
          <p style={styles.subTitle}>
            Have a question, feedback, or need support? Reach out and we'll get back to you as soon as possible.
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div style={styles.contentContainer}>

        {/* LEFT — FORM */}
        <div style={styles.formCard} className="anim-fade-up">
          <div style={styles.formCardHeader}>
            <h2 style={styles.cardTitle}>Get in Touch</h2>
            <p style={styles.cardDesc}>Fill out the form and we'll respond shortly.</p>
          </div>

          {/* SUCCESS STATE */}
          {submitted && (
            <div style={styles.successBox} className="success-pop">
              <CheckCircle size={22} color="#10b981" />
              <div>
                <div style={styles.successTitle}>Message Sent!</div>
                <div style={styles.successSub}>We'll get back to you within 24 hours.</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Priya Sharma"
                style={{
                  ...styles.input,
                  borderColor: focusedField === 'name' ? ORANGE : '#E2E8F0',
                  boxShadow: focusedField === 'name' ? `0 0 0 3px rgba(255,107,53,0.12)` : 'none',
                }}
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@college.edu"
                style={{
                  ...styles.input,
                  borderColor: focusedField === 'email' ? ORANGE : '#E2E8F0',
                  boxShadow: focusedField === 'email' ? `0 0 0 3px rgba(255,107,53,0.12)` : 'none',
                }}
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Your Message</label>
              <textarea
                name="message"
                placeholder="Tell us how we can help..."
                style={{
                  ...styles.textarea,
                  borderColor: focusedField === 'message' ? ORANGE : '#E2E8F0',
                  boxShadow: focusedField === 'message' ? `0 0 0 3px rgba(255,107,53,0.12)` : 'none',
                }}
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                ...styles.sendBtn,
                background: hoveredBtn
                  ? `linear-gradient(135deg, #e85a25, #e07010)`
                  : `linear-gradient(135deg, ${ORANGE}, ${ORANGE2})`,
                transform: hoveredBtn ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hoveredBtn
                  ? `0 12px 28px rgba(255,107,53,0.38)`
                  : `0 6px 18px rgba(255,107,53,0.28)`,
              }}
              onMouseEnter={() => setHoveredBtn(true)}
              onMouseLeave={() => setHoveredBtn(false)}
            >
              <Send size={16} /> Send Message
            </button>
          </form>
        </div>

        {/* RIGHT — INFO CARDS */}
        <div style={styles.infoColumn}>
          {/* Top blurb */}
          <div
  style={styles.infoBlurb}
  className="anim-fade-up"
>
            <h3 style={styles.infoBlurbTitle}>We'd love to hear from you.</h3>
            <p style={styles.infoBlurbText}>
              Whether it's a bug, a suggestion, or just a hello — our team reads every message.
            </p>
          </div>

          {infoItems.map((item, i) => (
  <div
    key={i}
    className="anim-fade-up"
    style={{
      ...styles.infoCard,
      animationDelay: `${0.15 + i * 0.12}s`,
      borderColor: hoveredCard === i ? `rgba(255,107,53,0.25)` : '#E2E8F0',
      boxShadow:
        hoveredCard === i
          ? '0 12px 32px rgba(15,23,42,0.09)'
          : '0 2px 10px rgba(15,23,42,0.04)',
      transform:
        hoveredCard === i
          ? 'translateY(-3px)'
          : 'translateY(0)',
    }}
    onMouseEnter={() => setHoveredCard(i)}
    onMouseLeave={() => setHoveredCard(null)}
  >
              <div style={styles.iconCircle}>{item.icon}</div>
              <div style={styles.infoText}>
                <h3 style={styles.infoTitle}>{item.title}</h3>
                <p style={styles.infoDetail}>{item.detail}</p>
              </div>
            </div>
          ))}

          {/* Bottom note */}
          <div
  style={{
    ...styles.noteBox,
    animationDelay: "0.6s"
  }}
  className="anim-fade-up"
>
            <span style={styles.noteDot} />
            <p style={styles.noteText}>
              CampusRent is a student-first platform. Your feedback directly shapes our roadmap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#F8FAFC',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowX: 'hidden',
    paddingBottom: '80px',
  },

  // HERO HEADER
  heroHeader: {
    width: '100%',
    background: `linear-gradient(135deg, #0F172A 0%, #1e293b 100%)`,
    padding: '20px 8% 20px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: '-60px',
  },
  heroBg1: {
    position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,107,53,0.18) 0%, transparent 70%)',
    top: '-150px', right: '-80px', pointerEvents: 'none',
  },
  heroBg2: {
    position: 'absolute', width: '350px', height: '350px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(247,147,30,0.12) 0%, transparent 70%)',
    bottom: '-100px', left: '5%', pointerEvents: 'none',
  },
  heroContent: { position: 'relative', zIndex: 1 },
  heroBadge: {
    display: 'inline-block',
    fontSize: '12px', fontWeight: '700',
    color: ORANGE, background: 'rgba(255,107,53,0.12)',
    border: '1px solid rgba(255,107,53,0.25)',
    padding: '6px 16px', borderRadius: '30px',
    marginBottom: '20px', letterSpacing: '0.04em',
  },
  mainTitle: {
    fontSize: '42px', fontWeight: '900',
    color: '#fff', margin: '0 0 16px',
    letterSpacing: '-0.02em', lineHeight: '1.1',
  },
  titleAccent: {
    background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE2})`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  },
  subTitle: {
    fontSize: '16px', color: 'rgba(255,255,255,0.55)',
    lineHeight: '1.7', maxWidth: '520px', margin: '0 auto',
    fontWeight: '500',
  },

  // CONTENT
  contentContainer: {
    display: 'flex',
    gap: '28px',
    maxWidth: '1060px',
    width: '90%',
    zIndex: 2,
    marginTop: '80px',
    flexWrap: 'wrap',
  },

  // FORM CARD
  formCard: {
    flex: 1.3,
    minWidth: '300px',
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: '0 10px 40px rgba(15,23,42,0.08)',
    border: '1px solid #E2E8F0',
  },
  formCardHeader: {
    marginBottom: '28px',
    paddingBottom: '24px',
    borderBottom: '1px solid #F1F5F9',
  },
  cardTitle: {
    fontSize: '22px', fontWeight: '800',
    color: DARK, margin: '0 0 6px',
    letterSpacing: '-0.02em',
  },
  cardDesc: {
    fontSize: '14px', color: '#64748b',
    margin: 0, fontWeight: '500',
  },

  // SUCCESS
  successBox: {
    display: 'flex', alignItems: 'center', gap: '14px',
    background: '#ecfdf5', border: '1px solid #6ee7b7',
    borderRadius: '14px', padding: '16px 20px', marginBottom: '24px',
  },
  successTitle: { fontSize: '15px', fontWeight: '700', color: '#065f46' },
  successSub: { fontSize: '13px', color: '#047857', marginTop: '2px' },

  // FORM ELEMENTS
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '7px' },
  inputLabel: {
    fontSize: '13px', fontWeight: '700',
    color: '#334155', letterSpacing: '0.01em',
  },
  input: {
    padding: '13px 16px',
    borderRadius: '12px',
    border: '1.5px solid #E2E8F0',
    backgroundColor: '#F8FAFC',
    fontSize: '14px', color: DARK,
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    fontWeight: '500',
  },
  textarea: {
    padding: '13px 16px',
    borderRadius: '12px',
    border: '1.5px solid #E2E8F0',
    backgroundColor: '#F8FAFC',
    fontSize: '14px', color: DARK,
    minHeight: '130px',
    outline: 'none',
    resize: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    fontWeight: '500',
  },
  sendBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '8px', alignSelf: 'flex-end',
    color: '#ffffff', padding: '13px 28px',
    border: 'none', borderRadius: '14px',
    fontSize: '14px', fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    letterSpacing: '0.01em',
  },

  // INFO COLUMN
  infoColumn: {
    flex: 1, minWidth: '260px',
    display: 'flex', flexDirection: 'column', gap: '16px',
  },
  infoBlurb: {
    background: `linear-gradient(135deg, ${DARK} 0%, #1e293b 100%)`,
    borderRadius: '20px', padding: '28px 26px',
    position: 'relative', overflow: 'hidden',
  },
  infoBlurbTitle: {
    fontSize: '18px', fontWeight: '800', color: '#fff',
    margin: '0 0 8px', letterSpacing: '-0.01em',
  },
  infoBlurbText: {
    fontSize: '13px', color: 'rgba(255,255,255,0.55)',
    lineHeight: '1.6', margin: 0, fontWeight: '500',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: '20px 22px',
    borderRadius: '18px',
    display: 'flex', alignItems: 'center', gap: '18px',
    border: '1.5px solid #E2E8F0',
    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
    cursor: 'default',
  },
  iconCircle: {
    width: '48px', height: '48px', borderRadius: '14px',
    backgroundColor: 'rgba(255,107,53,0.08)',
    border: '1px solid rgba(255,107,53,0.15)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  infoText: { display: 'flex', flexDirection: 'column', gap: '3px' },
  infoTitle: {
    fontSize: '15px', color: DARK,
    margin: 0, fontWeight: '700',
  },
  infoDetail: {
    fontSize: '13px', color: '#64748b',
    margin: 0, fontWeight: '500', lineHeight: '1.5',
  },
  noteBox: {
    display: 'flex', alignItems: 'flex-start', gap: '12px',
    background: 'rgba(255,107,53,0.06)',
    border: '1px solid rgba(255,107,53,0.15)',
    borderRadius: '14px', padding: '16px 18px',
  },
  noteDot: {
    width: '8px', height: '8px', borderRadius: '50%',
    backgroundColor: ORANGE, flexShrink: 0, marginTop: '4px',
  },
  noteText: {
    fontSize: '13px', color: '#64748b',
    margin: 0, lineHeight: '1.6', fontWeight: '500',
  },
};

export default ContactUs;