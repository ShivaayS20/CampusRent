import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  ListOrdered, 
  GitPullRequest, 
  PlusSquare, 
  LogOut, 
  ChevronRight, 
  Package, 
  Bell,
  Search,
  User,
  Calendar as CalendarIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Chart } from "react-google-charts"; // ✅ Added Google Charts

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');

  // ✅ USER STATE
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("campusRentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setAvatar(parsedUser.avatar || null);
    }
  }, []);

  // ✅ GOOGLE CHARTS DATA
  const chartData = [
    ["Category", "Items"],
    ["Tech & Gadgets", 2],
    ["Lab Equipment", 1],
    ["Clothing", 1],
  ];

  const chartOptions = {
    title: "My Listing Distribution",
    pieHole: 0.4,
    is3D: false,
    colors: ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"],
    legend: { position: "bottom" },
    chartArea: { width: '100%', height: '80%' }
  };

  // ✅ GOOGLE CALENDAR HELPER
  const openGoogleCalendar = () => {
    const base = "https://www.google.com/calendar/render?action=TEMPLATE";
    const text = "&text=CampusRent Handover";
    const details = "&details=Reminder to handover the rented item.";
    window.open(`${base}${text}${details}`, "_blank");
  };

  // Stats data
  const stats = [
    { title: 'Listings', count: '4 Listed', icon: <Package size={20} />, color: '#dbeafe', textColor: '#1e40af', path: '/my-listings' },
    { title: 'Rent Requests', count: '3 New Requests', icon: <GitPullRequest size={20} />, color: '#dcfce7', textColor: '#166534', path: '/rent-request' },
    { title: 'Items Rented', count: '5 Currently Rented', icon: <ListOrdered size={20} />, color: '#fce7f3', textColor: '#9d174d', path: '/rent-request' },
  ];

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/profile' },
    { name: 'My Listings', icon: <ListOrdered size={20} />, path: '/my-listings' },
    { name: 'Rent Requests', icon: <GitPullRequest size={20} />, path: '/rent-request', badge: 2 },
    { name: 'Add New Item', icon: <PlusSquare size={20} />, path: '/add-item' },
  ];

  const handleNavigation = (path, name) => {
    setActiveTab(name);
    navigate(path);
  };

  if (!user) return null;

  return (
    <div style={styles.container}>
      {/* ✅ ADDED HOVER LOGIC VIA CSS */}
      <style>{`
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
          cursor: pointer;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .sidebar-btn:hover {
          background-color: #f8fafc !important;
          color: #4f46e5 !important;
        }
      `}</style>

      {/* --- SIDEBAR --- */}
      <aside style={styles.sidebar}>
        <div style={styles.profileSection}>
          <div style={styles.avatarWrapper}>
            <label style={{ cursor: 'pointer' }}>
              <img
                src={avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName}`}
                alt="User"
                style={styles.avatar}
                onError={(e) => {
                  e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName}`;
                }}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    const updatedUser = { ...user, avatar: reader.result };
                    setAvatar(reader.result);
                    setUser(updatedUser);
                    localStorage.setItem("campusRentUser", JSON.stringify(updatedUser));
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </label>
          </div>
          <h3 style={styles.userName}>{user.firstName} {user.lastName}</h3>
          <p style={styles.userEmail}>{user.email}</p>
        </div>

        <nav style={styles.navMenu}>
          {menuItems.map((item) => (
            <button
              key={item.name}
              className="sidebar-btn"
              style={{
                ...styles.navButton,
                backgroundColor: activeTab === item.name ? '#f1f5f9' : 'transparent',
                color: activeTab === item.name ? '#4f46e5' : '#64748b'
              }}
              onClick={() => handleNavigation(item.path, item.name)}
            >
              <div style={styles.navItemContent}>
                {item.icon}
                <span>{item.name}</span>
              </div>
              {item.badge && <span style={styles.badge}>{item.badge}</span>}
            </button>
          ))}
        </nav>

        <button
          style={styles.logoutBtn}
          onClick={() => {
            localStorage.removeItem("campusRentUser");
            navigate("/login");
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main style={styles.mainContent}>
        {/* Top Navbar */}
        <header style={styles.topNav}>
          <div style={styles.breadcrumb}>
            <div style={styles.breadcrumbIcon}><LayoutDashboard size={18} color="#4f46e5" /></div>
            <span style={styles.breadcrumbText}>Dashboard</span>
          </div>
          <div style={styles.topNavActions}>
            <button style={styles.iconBtn}><Search size={20} /></button>
            <button style={styles.iconBtn}><Bell size={20} /></button>
            <div style={styles.miniProfile} className="hover-card">
              <img 
                src={avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName}`} 
                style={styles.miniAvatar} 
                alt="" 
                onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName}`; }}
              />
              <span style={styles.miniName}>{user.firstName}</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </header>

        {/* WELCOME SECTION */}
        <section style={styles.welcomeSection}>
          <div style={styles.welcomeContent}>
            <h1 style={styles.welcomeTitle}>Hi, {user.firstName} {user.lastName}</h1>
            <p style={styles.welcomeSubtitle}>Welcome to your profile dashboard.</p>
            <p style={styles.welcomeSubtitle}>Manage your rentals and requests.</p>
          </div>
          <div style={styles.illustrationWrapper}>
            <img 
              src="https://cdn-icons-png.flaticon.com/256/4980/4980606.png" 
              alt="illustration" 
              style={styles.illustrationImg} 
            />
          </div>
        </section>

        {/* ✅ STATS GRID WITH HOVER */}
        <section style={styles.statsGrid}>
          {stats.map((stat) => (
            <div 
              key={stat.title} 
              className="hover-card"
              style={{ ...styles.statCard, backgroundColor: stat.color }} 
              onClick={() => navigate(stat.path)}
            >
              <div style={{ ...styles.statIconBox, color: stat.textColor }}>{stat.icon}</div>
              <div>
                <div style={styles.statTitle}>{stat.title}</div>
                <div style={{ ...styles.statCount, color: stat.textColor }}>{stat.count}</div>
              </div>
            </div>
          ))}
        </section>

        {/* ✅ GOOGLE CHARTS SECTION WITH HOVER */}
        <section style={styles.chartSection} className="hover-card">
            <h3 style={styles.chartTitle}>Listing Analytics</h3>
            <Chart
                chartType="PieChart"
                width="100%"
                height="300px"
                data={chartData}
                options={chartOptions}
            />
        </section>

        {/* ✅ QUICK ACTIONS LIST WITH HOVER */}
        <section style={styles.quickLinks}>
          <div className="hover-card" style={styles.linkRow} onClick={() => handleNavigation('/my-listings', 'My Listings')}>
            <div style={styles.linkMain}>
              <div style={styles.linkIconBox}><Package size={22} color="#4f46e5" /></div>
              <div>
                <div style={styles.linkTitle}>My Listings</div>
                <div style={styles.linkSubtitle}>View and manage the items you have listed for rent.</div>
              </div>
            </div>
            <ChevronRight size={20} color="#cbd5e1" />
          </div>

          <div className="hover-card" style={styles.linkRow} onClick={openGoogleCalendar}>
            <div style={styles.linkMain}>
              <div style={{...styles.linkIconBox, backgroundColor: '#fff7ed'}}><CalendarIcon size={22} color="#ea580c" /></div>
              <div>
                <div style={styles.linkTitle}>Schedule Reminder</div>
                <div style={styles.linkSubtitle}>Set a Google Calendar reminder for your next handover.</div>
              </div>
            </div>
            <ChevronRight size={20} color="#cbd5e1" />
          </div>

          <div className="hover-card" style={styles.linkRow} onClick={() => handleNavigation('/add-item', 'Add New Item')}>
            <div style={styles.linkMain}>
              <div style={styles.linkIconBox}><PlusSquare size={22} color="#f59e0b" /></div>
              <div>
                <div style={styles.linkTitle}>Add New Item</div>
                <div style={styles.linkSubtitle}>List a new item for rent to start earning from your gear.</div>
              </div>
            </div>
            <ChevronRight size={20} color="#cbd5e1" />
          </div>

          <div className="hover-card" style={styles.linkRow} onClick={() => handleNavigation('/rent-request', 'Rent Requests')}>
            <div style={styles.linkMain}>
              <div style={{...styles.linkIconBox, position: 'relative'}}>
                <GitPullRequest size={22} color="#10b981" />
                <span style={styles.miniBadge}>2</span>
              </div>
              <div>
                <div style={styles.linkTitle}>Rent Requests</div>
                <div style={styles.linkSubtitle}>Review and respond to rental requests from other users.</div>
              </div>
            </div>
            <ChevronRight size={20} color="#cbd5e1" />
          </div>
        </section>
      </main>
    </div>
  );
};

