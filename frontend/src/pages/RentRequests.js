import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, Clock, Calendar, 
  MapPin, User, Timer, Info 
} from 'lucide-react';

const RentRequests = () => {
  // 🔹 Section 1 Data: Items you requested from others
  const [myRequests, setMyRequests] = useState([
    {
      id: 101,
      name: "DSLR Camera",
      owner: "Eishit Agarwal",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3m_FO_e51hyL-NR726pbUqI1zInZhzVOGNA&s",
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
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa-yfl7oFZQOArHkkPvcgaxzkUoLznuEpgcg&s",
      startDate: "Apr 15",
      endDate: "Apr 18",
      shareTime: "02:30 PM",
      location: "Dorm A",
      status: "Approved"
    }
  ]);

  // 🔹 Section 2 Data: Requests others made on your items (Redesigned for List UI)
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
      requester: "Lisa ",
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

  const handleAction = (id, newStatus) => {
    setIncomingRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
    setNotification(`Request ${newStatus} successfully!`);
    setTimeout(() => setNotification(""), 3000);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved': return { bg: '#e8f5e9', text: '#2e7d32', icon: <CheckCircle size={14}/> };
      case 'Rejected': return { bg: '#ffebee', text: '#c62828', icon: <XCircle size={14}/> };
      default: return { bg: '#fffde7', text: '#f9a825', icon: <Clock size={14}/> };
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {notification && (
        <div style={styles.toast}>
          <CheckCircle size={18} /> {notification}
        </div>
      )}

      <div style={styles.titleBlock}>
        <h1 style={styles.mainTitle}>Rental Requests</h1>
        <p style={styles.mainSubtitle}>Track your borrows and manage who wants to rent your items.</p>
      </div>

      {/* 2️⃣ Section: Items I Rented (Grid UI) */}
      <div style={styles.sectionWrapper}>
        <div style={styles.sectionHeader}>Items I Rented</div>
        <div style={styles.sectionContent}>
          <div style={styles.grid}>
            {myRequests.map(item => {
              const badge = getStatusStyle(item.status);
              return (
                <div key={item.id} style={styles.card}>
                  <img src={item.image} alt="" style={styles.cardImg} />
                  <div style={styles.cardInfo}>
                    <div style={styles.cardTopRow}>
                      <h3 style={styles.itemName}>{item.name}</h3>
                      <span style={{...styles.statusBadge, backgroundColor: badge.bg, color: badge.text}}>
                        {badge.icon} {item.status}
                      </span>
                    </div>
                    <div style={styles.detailLine}><User size={14}/> Owner: <strong>{item.owner}</strong></div>
                    <div style={styles.detailLine}><Calendar size={14}/> {item.startDate} - {item.endDate}</div>
                    <div style={styles.detailLine}><Timer size={14}/> Share Time: <strong>{item.shareTime}</strong></div>
                    <div style={styles.detailLine}><MapPin size={14}/> {item.location}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3️⃣ Section: Requests on My Items (List UI - Matching Screenshot) */}
      <div style={styles.sectionWrapper}>
        <div style={styles.sectionHeader}>Requests on My Items</div>
        <div style={styles.sectionContent}>
          <div style={styles.listContainer}>
            {incomingRequests.map(req => (
              <div key={req.id} style={styles.listItem}>
                <div style={styles.listLeft}>
                  <img src={req.image} alt="" style={styles.listImg} />
                  <div style={styles.listDetails}>
                    <h3 style={styles.listName}>{req.name}</h3>
                    <div style={styles.listInfoLine}>Requester: <span style={{color:'#333'}}>{req.requester}</span></div>
                    <div style={styles.listInfoLine}>Purpose: <span style={{color:'#333'}}>{req.purpose}</span></div>
                    <div style={styles.listInfoLine}>Dates: <span style={{color:'#333'}}>{req.dates}</span> @ {req.shareTime}</div>
                  </div>
                </div>

                <div style={styles.listRight}>
                  {req.status === 'Pending' ? (
                    <div style={styles.listBtnGroup}>
                      <button style={styles.listApproveBtn} onClick={() => handleAction(req.id, 'Approved')}>Approve</button>
                      <button style={styles.listRejectBtn} onClick={() => handleAction(req.id, 'Rejected')}>Reject</button>
                    </div>
                  ) : (
                    <div style={{
                        ...styles.statusBadge, 
                        backgroundColor: getStatusStyle(req.status).bg, 
                        color: getStatusStyle(req.status).text,
                        padding: '8px 16px',
                        fontSize: '13px'
                    }}>
                      {getStatusStyle(req.status).icon} {req.status}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  pageWrapper: { padding: '40px 8%', backgroundColor: '#f9f9f9', minHeight: '100vh', fontFamily: 'Arial, sans-serif' },
  
  titleBlock: { backgroundColor: '#707070', padding: '25px 30px', borderRadius: '4px', marginBottom: '40px' },
  mainTitle: { color: '#fff', fontSize: '28px', margin: '0 0 5px 0', fontWeight: 'bold' },
  mainSubtitle: { color: '#e0e0e0', fontSize: '14px', margin: 0 },

  sectionWrapper: { backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ddd', overflow: 'hidden', marginBottom: '40px' },
  sectionHeader: { backgroundColor: '#e8e8e8', padding: '15px 25px', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #ccc' },
  sectionContent: { padding: '25px' },

  // Items I Rented Styles (Grid)
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  card: { border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff' },
  cardImg: { width: '100%', height: '140px', objectFit: 'cover' },
  cardInfo: { padding: '15px' },
  cardTopRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' },
  itemName: { fontSize: '16px', fontWeight: 'bold', margin: 0 },
  statusBadge: { padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' },
  detailLine: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#666', marginBottom: '5px' },

  // Requests on My Items Styles (List View matching screenshot)
  listContainer: { display: 'flex', flexDirection: 'column', gap: '15px' },
  listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fff' },
  listLeft: { display: 'flex', gap: '20px', alignItems: 'center' },
  listImg: { width: '80px', height: '80px', borderRadius: '6px', objectFit: 'cover' },
  listDetails: { display: 'flex', flexDirection: 'column', gap: '4px' },
  listName: { fontSize: '18px', fontWeight: 'bold', margin: '0 0 5px 0', color: '#333' },
  listInfoLine: { fontSize: '13px', color: '#777' },
  
  listRight: { minWidth: '180px', display: 'flex', justifyContent: 'flex-end' },
  listBtnGroup: { display: 'flex', gap: '10px' },
  listApproveBtn: { backgroundColor: '#2ecc71', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
  listRejectBtn: { backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },

  toast: { position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#10b981', color: '#fff', padding: '15px 25px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 1000 }
};

export default RentRequests;