import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(false);
  const [countDone, setCountDone] = useState(false);
  const [counts, setCounts] = useState({ items: 0, students: 0, saved: 0 });

  // Timeline Progress State
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef(null);

  // Intersection Observer for Step Cards
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const [step1Visible, setStep1Visible] = useState(false);
  const [step2Visible, setStep2Visible] = useState(false);
  const [step3Visible, setStep3Visible] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("campusRentUser");
    if (storedUser) setUser(JSON.parse(storedUser));
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    if (!countDone) {
      const targets = { items: 500, students: 2000, saved: 80 };
      const steps = 60;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setCounts({
          items: Math.floor(targets.items * progress),
          students: Math.floor(targets.students * progress),
          saved: Math.floor(targets.saved * progress),
        });
        if (step >= steps) { clearInterval(timer); setCounts(targets); setCountDone(true); }
      }, 2000 / steps);
      return () => clearInterval(timer);
    }
  }, [countDone]);

  // Handle Timeline Progress Tracking on Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the timeline container has entered/passed the middle of the screen
      const startEval = windowHeight * 0.65;
      const totalHeight = rect.height;
      const currentProgress = startEval - rect.top;
      
      let percentage = currentProgress / totalHeight;
      if (percentage < 0) percentage = 0;
      if (percentage > 1) percentage = 1;
      
      setScrollProgress(percentage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer implementation for step card entry animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1,
    };

    const cb = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === step1Ref.current) setStep1Visible(true);
          if (entry.target === step2Ref.current) setStep2Visible(true);
          if (entry.target === step3Ref.current) setStep3Visible(true);
        }
      });
    };

    const observer = new IntersectionObserver(cb, observerOptions);
    if (step1Ref.current) observer.observe(step1Ref.current);
    if (step2Ref.current) observer.observe(step2Ref.current);
    if (step3Ref.current) observer.observe(step3Ref.current);

    return () => observer.disconnect();
  }, []);

  const rentItems = [
    { emoji: "💻", label: "Laptops & Gadgets" },
    { emoji: "📐", label: "Lab Equipment" },
    { emoji: "📚", label: "Textbooks" },
    { emoji: "🎒", label: "Bags & Accessories" },
    { emoji: "⚽", label: "Sports Gear" },
    { emoji: "👕", label: "Clothing & Uniforms" },
    { emoji: "📷", label: "Cameras" },
  ];

  const features = [
    { icon: "🔍", title: "Smart Search", desc: "Find what you need in seconds from verified campus listings." },
    { icon: "✅", title: "Verified Students", desc: "Every user is campus-verified for safe and trusted transactions." },
    { icon: "💸", title: "Save Big", desc: "Rent for a fraction of the retail price. Keep money in your pocket." },
    { icon: "📈", title: "Earn Passively", desc: "Turn idle items into income by listing them for other students." },
  ];

  const testimonials = [
    { name: "Priya S.", dept: "B.Tech CSE", text: "Saved ₹3,000 by renting a calculator for my exams. Absolute lifesaver!", avatar: "PS" },
    { name: "Arjun M.", dept: "MBA Finance", text: "Listed my DSLR and earned ₹5,000 last semester. Love this platform!", avatar: "AM" },
    { name: "Riya K.", dept: "B.Sc Chemistry", text: "Got a lab coat within 10 minutes of posting a request. Super fast!", avatar: "RK" },
    { name: "Shivaay", dept: "Btech CSE", text: "Got a laptop within 10 minutes of posting a request. Super fast!", avatar: "SK" },
  ];

  const ORANGE = '#ff6b35';
  const ORANGE2 = '#f7931e';
  const DARK = '#1a1a2e';

  return (
    <div className="landing-wrapper" style={{ fontFamily: "'Poppins', sans-serif", color: DARK, backgroundColor: '#fff', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
       .landing-wrapper,
.landing-wrapper * {
    font-family: 'Your Font', sans-serif;
}
        @keyframes slideLeft { from { opacity:0; transform:translateX(-60px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideRight { from { opacity:0; transform:translateX(60px); } to { opacity:1; transform:translateX(0); } }
        @keyframes floatGirl { 0%,100% { transform:translateY(0px) rotate(-1deg); } 50% { transform:translateY(-18px) rotate(1deg); } }
        @keyframes floatCard { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-10px); } }
        @keyframes pulseDot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.4); } }
        .hero-left { animation: slideLeft 1.8s ease forwards; }
        .hero-right { animation: slideRight 1.8s ease 0.2s both; }
        .girl-img { animation: none }
        .fc1 { animation: floatCard 3s ease-in-out infinite; }
        .fc2 { animation: floatCard 3.5s ease-in-out infinite 0.5s; }
        .fc3 { animation: floatCard 4s ease-in-out infinite 1s; }
        .pri-btn:hover { transform:translateY(-4px) !important; box-shadow:0 20px 40px rgba(255,107,53,0.4) !important; }
        .sec-btn:hover { transform:translateY(-4px) !important; background:rgba(255,107,53,0.08) !important; }
        .fcard:hover { transform:translateY(-8px) !important; box-shadow:0 25px 50px rgba(0,0,0,0.1) !important; }
        .tcard:hover { transform:translateY(-6px) !important; box-shadow:0 20px 40px rgba(0,0,0,0.1) !important; }
        .pcard:hover { transform:translateY(-6px) !important; box-shadow:0 15px 30px rgba(0,0,0,0.1) !important; }
        .cta-p:hover { transform:translateY(-4px) !important; box-shadow:0 20px 40px rgba(255,255,255,0.2) !important; }
        .cta-o:hover { background:rgba(255,255,255,0.12) !important; transform:translateY(-4px) !important; }
        .pri-btn,.sec-btn,.chip,.fcard,.tcard,.pcard,.cta-p,.cta-o { transition:all 0.3s cubic-bezier(0.4,0,0.2,1) !important; cursor:pointer; }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .rent-marquee { width: 100%; overflow: hidden; }
        .rent-track { display: flex; gap: 16px; width: max-content; animation: marquee 22s linear infinite; }
        

        /* Timeline Section Responsive Overrides */
        @media (max-width: 900px) {
          .tl-container { padding-left: 50px !important; padding-right: 20px !important; }
          .tl-line { left: 20px !important; transform: none !important; }
          .tl-row { flex-direction: column !important; align-items: flex-start !important; margin-bottom: 40px !important; }
          .tl-col-left, .tl-col-right { width: 100% !important; text-align: left !important; padding: 0 !important; }
          .tl-node { left: 20px !important; transform: translate(-50%, -50%) !important; top: 0 !important; }
          .tl-col-left { order: 2 !important; }
          .tl-col-right { order: 2 !important; }
          .tl-spacer { display: none !important; }
          .tl-card { max-width: 100% !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ minHeight:'92vh', background:'', display:'flex', alignItems:'center', padding:'10px 8%', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,53,0.12) 0%,transparent 70%)', top:'-150px', right:'-150px', pointerEvents:'none' }}></div>
        <div style={{ position:'absolute', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(247,147,30,0.1) 0%,transparent 70%)', bottom:'-100px', left:'-80px', pointerEvents:'none' }}></div>

        <div style={{ display:'flex', alignItems:'center', gap:'40px', width:'100%', maxWidth:'1400px', margin:'0 auto', position:'relative', zIndex:2, opacity: visible ? 1 : 0, transition:'opacity 0.4s ease' }}>
          {/* LEFT */}
          <div style={{ flex:1.1 }} className="hero-left">
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,107,53,0.1)', color:ORANGE, padding:'8px 18px', borderRadius:'30px', fontSize:'13px', fontWeight:'600', marginBottom:'24px', border:'1px solid rgba(255,107,53,0.25)' }}>
              <span style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:ORANGE, display:'inline-block', animation:'pulseDot 1.5s ease-in-out infinite' }}></span>
              🎓 India's Campus Rental Platform
            </div>

            <h1 style={{ fontSize:'54px', fontWeight:'800', lineHeight:'1.15', color:DARK, margin:'0 0 20px', letterSpacing:'-1px' }}>
              Rent What You Need,<br />
              <span style={{ background:`linear-gradient(135deg,${ORANGE},${ORANGE2})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                Earn From the Rest.
              </span>
            </h1>

            <p style={{ fontSize:'17px', color:'#64748b', lineHeight:'1.7', marginBottom:'36px', maxWidth:'460px' }}>
              Borrow, lend, and save money within your campus community. From textbooks to tech — all verified, all affordable.
            </p>

            <div style={{ display:'flex', gap:'16px', marginBottom:'44px', flexWrap:'wrap' }}>
              <button className="pri-btn" style={{ padding:'16px 34px', background:`linear-gradient(135deg,${ORANGE},${ORANGE2})`, color:'#fff', border:'none', borderRadius:'12px', fontWeight:'700', fontSize:'16px', boxShadow:`0 8px 24px rgba(255,107,53,0.3)` }} onClick={() => navigate("/market")}>Browse Items →</button>
              <button className="sec-btn" style={{ padding:'16px 34px', background:'transparent', border:`2px solid ${ORANGE}`, color:ORANGE, borderRadius:'12px', fontWeight:'700', fontSize:'16px' }} onClick={() => navigate("/register")}>Start Listing</button>
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:'20px' }}>
              {[{ num:`${counts.items}+`, label:'Items Listed' }, { num:`${counts.students}+`, label:'Students' }, { num:`₹${counts.saved}K+`, label:'Saved' }].map((s, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div style={{ width:'1px', height:'36px', backgroundColor:'#e2e8f0' }}></div>}
                  <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
                    <span style={{ fontSize:'26px', fontWeight:'800', color:DARK }}>{s.num}</span>
                    <span style={{ fontSize:'12px', color:'#94a3b8', fontWeight:'500' }}>{s.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ flex:1, position:'relative', height:'520px', display:'flex', alignItems:'flex-end', justifyContent:'center' }} className="hero-right">
            <img
              src="/girl-student.png"
              alt="Student"
              className="girl-img"
              style={{ 
                position:'absolute', bottom:0, left:'0px', zIndex:3, 
                height:'500px', width:'auto', objectFit:'contain', 
                filter:'drop-shadow(0 20px 40px rgba(0,0,0,0.2))' 
              }}
            />

            {/* Floating cards */}
            <div className="fc1" style={{ position:'absolute', top:'40px', left:'20px', zIndex:4, background:'#fff', padding:'12px 16px', borderRadius:'16px', boxShadow:'0 10px 30px rgba(0,0,0,0.12)', display:'flex', alignItems:'center', gap:'10px', border:'1px solid rgba(255,107,53,0.1)' }}>
              <span style={{fontSize:'22px'}}>🎉</span>
              <div><div style={{fontSize:'12px',fontWeight:'700',color:'#1e293b'}}>Item Rented!</div><div style={{fontSize:'11px',color:'#94a3b8'}}>TI-84 Calculator</div></div>
            </div>
            <div className="fc2" style={{ position:'absolute', bottom:'80px', right:'-10px', zIndex:4, background:'#fff', padding:'12px 16px', borderRadius:'16px', boxShadow:'0 10px 30px rgba(0,0,0,0.12)', display:'flex', alignItems:'center', gap:'10px', border:'1px solid rgba(255,107,53,0.1)' }}>
              <span style={{fontSize:'22px'}}>💰</span>
              <div><div style={{fontSize:'12px',fontWeight:'700',color:'#1e293b'}}>Earned ₹500</div><div style={{fontSize:'11px',color:'#94a3b8'}}>This week</div></div>
            </div>
            <div className="fc3" style={{ position:'absolute', top:'160px', right:'10px', zIndex:4, background:`linear-gradient(135deg,${ORANGE},${ORANGE2})`, padding:'10px 14px', borderRadius:'12px', boxShadow:`0 8px 20px rgba(255,107,53,0.3)`, display:'flex', alignItems:'center', gap:'8px' }}>
              <span style={{fontSize:'16px'}}>⭐</span>
              <span style={{fontSize:'12px',fontWeight:'700',color:'#fff'}}>4.9 Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={{ padding:'24px 8%', background:'#fff8f5', borderTop:'1px solid #ffe8df', borderBottom:'1px solid #ffe8df', display:'flex', alignItems:'center', gap:'20px', flexWrap:'wrap' }}>
        <span style={{ fontSize:'13px', color:'#94a3b8', fontWeight:'600', whiteSpace:'nowrap' }}>Trusted by students from</span>
        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
          {["IIT Delhi","DU","BITS Pilani","VIT","Amity","Manipal","NIT","KIIT"].map(u => (
            <span key={u} style={{ fontSize:'13px', color:'#64748b', fontWeight:'600', padding:'5px 14px', background:'#fff', borderRadius:'8px', border:'1px solid #ffe0d0' }}>{u}</span>
          ))}
        </div>
      </div>

      {/* WHAT YOU CAN RENT */}
      <section style={{ padding:'100px 8%', textAlign:'center', background:'#fff' }}>
        <div style={{ display:'inline-block', background:'rgba(255,107,53,0.1)', color:ORANGE, padding:'6px 18px', borderRadius:'30px', fontSize:'12px', fontWeight:'700', marginBottom:'16px', textTransform:'uppercase', letterSpacing:'1px' }}>Explore the Marketplace</div>
        <h2 style={{ fontSize:'38px', fontWeight:'800', margin:'0 0 14px', color:DARK, letterSpacing:'-0.5px' }}>What You Can Rent</h2>
        <p style={{ fontSize:'17px', color:'#64748b', maxWidth:'580px', margin:'0 auto 56px', lineHeight:'1.6' }}>Hundreds of items across categories — all listed by verified students on your campus</p>

        <div className="rent-marquee" style={{ marginBottom: "60px" }}>
          <div className="rent-track">
            {[...rentItems, ...rentItems].map((item, i) => (
              <div
                key={i}
                className="chip"
                style={{
                  minWidth: "210px",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "28px 20px",
                  border: "1.5px solid #ffe8df",
                  borderRadius: "20px",
                  background: "#fff"
                }}
              >
                <span style={{ fontSize: "32px" }}>{item.emoji}</span>
                <span style={{ fontSize: "14px", fontWeight: "600", color: DARK, textAlign: "center" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Preview cards */}
        <div style={{ display:'flex', gap:'16px', flexWrap:'wrap', justifyContent:'center', marginBottom:'40px' }}>
          {[
            { img:"2.jpg", name:"TI-84 Calculator", price:"₹40/day" },
            { img:"https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200", name:"CLRS Textbook", price:"Free" },
            { img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200", name:"DSLR Camera", price:"₹500/day" },
            { img:"https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=200", name:"Lab Coat", price:"₹50/day" },
            { img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200", name:"Badminton Racket", price:"₹20/day" },
          ].map((item, i) => (
            <div key={i} className="pcard" style={{ width:'160px', background:'#fff', borderRadius:'16px', border:'1.5px solid #f1f5f9', overflow:'hidden', boxShadow:'0 4px 15px rgba(0,0,0,0.05)' }} onClick={() => navigate('/market')}>
              <img src={item.img} alt={item.name} style={{ width:'100%', height:'120px', objectFit:'cover' }} onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/200"; }} />
              <div style={{ padding:'10px 12px 4px', fontSize:'13px', fontWeight:'600', color:DARK }}>{item.name}</div>
              <div style={{ padding:'0 12px 12px', fontSize:'13px', color:ORANGE, fontWeight:'700' }}>{item.price}</div>
            </div>
          ))}
        </div>
        <button className="pri-btn" style={{ padding:'16px 40px', background:`linear-gradient(135deg,${ORANGE},${ORANGE2})`, color:'#fff', border:'none', borderRadius:'12px', fontWeight:'700', fontSize:'16px', boxShadow:`0 8px 24px rgba(255,107,53,0.25)` }} onClick={() => navigate('/market')}>View All Items →</button>
      </section>

      {/* HOW IT WORKS (REDESIGNED PREMIUM VERTICAL TIMELINE) */}
      <section style={{ padding:'120px 8% 140px', textAlign:'center', background:'#FAFBFD', position:'relative', overflow:'hidden' }}>
        <div style={{ display:'inline-block', background:'rgba(255,107,53,0.1)', color:ORANGE, padding:'6px 18px', borderRadius:'30px', fontSize:'12px', fontWeight:'700', marginBottom:'16px', textTransform:'uppercase', letterSpacing:'1px' }}>Simple Process</div>
        <h2 style={{ fontSize:'38px', fontWeight:'800', margin:'0 0 14px', color:DARK, letterSpacing:'-0.5px' }}>How It Works</h2>
        <p style={{ fontSize:'17px', color:'#64748b', maxWidth:'580px', margin:'0 auto 80px', lineHeight:'1.6' }}>Get started in 3 easy steps</p>
        
        {/* Timeline Container */}
        <div ref={timelineRef} className="tl-container" style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto', padding: '20px 0' }}>
          
          {/* Central Vertical Line Background */}
          <div className="tl-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '4px', backgroundColor: '#E2E8F0', transform: 'translateX(-50%)', borderRadius: '4px', overflow: 'hidden' }}>
            {/* Animated Scroll Filler Line */}
            <div style={{ width: '100%', height: `${scrollProgress * 100}%`, background: `linear-gradient(to bottom, ${ORANGE}, ${ORANGE2})`, transition: 'height 0.1s cubic-bezier(0.1, 0.8, 0.2, 1)' }}></div>
          </div>

          {/* STEP 1 */}
          <div ref={step1Ref} className="tl-row" style={{ display: 'flex', alignItems: 'center', position: 'relative', marginBottom: '90px', opacity: step1Visible ? 1 : 0, transform: step1Visible ? 'translateY(0)' : 'translateY(60px)', transition: 'all 700ms ease-out' }}>
            {/* Left Content Card */}
            <div className="tl-col-left" style={{ width: '50%', paddingRight: '60px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
              <div className="tl-card" style={{ background: '#fff', padding: '36px', borderRadius: '24px', border: '1px solid #EAEFF5', boxShadow: '0 10px 30px rgba(16, 24, 40, 0.04)', maxWidth: '440px', transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)', cursor: 'pointer', textAlign: 'left' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.08)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 24, 40, 0.04)'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255,107,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>👤</div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: ORANGE, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Step 01</div>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: DARK, margin: '0 0 10px' }}>Create Account</h3>
                <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>Sign up with your college email and get verified instantly.</p>
              </div>
            </div>
            {/* Central Timeline Hub Node */}
            <div className="tl-node" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', border: `4px solid ${scrollProgress >= 0.15 ? ORANGE : '#CBD5E1'}`, transition: 'border-color 0.3s ease', zIndex: 5 }}></div>
            {/* Right Spacer Column */}
            <div className="tl-spacer" style={{ width: '50%' }}></div>
          </div>

          {/* STEP 2 */}
          <div ref={step2Ref} className="tl-row" style={{ display: 'flex', alignItems: 'center', position: 'relative', marginBottom: '90px', opacity: step2Visible ? 1 : 0, transform: step2Visible ? 'translateY(0)' : 'translateY(60px)', transition: 'all 700ms ease-out' }}>
            {/* Left Spacer Column */}
            <div className="tl-spacer" style={{ width: '50%' }}></div>
            {/* Central Timeline Hub Node */}
            <div className="tl-node" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', border: `4px solid ${scrollProgress >= 0.5 ? ORANGE : '#CBD5E1'}`, transition: 'border-color 0.3s ease', zIndex: 5 }}></div>
            {/* Right Content Card */}
            <div className="tl-col-right" style={{ width: '50%', paddingLeft: '60px', textAlign: 'left', display: 'flex', justifyContent: 'flex-start' }}>
              <div className="tl-card" style={{ background: '#fff', padding: '36px', borderRadius: '24px', border: '1px solid #EAEFF5', boxShadow: '0 10px 30px rgba(16, 24, 40, 0.04)', maxWidth: '440px', transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)', cursor: 'pointer', textAlign: 'left' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.08)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 24, 40, 0.04)'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255,107,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>🔍</div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: ORANGE, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Step 02</div>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: DARK, margin: '0 0 10px' }}>Browse or List</h3>
                <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>Search for items you need or list what you want to lend.</p>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div ref={step3Ref} className="tl-row" style={{ display: 'flex', alignItems: 'center', position: 'relative', marginBottom: '20px', opacity: step3Visible ? 1 : 0, transform: step3Visible ? 'translateY(0)' : 'translateY(60px)', transition: 'all 700ms ease-out' }}>
            {/* Left Content Card */}
            <div className="tl-col-left" style={{ width: '50%', paddingRight: '60px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
              <div className="tl-card" style={{ background: '#fff', padding: '36px', borderRadius: '24px', border: '1px solid #EAEFF5', boxShadow: '0 10px 30px rgba(16, 24, 40, 0.04)', maxWidth: '440px', transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)', cursor: 'pointer', textAlign: 'left' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.08)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 24, 40, 0.04)'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255,107,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>🤝</div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: ORANGE, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Step 03</div>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: DARK, margin: '0 0 10px' }}>Rent & Earn</h3>
                <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>Connect with students nearby and complete the exchange.</p>
              </div>
            </div>
            {/* Central Timeline Hub Node */}
            <div className="tl-node" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', border: `4px solid ${scrollProgress >= 0.85 ? ORANGE : '#CBD5E1'}`, transition: 'border-color 0.3s ease', zIndex: 5 }}></div>
            {/* Right Spacer Column */}
            <div className="tl-spacer" style={{ width: '50%' }}></div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:'100px 8%', textAlign:'center', background:'#fff8f5' }}>
        <div style={{ display:'inline-block', background:'rgba(255,107,53,0.1)', color:ORANGE, padding:'6px 18px', borderRadius:'30px', fontSize:'12px', fontWeight:'700', marginBottom:'16px', textTransform:'uppercase', letterSpacing:'1px' }}>Why CampusRent</div>
        <h2 style={{ fontSize:'38px', fontWeight:'800', margin:'0 0 14px', color:DARK, letterSpacing:'-0.5px' }}>Built for Campus Life</h2>
        <p style={{ fontSize:'17px', color:'#64748b', maxWidth:'580px', margin:'0 auto 56px', lineHeight:'1.6' }}>Everything you need to rent and lend within your campus community</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'24px' }}>
          {features.map((f, i) => (
            <div key={i} className="fcard" style={{ background:'#fff', borderRadius:'20px', padding:'36px 28px', textAlign:'left', border:'1.5px solid #ffe8df', boxShadow:'0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize:'32px', width:'60px', height:'60px', background:'rgba(255,107,53,0.08)', borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'20px' }}>{f.icon}</div>
              <h3 style={{ fontSize:'18px', fontWeight:'700', color:DARK, margin:'0 0 10px' }}>{f.title}</h3>
              <p style={{ fontSize:'15px', color:'#64748b', lineHeight:'1.6', margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding:'100px 8%', textAlign:'center', background:'#fff' }}>
        <div style={{ display:'inline-block', background:'rgba(255,107,53,0.1)', color:ORANGE, padding:'6px 18px', borderRadius:'30px', fontSize:'12px', fontWeight:'700', marginBottom:'16px', textTransform:'uppercase', letterSpacing:'1px' }}>Student Stories</div>
        <h2 style={{ fontSize:'38px', fontWeight:'800', margin:'0 0 14px', color:DARK, letterSpacing:'-0.5px' }}>What Students Say</h2>
        <p style={{ fontSize:'17px', color:'#64748b', maxWidth:'580px', margin:'0 auto 56px', lineHeight:'1.6' }}>Join thousands of happy students across India</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'24px' }}>
          {testimonials.map((t, i) => (
            <div key={i} className="tcard" style={{ background:'#fff', borderRadius:'20px', padding:'32px', border:'1.5px solid #ffe8df', textAlign:'left', boxShadow:'0 4px 20px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize:'52px', color:ORANGE, fontFamily:'Georgia,serif', lineHeight:'1', marginBottom:'12px' }}>"</div>
              <p style={{ fontSize:'15px', color:'#475569', lineHeight:'1.7', margin:'0 0 24px' }}>{t.text}</p>
              <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'rgba(255,107,53,0.1)', color:ORANGE, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700', fontSize:'13px', flexShrink:0 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight:'700', color:DARK, fontSize:'14px' }}>{t.name}</div>
                  <div style={{ fontSize:'12px', color:'#94a3b8' }}>{t.dept}</div>
                </div>
                <div style={{ marginLeft:'auto', fontSize:'13px' }}>⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'100px 8%', textAlign:'center', background:`linear-gradient(135deg,${DARK} 0%,#0f0f1a 100%)`, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,53,0.15) 0%,transparent 70%)', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' }}></div>
        <h2 style={{ fontSize:'48px', fontWeight:'800', color:'#fff', margin:'0 0 16px', position:'relative', zIndex:1 }}>Ready to Start Renting?</h2>
        <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.6)', margin:'0 0 48px', position:'relative', zIndex:1 }}>Join 2,000+ students already saving with CampusRent</p>
        <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap', position:'relative', zIndex:1 }}>
          <button className="cta-p" style={{ padding:'18px 44px', background:`linear-gradient(135deg,${ORANGE},${ORANGE2})`, color:'#fff', border:'none', borderRadius:'14px', fontWeight:'700', fontSize:'17px', boxShadow:`0 8px 24px rgba(255,107,53,0.35)` }} onClick={() => navigate("/register")}>Get Started Free →</button>
          <button className="cta-o" style={{ padding:'18px 44px', background:'transparent', border:'2px solid rgba(255,255,255,0.25)', color:'#fff', borderRadius:'14px', fontWeight:'700', fontSize:'17px' }} onClick={() => navigate("/market")}>Explore Market</button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;