/* --- STYLES --- */
const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, sans-serif' },
  sidebar: { width: '280px', backgroundColor: '#fff', padding: '40px 20px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' },
  profileSection: { textAlign: 'center', marginBottom: '40px' },
  avatarWrapper: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f1f5f9', margin: '0 auto 15px', overflow: 'hidden' },
  avatar: { width: '100%', height: '100%', objectFit: 'cover' },
  userName: { fontSize: '18px', fontWeight: 'bold', color: '#1e293b', margin: 0 },
  userEmail: { fontSize: '14px', color: '#94a3b8', marginTop: '4px' },
  navMenu: { flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' },
  navButton: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', borderRadius: '12px', border: 'none', cursor: 'pointer', transition: '0.2s' },
  navItemContent: { display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '500' },
  badge: { backgroundColor: '#4f46e5', color: '#fff', fontSize: '12px', padding: '2px 8px', borderRadius: '10px' },
  logoutBtn: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b', marginTop: 'auto' },

  mainContent: { flex: 1, padding: '30px 50px', overflowY: 'auto' },
  topNav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  breadcrumb: { display: 'flex', alignItems: 'center', gap: '12px' },
  breadcrumbIcon: { backgroundColor: '#fff', padding: '8px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  breadcrumbText: { fontWeight: '700', fontSize: '16px', color: '#1e293b' },
  topNavActions: { display: 'flex', alignItems: 'center', gap: '20px' },
  iconBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' },
  miniProfile: { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fff', padding: '5px 15px', borderRadius: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  miniAvatar: { width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' },
  miniName: { fontSize: '14px', fontWeight: '500' },

  welcomeSection: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '30px 50px', borderRadius: '25px', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' },
  welcomeContent: { zIndex: 2 },
  welcomeTitle: { fontSize: '32px', fontWeight: '800', color: '#1e293b', marginBottom: '10px' },
  welcomeSubtitle: { color: '#64748b', fontSize: '16px', margin: 0, lineHeight: '1.6' },
  illustrationWrapper: { width: '220px', height: '160px', zIndex: 1 },
  illustrationImg: { width: '100%', height: '100%', objectFit: 'contain' },

  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' },
  statCard: { padding: '20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', transition: '0.3s transform' },
  statIconBox: { width: '45px', height: '45px', backgroundColor: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  statTitle: { fontSize: '15px', fontWeight: '600', color: '#1e293b' },
  statCount: { fontSize: '14px', fontWeight: '700' },

  chartSection: { backgroundColor: '#fff', padding: '20px', borderRadius: '25px', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' },
  chartTitle: { marginBottom: '20px', fontSize: '18px', fontWeight: '700', paddingLeft: '10px' },

  quickLinks: { display: 'flex', flexDirection: 'column', gap: '15px' },
  linkRow: { backgroundColor: '#fff', padding: '20px 25px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: '0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  linkMain: { display: 'flex', alignItems: 'center', gap: '25px' },
  linkIconBox: { width: '55px', height: '55px', backgroundColor: '#f8fafc', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  linkTitle: { fontWeight: '800', color: '#1e293b', fontSize: '16px' },
  linkSubtitle: { fontSize: '14px', color: '#94a3b8', marginTop: '4px' },
  miniBadge: { position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#10b981', color: '#fff', fontSize: '10px', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }
};

export default Profile;