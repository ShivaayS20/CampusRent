import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, Clock, Calendar, 
  MapPin, User, Timer
} from 'lucide-react';

const ORANGE = '#ff6b35';
const DARK = '#0F172A';

const RentRequests = () => {
  const [myRequests] = useState([
    {
      id: 101,
      name: "DSLR Camera",
      owner: "Eishit Agarwal",
      image: "camera.jpg",
      startDate: "May 5",
      endDate: "May 10",
      shareTime: "10:00 AM",
      location: "Library Entrance",
      status: "Pending"
    },
    {
      id: 102,
      name: "Camping Tent",
      owner: "Arun",
      image: "Outdoor Camping Tent Clipart.jpg",
      startDate: "Apr 15",
      endDate: "Apr 18",
      shareTime: "02:30 PM",
      location: "Dorm A",
      status: "Approved"
    }
  ]);

  const [incomingRequests, setIncomingRequests] = useState([
    {
      id: 201,
      name: "Acoustic Guitar",
      requester: "Arti Mishra",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxZQGDNGDAyc_Z3sQPXe0GyD0xHdhwiPLrdw&s",
      dates: "May 8 - May 12",
      shareTime: "11:00 AM",
      purpose: "Music Practice",
      status: "Pending"
    },
    {
      id: 202,
      name: "Lab Equipment Kit",
      requester: "Lisa",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJQZONvEtp56oZpCDqmfFMrB6amOLQkt-gQ&s",
      dates: "Apr 25 - Apr 27",
      shareTime: "04:00 PM",
      purpose: "Chemistry Project",
      status: "Pending"
    },
    {
      id: 203,
      name: "Hiking Backpack",
      requester: "Dhruv Rathi",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC9hwzL-BoyqRsK8oXAQ0LWPV52kgLaASkaw&s",
      dates: "Jun 5 - Jun 7",
      shareTime: "08:00 AM",
      purpose: "Weekend Hiking",
      status: "Approved"
    }
  ]);

  const [notification, setNotification] = useState("");
  const [hoveredApprove, setHoveredApprove] = useState(null);
  const [hoveredReject, setHoveredReject] = useState(null);

  const handleAction = (id, newStatus) => {
    setIncomingRequests(prev => prev.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    ));
    setNotification(`Request ${newStatus} successfully!`);
    setTimeout(() => setNotification(""), 3000);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved': return { bg: '#ecfdf5', text: '#065f46', border: '#6ee7b7', icon: <CheckCircle size={14} /> };
      case 'Rejected': return { bg: '#fef2f2', text: '#991b1b', border: '#fca5a5', icon: <XCircle size={14} /> };
      default: return { bg: '#fffbeb', text: '#92400e', border: '#fcd34d', icon: <Clock size={14} /> };
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Plus Jakarta Sans', system-ui, sans-serif !important; box-sizing: border-box; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes toastIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .req-card { transition: all 0.35s cubic-bezier(0.16,1,0.3,1) !important; }
        .req-card:hover { transform: translateY(-6px) !important; box-shadow: 0 20px 40px rgba(15,23,42,0.10) !important; }
        .list-item-row { transition: all 0.3s ease !important; }
        .list-item-row:hover { box-shadow: 0 8px 24px rgba(15,23,42,0.08) !important; border-color: rgba(255,107,53,0.2) !important; }
        .anim-fade-up { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }
        .toast-anim { animation: toastIn 0.4s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      {/* TOAST */}
      {notification && (
        <div style={styles.toast} className="toast-anim">
          <CheckCircle size={18} /> {notification}
        </div>
      )}

      {/* HEADER BLOCK */}
      <div style={styles.titleBlock} className="anim-fade-up">
        <div style={styles.titleInner}>
          <div>
            <div style={styles.titleBadge}>📋 Dashboard</div>
            <h1 style={styles.mainTitle}>Rental Requests</h1>
            <p style={styles.mainSubtitle}>Track your borrows and manage who wants to rent your items.</p>
          </div>
          <div style={styles.titleStats}>
            <div style={styles.statPill}>
              <span style={styles.statNum}>{myRequests.length}</span>
              <span style={styles.statLabel}>My Requests</span>
            </div>
            <div style={styles.statPill}>
              <span style={styles.statNum}>{incomingRequests.filter(r => r.status === 'Pending').length}</span>
              <span style={styles.statLabel}>Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: Items I Rented */}
      <div style={styles.sectionWrapper} className="anim-fade-up">
        <div style={styles.sectionHeader}>
          <div style={styles.sectionHeaderDot} />
          Items I Rented
          <span style={styles.sectionCount}>{myRequests.length}</span>
        </div>
        <div style={styles.sectionContent}>
          <div style={styles.grid}>
            {myRequests.map((item, idx) => {
              const badge = getStatusStyle(item.status);
              return (
                <div
                  key={item.id}
                  className="req-card anim-fade-up"
                  style={{ ...styles.card, animationDelay: `${idx * 0.08}s` }}
                >
                  <div style={styles.cardImgWrapper}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={styles.cardImg}
                      onError={e => { e.target.src = "https://via.placeholder.com/300x140?text=No+Image"; }}
                    />
                    <span style={{
                      ...styles.cardStatusOverlay,
                      backgroundColor: badge.bg,
                      color: badge.text,
                      border: `1px solid ${badge.border}`,
                    }}>
                      {badge.icon} {item.status}
                    </span>
                  </div>
                  <div style={styles.cardInfo}>
                    <div style={styles.cardTopRow}>
                      <h3 style={styles.itemName}>{item.name}</h3>
                    </div>
                    <div style={styles.detailLine}>
                      <span style={styles.detailIcon}><User size={13} /></span>
                      <span style={styles.detailLabel}>Owner</span>
                      <strong style={styles.detailValue}>{item.owner}</strong>
                    </div>
                    <div style={styles.detailLine}>
                      <span style={styles.detailIcon}><Calendar size={13} /></span>
                      <span style={styles.detailLabel}>Dates</span>
                      <strong style={styles.detailValue}>{item.startDate} – {item.endDate}</strong>
                    </div>
                    <div style={styles.detailLine}>
                      <span style={styles.detailIcon}><Timer size={13} /></span>
                      <span style={styles.detailLabel}>Time</span>
                      <strong style={styles.detailValue}>{item.shareTime}</strong>
                    </div>
                    <div style={styles.detailLine}>
                      <span style={styles.detailIcon}><MapPin size={13} /></span>
                      <span style={styles.detailLabel}>Pickup</span>
                      <strong style={styles.detailValue}>{item.location}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION: Requests on My Items */}
      <div style={styles.sectionWrapper} className="anim-fade-up">
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionHeaderDot, backgroundColor: ORANGE }} />
          Requests on My Items
          <span style={styles.sectionCount}>{incomingRequests.length}</span>
        </div>
        <div style={styles.sectionContent}>
          <div style={styles.listContainer}>
            {incomingRequests.map((req, idx) => {
              const badge = getStatusStyle(req.status);
              return (
                <div
                  key={req.id}
                  className="list-item-row anim-fade-up"
                  style={{ ...styles.listItem, animationDelay: `${idx * 0.08}s` }}
                >
                  <div style={styles.listLeft}>
                    <div style={styles.listImgWrapper}>
                      <img
                        src={req.image}
                        alt={req.name}
                        style={styles.listImg}
                        onError={e => { e.target.src = "https://via.placeholder.com/80x80?text=Item"; }}
                      />
                    </div>
                    <div style={styles.listDetails}>
                      <h3 style={styles.listName}>{req.name}</h3>
                      <div style={styles.listMetaRow}>
                        <span style={styles.listMetaChip}>👤 {req.requester}</span>
                        <span style={styles.listMetaChip}>🎯 {req.purpose}</span>
                      </div>
                      <div style={styles.listInfoLine}>
                        <Calendar size={12} style={{ color: '#94a3b8', flexShrink: 0 }} />
                        <span>{req.dates}</span>
                        <span style={styles.dotSep}>·</span>
                        <Timer size={12} style={{ color: '#94a3b8', flexShrink: 0 }} />
                        <span>{req.shareTime}</span>
                      </div>
                    </div>
                  </div>

                  <div style={styles.listRight}>
                    {req.status === 'Pending' ? (
                      <div style={styles.listBtnGroup}>
                        <button
                          style={{
                            ...styles.listApproveBtn,
                            ...(hoveredApprove === req.id ? styles.listApproveBtnHover : {}),
                          }}
                          onMouseEnter={() => setHoveredApprove(req.id)}
                          onMouseLeave={() => setHoveredApprove(null)}
                          onClick={() => handleAction(req.id, 'Approved')}
                        >
                          <CheckCircle size={15} /> Approve
                        </button>
                        <button
                          style={{
                            ...styles.listRejectBtn,
                            ...(hoveredReject === req.id ? styles.listRejectBtnHover : {}),
                          }}
                          onMouseEnter={() => setHoveredReject(req.id)}
                          onMouseLeave={() => setHoveredReject(null)}
                          onClick={() => handleAction(req.id, 'Rejected')}
                        >
                          <XCircle size={15} /> Reject
                        </button>
                      </div>
                    ) : (
                      <div style={{
                        ...styles.statusBadgeLarge,
                        backgroundColor: badge.bg,
                        color: badge.text,
                        border: `1px solid ${badge.border}`,
                      }}>
                        {badge.icon} {req.status}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    padding: '40px 8%',
    backgroundColor: '#F8FAFC',
    minHeight: '100vh',
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  },

  // HEADER
  titleBlock: {
    background: `linear-gradient(135deg, ${DARK} 0%, #1e293b 100%)`,
    padding: '36px 40px',
    borderRadius: '24px',
    marginBottom: '32px',
    position: 'relative',
    overflow: 'hidden',
  },
  titleInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    position: 'relative',
    zIndex: 1,
  },
  titleBadge: {
    display: 'inline-block',
    fontSize: '12px',
    fontWeight: '700',
    color: ORANGE,
    background: 'rgba(255,107,53,0.12)',
    border: '1px solid rgba(255,107,53,0.25)',
    padding: '5px 14px',
    borderRadius: '30px',
    marginBottom: '12px',
    letterSpacing: '0.04em',
  },
  mainTitle: {
    color: '#fff',
    fontSize: '28px',
    margin: '0 0 6px',
    fontWeight: '800',
    letterSpacing: '-0.02em',
  },
  mainSubtitle: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: '14px',
    margin: 0,
    fontWeight: '500',
  },
  titleStats: {
    display: 'flex',
    gap: '14px',
  },
  statPill: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '16px',
    padding: '14px 22px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    backdropFilter: 'blur(8px)',
    minWidth: '90px',
  },
  statNum: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#fff',
  },
  statLabel: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },

  // SECTION WRAPPER
  sectionWrapper: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    border: '1px solid #E2E8F0',
    overflow: 'hidden',
    marginBottom: '28px',
    boxShadow: '0 4px 16px rgba(15,23,42,0.04)',
  },
  sectionHeader: {
    backgroundColor: '#F8FAFC',
    padding: '16px 28px',
    fontSize: '16px',
    fontWeight: '800',
    borderBottom: '1px solid #E2E8F0',
    color: DARK,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    letterSpacing: '-0.01em',
  },
  sectionHeaderDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    flexShrink: 0,
  },
  sectionCount: {
    marginLeft: 'auto',
    fontSize: '12px',
    fontWeight: '700',
    backgroundColor: 'rgba(255,107,53,0.1)',
    color: ORANGE,
    padding: '3px 10px',
    borderRadius: '20px',
    border: '1px solid rgba(255,107,53,0.2)',
  },
  sectionContent: {
    padding: '24px 28px',
  },

  // GRID — Items I Rented
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    border: '1px solid #E2E8F0',
    borderRadius: '18px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
  },
  cardImgWrapper: {
    position: 'relative',
    height: '150px',
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.5s ease',
  },
  cardStatusOverlay: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backdropFilter: 'blur(6px)',
  },
  cardInfo: {
    padding: '18px 20px',
  },
  cardTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '14px',
  },
  itemName: {
    fontSize: '16px',
    fontWeight: '800',
    margin: 0,
    color: DARK,
    letterSpacing: '-0.01em',
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  detailLine: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#64748b',
    marginBottom: '7px',
  },
  detailIcon: {
    color: '#94a3b8',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  detailLabel: {
    color: '#94a3b8',
    fontWeight: '600',
    width: '44px',
    flexShrink: 0,
    fontSize: '12px',
  },
  detailValue: {
    color: DARK,
    fontWeight: '700',
    fontSize: '13px',
  },

  // LIST — Requests on My Items
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 20px',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 6px rgba(15,23,42,0.03)',
  },
  listLeft: {
    display: 'flex',
    gap: '18px',
    alignItems: 'center',
  },
  listImgWrapper: {
    width: '80px',
    height: '80px',
    borderRadius: '14px',
    overflow: 'hidden',
    flexShrink: 0,
    border: '1px solid #E2E8F0',
    backgroundColor: '#F1F5F9',
  },
  listImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  listDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  listName: {
    fontSize: '17px',
    fontWeight: '800',
    margin: '0 0 2px',
    color: DARK,
    letterSpacing: '-0.01em',
  },
  listMetaRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  listMetaChip: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#475569',
    background: '#F1F5F9',
    padding: '3px 10px',
    borderRadius: '20px',
    border: '1px solid #E2E8F0',
  },
  listInfoLine: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '500',
  },
  dotSep: {
    color: '#cbd5e1',
    fontSize: '14px',
  },

  listRight: {
    minWidth: '180px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  listBtnGroup: {
    display: 'flex',
    gap: '10px',
  },
  listApproveBtn: {
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: '#fff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 4px 12px rgba(16,185,129,0.25)',
    transition: 'all 0.25s ease',
  },
  listApproveBtnHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(16,185,129,0.35)',
  },
  listRejectBtn: {
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    color: '#fff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 4px 12px rgba(239,68,68,0.25)',
    transition: 'all 0.25s ease',
  },
  listRejectBtnHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(239,68,68,0.35)',
  },
  statusBadgeLarge: {
    padding: '10px 18px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },

  // TOAST
  toast: {
    position: 'fixed',
    bottom: '28px',
    right: '28px',
    backgroundColor: DARK,
    color: '#fff',
    padding: '16px 24px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 20px 40px rgba(15,23,42,0.2)',
    zIndex: 3000,
    fontSize: '14px',
    fontWeight: '600',
  },
};

export default RentRequests;