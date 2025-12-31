import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Plus, Edit3, Trash2, Power, PowerOff, 
  ChevronRight, Inbox, CheckCircle, AlertCircle, Info, X
} from 'lucide-react';

const MyListings = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  // ✅ INITIALIZE STATE FROM LOCALSTORAGE
  const [listings, setListings] = useState(() => {
    const savedListings = localStorage.getItem('campusRentListings');
    if (savedListings) {
      return JSON.parse(savedListings);
    }
    // Default initial data if storage is empty
    return [
      {
        id: 1,
        name: "Scientific Calculator TI-84",
        category: "Tech & Gadgets",
        type: "Electronics",
        model: "TI-84 Plus CE",
        age: "2 years",
        price: "Free",
        status: "Available",
        image: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?q=80&w=500&auto=format&fit=crop",
        requests: 2,
        location: "Central Library"
      },
      {
        id: 2,
        name: "Professional Lab Coat",
        category: "Lab Equipment",
        type: "Apparel",
        model: "Medium Size",
        age: "1 year",
        price: "Paid (₹50/day)",
        status: "Rented",
        image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=500&auto=format&fit=crop",
        requests: 0,
        location: "Chemistry Lab"
      }
    ];
  });

  // ✅ SYNC LISTINGS TO LOCALSTORAGE WHENEVER THEY CHANGE
  useEffect(() => {
    localStorage.setItem('campusRentListings', JSON.stringify(listings));
  }, [listings]);

  const [notification, setNotification] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [viewingInfo, setViewingInfo] = useState(null);

  // ✅ NEW: IMAGE FALLBACK LOGIC
  // If the "real" image link is broken or restricted, this replaces it with a placeholder
  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1586075010633-2442dc3d8c5f?q=80&w=500&auto=format&fit=crop";
  };

  // --- LOGIC TO CATCH NEW/EDITED DATA ---
  useEffect(() => {
    if (location.state?.newItem) {
      const item = location.state.newItem;
      const formattedNewItem = {
        id: Date.now(),
        name: item.itemName,
        category: item.category,
        type: item.type,
        model: item.model,
        age: item.age,
        price: item.isPaid === "Free" ? "Free" : `Paid (₹${item.price}/day)`,
        status: "Available",
        // ✅ Uses the passed Base64 string or image URL
        image: item.imagePreview || "", 
        requests: 0,
        location: item.location
      };
      setListings(prev => [formattedNewItem, ...prev]);
      setNotification("Item listed successfully!");
      window.history.replaceState({}, document.title);
    }

    if (location.state?.updatedItem) {
      const updated = location.state.updatedItem;
      setListings(prev => prev.map(item => 
        item.id === updated.id ? { 
          ...item, 
          name: updated.itemName,
          category: updated.category,
          type: updated.type,
          model: updated.model,
          age: updated.age,
          price: updated.isPaid === "Free" ? "Free" : `Paid (₹${updated.price}/day)`,
          location: updated.location,
          image: updated.imagePreview || item.image 
        } : item
      ));
      setNotification("Item updated successfully!");
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleEditRedirect = (item) => {
    navigate('/add-item', { state: { editData: item } });
  };

  const toggleStatus = (id) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        const newStatus = item.status === "Available" ? "Unavailable" : "Available";
        setNotification(`Marked as ${newStatus}`);
        return { ...item, status: newStatus };
      }
      return item;
    }));
    setTimeout(() => setNotification(""), 3000);
  };

  const deleteItem = (id) => {
    setListings(prev => prev.filter(item => item.id !== id));
    setNotification("Item deleted");
    setShowDeleteConfirm(null);
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div style={styles.pageWrapper}>
      {notification && (
        <div style={styles.toast}>
          <CheckCircle size={18} /> {notification}
        </div>
      )}

      {showDeleteConfirm && (
        <div style={styles.overlay}>
          <div style={styles.confirmBox}>
            <AlertCircle size={40} color="#ef4444" />
            <h3 style={{margin: '15px 0 10px'}}>Delete Listing?</h3>
            <p style={{fontSize: '14px', color: '#64748b'}}>This will remove the item from the market.</p>
            <div style={styles.confirmBtns}>
              <button onClick={() => setShowDeleteConfirm(null)} style={styles.cancelBtn}>Cancel</button>
              <button onClick={() => deleteItem(showDeleteConfirm)} style={styles.deleteConfirmBtn}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {viewingInfo && (
        <div style={styles.overlay}>
          <div style={styles.infoModal}>
            <div style={styles.modalHeader}>
              <h3 style={{margin: 0}}>Item Details</h3>
              <X onClick={() => setViewingInfo(null)} style={{cursor: 'pointer'}} />
            </div>
            <div style={styles.modalBody}>
              {/* ✅ Renders the image with a Fail-Safe handler */}
              <img 
                src={viewingInfo.image} 
                alt="" 
                style={styles.modalImg} 
                onError={handleImageError} 
              />
              <div style={styles.modalInfoGrid}>
                <p><strong>Name:</strong> {viewingInfo.name}</p>
                <p><strong>Type:</strong> {viewingInfo.type}</p>
                <p><strong>Model:</strong> {viewingInfo.model}</p>
                <p><strong>Age:</strong> {viewingInfo.age}</p>
                <p><strong>Rent:</strong> {viewingInfo.price}</p>
                <p><strong>Pickup:</strong> {viewingInfo.location}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>My Listings</h1>
          <p style={styles.subtitle}>Manage items you have shared on CampusRent</p>
        </div>
        <button style={styles.addBtnHeader} onClick={() => navigate('/add-item')}><Plus size={18} /> Add New</button>
      </div>

      <div style={styles.grid}>
        {listings.length === 0 ? (
          <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '100px 0'}}>
            <Inbox size={60} color="#cbd5e1" style={{marginBottom: '20px'}} />
            <h3 style={{color: '#64748b'}}>No items listed yet.</h3>
          </div>
        ) : (
          listings.map((item) => (
            <div 
              key={item.id} 
              style={{
                ...styles.card,
                ...(hoveredCard === item.id ? styles.cardHover : {})
              }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.imageBox}>
                {/* ✅ Render actual image or fallback if it fails */}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={styles.img} 
                  onError={handleImageError} 
                />
                <div style={{
                  ...styles.statusBadge,
                  backgroundColor: item.status === "Available" ? "#dcfce7" : "#fee2e2",
                  color: item.status === "Available" ? "#166534" : "#991b1b"
                }}>
                  {item.status}
                </div>
              </div>

              <div style={styles.cardContent}>
                <span style={styles.category}>{item.category}</span>
                <h4 style={styles.itemName}>{item.name}</h4>
                
                <div style={styles.detailsRow}>
                  <span>Type: <strong>{item.type}</strong></span>
                  <span>Age: <strong>{item.age}</strong></span>
                </div>

                {item.requests > 0 && (
                  <div style={styles.requestBadge}>
                    <span>{item.requests} New Requests</span>
                    <ChevronRight size={14} />
                  </div>
                )}

                <div style={styles.actions}>
                  <button style={styles.actionBtn} title="View Info" onClick={() => setViewingInfo(item)}>
                    <Info size={16} />
                  </button>
                  <button style={styles.actionBtn} title="Edit Item" onClick={() => handleEditRedirect(item)}>
                    <Edit3 size={16} />
                  </button>
                  <button 
                    style={styles.actionBtn} 
                    onClick={() => toggleStatus(item.id)}
                    title="Toggle Status"
                  >
                    {item.status === "Available" ? <Power size={16} color="#22c55e" /> : <PowerOff size={16} color="#ef4444" />}
                  </button>
                  <button 
                    style={{...styles.actionBtn, color: '#ef4444'}} 
                    onClick={() => setShowDeleteConfirm(item.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// --- STYLES (KEPT EXACTLY THE SAME AS PROVIDED) ---
const styles = {
    pageWrapper: { padding: '60px 10%', backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '2px solid #f1f5f9', paddingBottom: '20px' },
    title: { fontSize: '32px', color: '#111827', margin: 0, fontWeight: '800' },
    subtitle: { color: '#6b7280', fontSize: '15px', marginTop: '5px' },
    addBtnHeader: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', transition: '0.2s' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' },
    card: { backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'default' },
    cardHover: { transform: 'translateY(-12px)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' },
    imageBox: { position: 'relative', height: '180px', backgroundColor: '#f3f4f6' },
    img: { width: '100%', height: '100%', objectFit: 'cover' },
    statusBadge: { position: 'absolute', top: '12px', right: '12px', padding: '5px 12px', borderRadius: '30px', fontSize: '11px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    cardContent: { padding: '20px' },
    category: { fontSize: '11px', color: '#4f46e5', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' },
    itemName: { fontSize: '19px', color: '#1f2937', margin: '8px 0', fontWeight: '700' },
    detailsRow: { display: 'flex', gap: '15px', fontSize: '13px', color: '#6b7280', marginBottom: '15px' },
    requestBadge: { backgroundColor: '#eef2ff', color: '#4f46e5', padding: '10px 15px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', fontSize: '13px', fontWeight: '600', border: '1px solid #e0e7ff', cursor: 'pointer' },
    actions: { display: 'flex', gap: '10px', marginTop: '10px', paddingTop: '15px', borderTop: '1px solid #f3f4f6' },
    actionBtn: { flex: 1, height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#4b5563', cursor: 'pointer', transition: '0.2s' },
    overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' },
    confirmBox: { backgroundColor: '#fff', padding: '30px', borderRadius: '20px', width: '350px', textAlign: 'center' },
    confirmBtns: { display: 'flex', gap: '12px', marginTop: '25px' },
    cancelBtn: { flex: 1, padding: '12px', border: '1px solid #d1d5db', borderRadius: '10px', backgroundColor: '#fff', cursor: 'pointer' },
    deleteConfirmBtn: { flex: 1, padding: '12px', border: 'none', borderRadius: '10px', backgroundColor: '#ef4444', color: '#fff', fontWeight: '600', cursor: 'pointer' },
    infoModal: { backgroundColor: '#fff', width: '500px', borderRadius: '20px', overflow: 'hidden' },
    modalHeader: { padding: '20px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    modalBody: { padding: '20px' },
    modalImg: { width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px' },
    modalInfoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '15px' },
    toast: { position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#111827', color: '#fff', padding: '16px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)', zIndex: 1100 }
};

export default MyListings;