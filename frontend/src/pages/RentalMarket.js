import React, { useState, useEffect } from 'react';
import { Search, X, Star, MapPin, CheckCircle, Loader2 } from 'lucide-react';

const API_URL = "http://localhost:5000/api/items";

// --- MOCK DATA ---
const INITIAL_ITEMS = [
  // --- TECH & GADGETS (6 Items) ---
  { 
    id: 1, 
    name: "Scientific Calculator TI-84", 
    category: "Tech & Gadgets", 
    type: "Electronics", 
    age: "2 years", 
    model: "TI-84 Plus CE", 
    rating: 4.8, 
    image: "https://preview.redd.it/casio-fx-991-es-plus-2nd-edition-vs-991-cw-v0-hqrcihj7pnpd1.jpeg?width=2016&auto=webp&s=5baafae579ad7fb4de28511a0bde383b45b1b237", 
    owner: "Sarah Jenkins", 
    price: "₹40/day", 
    location: "Central Library, 1st Floor Reading Room" 
  },
  { 
    id: 101, 
    name: "Casio Scientific Calculator", 
    category: "Tech & Gadgets", 
    type: "Electronics", 
    age: "1 year", 
    model: "fx-991EX", 
    rating: 4.6, 
    image: "https://orpatgroup.com/wp-content/uploads/2020/12/Desktop-Calculators-%E2%80%93-OT-512-GT-%E2%80%93-Black-L.png", 
    owner: "Rahul V.", 
    price: "Free", 
    location: "Science Block, 3rd Floor, Physics Lab" 
  },
  { 
    id: 102, 
    name: "Graphing Calculator TI-89", 
    category: "Tech & Gadgets", 
    type: "Electronics", 
    age: "3 years", 
    model: "Titanium Edition", 
    rating: 4.9, 
    image: "https://www.weareteachers.com/wp-content/uploads/best-graphing-calculators.png", 
    owner: "Prof. Gupta", 
    price: "₹100/day", 
    location: "Math Dept, 2nd Floor, Room 204" 
  },
  { 
    id: 103, 
    name: "Canon EOS R50", 
    category: "Tech & Gadgets", 
    type: "Camera", 
    age: "1 year", 
    model: "Mirrorless", 
    rating: 4.9, 
    image: "https://shotkit.com/wp-content/uploads/bb-plugin/cache/canon_eos_90d--landscape-f04ec76f3516f9869d54a25d66e64851-zybravgx2q47.jpeg", 
    owner: "Alex Rivera", 
    price: "₹500/day", 
    location: "Media Center, Basement Wing" 
  },
  { 
    id: 104, 
    name: "Sony Noise Cancelling Headphones", 
    category: "Tech & Gadgets", 
    type: "Audio", 
    age: "2 years", 
    model: "WH-1000XM4", 
    rating: 4.7, 
    image: "https://i.ytimg.com/vi/7AuS5tI7yxs/maxresdefault.jpg", 
    owner: "Kevin L.", 
    price: "₹150/day", 
    location: "Hostel Block A, Room 302" 
  },
  { 
    id: 105, 
    name: "Logitech Wireless Presenter", 
    category: "Tech & Gadgets", 
    type: "Accessory", 
    age: "1 year", 
    model: "R400", 
    rating: 4.5, 
    image: "https://m.media-amazon.com/images/I/41xSZbUhPdL._AC_UF350,350_QL80_.jpg", 
    owner: "Student Union", 
    price: "Free", 
    location: "Auditorium Side Office" 
  },

  // --- LAB EQUIPMENT (3 Items) ---
  { 
    id: 2, 
    name: "Professional Lab Coat", 
    category: "Lab Equipment", 
    type: "Apparel", 
    age: "1 year", 
    model: "Medium/Acid-Resistant", 
    rating: 4.5, 
    image: "https://www.redkap.com/dw/image/v2/BDCD_PRD/on/demandware.static/-/Sites-redkap-master-catalog/default/dw0bc5c838/KP70/PS_RK_KP70WH_F.png?sw=800&sh=800", 
    owner: "Dr. Michael Chen", 
    price: "₹50/day", 
    location: "Chemistry Lab, Ground Floor" 
  },
  { 
    id: 201, 
    name: "Cotton White Lab Coat", 
    category: "Lab Equipment", 
    type: "Apparel", 
    age: "6 months", 
    model: "Large/Unisex", 
    rating: 4.7, 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0O9Wxci0Ef114lCvcCGJdFtABFdoTzeVvFg&s", 
    owner: "Priya Sharma", 
    price: "Free", 
    location: "Biology Dept, 2nd Floor, Room 210" 
  },
  { 
    id: 202, 
    name: "Safety Goggles", 
    category: "Lab Equipment", 
    type: "Eye Wear", 
    age: "1 year", 
    model: "Anti-Fog", 
    rating: 4.3, 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9vU6aqJLYLUFnmREniTlOXbiuCMdEabdM2g&s", 
    owner: "Chemistry Society", 
    price: "Free", 
    location: "Chemistry Lab, Reception Counter" 
  },

  // --- TEXTBOOKS (3 Items) ---
  { 
    id: 5, 
    name: "Introduction to Algorithms", 
    category: "Textbooks", 
    type: "Hardcover", 
    age: "4 years", 
    model: "3rd Edition (CLRS)", 
    rating: 5.0, 
    image: "https://cdn.prod.website-files.com/661b9e736a74273c4f628d6e/664e7aae90b2f66634a089fe_661c2eb8838392f631c175f2_653d893011e1dd3cc24d86db_algorithms.png", 
    owner: "Library Staff", 
    price: "Free", 
    location: "Main Library, CS Section" 
  },
  { 
    id: 501, 
    name: "Organic Chemistry Textbook", 
    category: "Textbooks", 
    type: "Hardcover", 
    age: "2 years", 
    model: "Morrison & Boyd", 
    rating: 4.4, 
    image: "https://m.media-amazon.com/images/I/81x1F6B6M8L._AC_UF1000,1000_QL80_.jpg", 
    owner: "Vikram K.", 
    price: "₹30/day", 
    location: "Chemistry Dept, 1st Floor Staff Room" 
  },
  { 
    id: 502, 
    name: "Engineering Drawing Set", 
    category: "Textbooks", 
    type: "Toolkit", 
    age: "2 years", 
    model: "Standard Professional", 
    rating: 4.6, 
    image: "https://m.media-amazon.com/images/I/71R2o5D+6GL._AC_SL1500_.jpg", 
    owner: "Suresh P.", 
    price: "₹40/day", 
    location: "Mechanical Workshop, Ground Floor" 
  },

  // --- SPORTS & MISC (3 Items) ---
  { 
    id: 4, 
    name: "Wilson Basketball", 
    category: "Sports & Fitness", 
    type: "Equipment", 
    age: "3 years", 
    model: "Official Size", 
    rating: 4.2, 
    image: "https://www.sportscasting.com/wp-content/uploads/2020/02/NBA-Game-Ball.jpg", 
    owner: "John Doe", 
    price: "Free", 
    location: "Indoor Sports Complex" 
  },
  { 
    id: 601, 
    name: "Badminton Racket Set", 
    category: "Sports & Fitness", 
    type: "Equipment", 
    age: "1 year", 
    model: "Yonex Muscle Power", 
    rating: 4.8, 
    image: "https://m.media-amazon.com/images/I/71G1YV7x8pL._AC_SL1500_.jpg", 
    owner: "Karan M.", 
    price: "₹20/day", 
    location: "Hostel Block B, Common Room" 
  },
  { 
    id: 701, 
    name: "Rechargeable Desk Lamp", 
    category: "Miscellaneous", 
    type: "Utility", 
    age: "1 year", 
    model: "LED Touch Control", 
    rating: 4.5, 
    image: "https://m.media-amazon.com/images/I/61U8-Z4q3pL._AC_SL1500_.jpg", 
    owner: "Sneha R.", 
    price: "Free", 
    location: "Girls Hostel, 1st Floor, Room 112" 
  }
];

const RentalMarket = () => {
  // State Management
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [backendItems, setBackendItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null); 
  const [infoItem, setInfoItem] = useState(null); 
  // ✅ Tracks if a rent request has been successfully sent
  const [isRented, setIsRented] = useState(false);
  const [reviews, setReviews] = useState([{ user: "Kevin L.", rating: 5, comment: "Perfect fit and clean.", date: "2025-01-20" }]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [notification, setNotification] = useState("");

  const categories = ["All", "Tech & Gadgets", "Lab Equipment", "Textbooks", "Sports & Fitness", "Clothing & Uniforms", "Miscellaneous"];

  // Search and Filter Logic
  useEffect(() => {
    const merged = [...INITIAL_ITEMS, ...backendItems];
    const filtered = merged.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeCategory === "All" || item.category === activeCategory)
    );
    setItems(filtered);
  }, [searchTerm, activeCategory, backendItems]);

  useEffect(() => {
    const fetchBackendItems = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const formatted = data.map(item => ({
          id: item._id,
          name: item.title,
          category: item.category || "Miscellaneous",
          type: "User Listed",
          age: "New",
          model: "N/A",
          rating: 5,
          image: item.image || "https://via.placeholder.com/300",
          owner: item.owner?.firstName || "Campus User",
          price: item.price === 0 ? "Free" : "Paid",
          location: item.location || "On Campus"
        }));

        setBackendItems(formatted); 
      } catch (err) {
        console.error("Failed to load items", err);
      }
    };

    fetchBackendItems();
  }, []);

  const handleRentSubmit = (e) => {
    e.preventDefault();
    setNotification("Successfully Rented!");
    setSelectedItem(null);
    // ✅ Change state to reflect that the request was sent
    setIsRented(true); 
    setTimeout(() => setNotification(""), 3000);
  };

  const handlePostReview = () => {
    if(!newReview.comment) return;
    const reviewObj = {
      user: "Current User",
      rating: newReview.rating || 5,
      comment: newReview.comment,
      date: new Date().toLocaleDateString()
    };
    setReviews([reviewObj, ...reviews]);
    setNewReview({ rating: 0, comment: "" });
  };

  // --- SUB-COMPONENT: INFO PAGE ---
  if (infoItem) {
    return (
      <div style={styles.infoPage}>
        <style>{`
          .tap-btn { transition: transform 0.1s ease !important; cursor: pointer; }
          .tap-btn:active { transform: scale(0.95) !important; }
        `}</style>
        {/* Reset isRented when going back to market */}
        <button className="tap-btn" onClick={() => { setInfoItem(null); setIsRented(false); }} style={styles.backBtn}>← Back to Market</button>
        <div style={styles.infoContainer}>
          <div style={styles.infoLeft}>
            <img src={infoItem.image} alt={infoItem.name} style={styles.infoMainImg} />
            <div style={styles.ownerCard}>
              <p>Owner Name: <strong>{infoItem.owner}</strong></p>
              <p>Owner ID: <strong>ID: u789</strong></p>
              <p>Preferred Handover: <strong>{infoItem.location || "Chemistry Lab B-12"}</strong></p>
            </div>
          </div>
          <div style={styles.infoRight}>
             <span style={styles.categoryBadge}>{infoItem.category.toUpperCase()}</span>
             <h1 style={styles.infoTitle}>{infoItem.name}</h1>
             <p style={styles.infoDesc}>High-quality <strong>{infoItem.name}</strong> available for short-term rental. Well maintained and reliable.</p>
             <div style={styles.specGrid}>
                <div style={styles.specBox}><span>AGE</span><strong>{infoItem.age}</strong></div>
                <div style={styles.specBox}><span>TYPE</span><strong>{infoItem.type}</strong></div>
                <div style={styles.specBox}><span>PRICE</span><strong style={{color: '#4f46e5'}}>{infoItem.price}</strong></div>
             </div>

             {/* ✅ Button updates text and color when isRented is true */}
             <button 
                className="tap-btn" 
                disabled={isRented}
                style={{
                  ...styles.rentLargeBtn,
                  backgroundColor: isRented ? "#10b981" : "#4f46e5", 
                  cursor: isRented ? "default" : "pointer"
                }} 
                onClick={() => {setSelectedItem(infoItem)}}
             >
                {isRented ? "Rent Request Sent ✓" : "Rent This Item"}
             </button>

             <div style={styles.reviewSection}>
                <h3>Reviews <span style={styles.reviewCount}>{reviews.length}</span></h3>
                <div style={styles.reviewInputBox}>
                   <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                     {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={20}
                          style={{ cursor: 'pointer' }}
                          fill={star <= newReview.rating ? "#FFD700" : "none"}
                          color={star <= newReview.rating ? "#FFD700" : "#ccc"}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                        />
                      ))}
                      <span style={{ fontSize: '12px', color: '#777', marginLeft: '5px' }}>Rate it!</span>
                   </div>
                   <textarea 
                    placeholder="Share your experience..." 
                    style={styles.reviewArea}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                   />
                   <button className="tap-btn" style={styles.postReviewBtn} onClick={handlePostReview}>Post Review</button>
                </div>
                {reviews.map((r, i) => (
                  <div key={i} style={styles.reviewItem}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                      <strong>{r.user}</strong><span style={{fontSize:'11px', color:'#999'}}>{r.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={12} fill={idx < r.rating ? "#FFD700" : "none"} color={idx < r.rating ? "#FFD700" : "#ccc"} />
                      ))}
                    </div>
                    <p style={{fontSize:'14px', margin:'5px 0'}}>{r.comment}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
        
        {selectedItem && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <div style={styles.modalHeader}>
                <div>
                  <h2 style={{margin: 0}}>Rent Request</h2>
                  <p style={{fontSize:'12px', opacity: 0.8}}>Please provide the details for your rental request.</p>
                </div>
                <X onClick={() => setSelectedItem(null)} style={{cursor:'pointer'}}/>
              </div>
              <form style={styles.modalForm} onSubmit={handleRentSubmit}>
                <div style={styles.itemSummary}>
                  <div><small>ITEM NAME</small><br/><strong>{selectedItem.name}</strong></div>
                  <div><small>CATEGORY</small><br/><strong>{selectedItem.category}</strong></div>
                  <div><small>OWNER</small><br/><strong>{selectedItem.owner}</strong></div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label>Start Date</label>
                    <input type="date" required style={styles.modalInput}/>
                  </div>
                  <div style={styles.formGroup}>
                    <label>End Date</label>
                    <input type="date" required style={styles.modalInput}/>
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label>Duration (Hours)</label>
                  <input type="number" placeholder="e.g. 5" style={styles.modalInput}/>
                </div>
                <div style={styles.formGroup}>
                  <label>Purpose of Renting</label>
                  <select style={styles.modalInput}>
                    <option>Personal Use</option>
                    <option>Project Work</option>
                    <option>Emergency</option>
                  </select>
                </div>
                <label style={{fontSize:'13px', fontWeight:'bold'}}>Preferred Pickup Location</label>
                <div style={styles.radioGrid}>
                   {['Library', 'Hostel', 'Department Building', 'Flexible'].map(loc => (
                     <label key={loc} style={styles.radioItem}>
                       <input type="radio" name="loc" /> {loc}
                     </label>
                   ))}
                </div>
                <button className="tap-btn" type="submit" style={styles.modalSubmitBtn}>Submit Rent Request</button>
              </form>
            </div>
          </div>
        )}
        {notification && <div style={styles.toast}><CheckCircle size={18}/> {notification}</div>}
      </div>
    );
  }

  return (
    <div style={styles.marketWrapper}>
      <style>{`
        .tap-btn { transition: transform 0.1s ease !important; cursor: pointer; }
        .tap-btn:active { transform: scale(0.95) !important; }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease !important; }
        .card-hover:hover { transform: translateY(-10px) !important; box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; }
      `}</style>

      {notification && <div style={styles.toast}><CheckCircle size={18}/> {notification}</div>}

      {/* --- HERO SECTION --- */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <h1 style={styles.heroHeading}>CAMPUS Essentials</h1>
          <h2 style={styles.heroSubHeading}>Rent Smarter, Not Harder</h2>
          <p style={styles.heroPara}>
            Short-term rentals for exams, projects, labs, and daily campus life — 
            affordable, verified, and just a few steps away.
          </p>
          <button className="tap-btn" style={styles.shopNowBtn}>SHOP NOW</button>
        </div>
        <div style={styles.heroRight}>
          <img 
            src="https://media.istockphoto.com/id/1300114974/photo/full-turquoise-school-backpack-with-stationery-on-table-on-orange-background-back-to-school.jpg?s=612x612&w=0&k=20&c=meIHDOKLk73I_JIwXcyEpSwO8eQb4Rlx1Kqm70XSkpY=" 
            alt="College Setup" 
            style={styles.heroImg} 
          />
        </div>
      </section>

      {/* --- SEARCH TOOLBAR --- */}
      <div style={styles.toolbar}>
        <div style={styles.searchBar}>
          <Search size={20} color="#999" />
          <input 
            type="text" 
            placeholder="Search for items manually..." 
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={styles.categoryList}>
          {categories.map(cat => (
            <button 
              key={cat} 
              className="tap-btn"
              style={activeCategory === cat ? styles.catBtnActive : styles.catBtn}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- ITEMS GRID --- */}
      <div style={styles.grid}>
        {items.map(item => (
          <div key={item.id} className="card-hover" style={styles.card}>
            <div style={styles.cardImgContainer}>
              <img src={item.image} alt={item.name} style={styles.cardImg} />
              <span style={styles.cardBadge}>{item.category}</span>
            </div>
            <div style={styles.cardBody}>
              <div style={styles.cardTop}>
                <h3 style={styles.itemName}><strong>{item.name.substring(0, 20)}...</strong></h3>
                <span style={styles.rating}><Star size={14} fill="#FFD700" color="#FFD700"/> <strong>{item.rating}</strong></span>
              </div>
              <p style={styles.cardDetail}>Type: <strong>{item.type}</strong></p>
              <p style={styles.cardDetail}>Location: <strong>{item.location}</strong></p>
              <p style={styles.cardDetail}>Price: <strong>{item.price}</strong></p>
              <div style={styles.cardBtnRow}>
                <button className="tap-btn" style={styles.rentBtn} onClick={() => setSelectedItem(item)}>Rent</button>
                <button className="tap-btn" style={styles.infoBtn} onClick={() => setInfoItem(item)}>Info</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- RENT MODAL --- */}
      {selectedItem && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={{margin: 0}}>Rent Request</h2>
                <p style={{fontSize:'12px', opacity: 0.8}}>Please provide the details for your rental request.</p>
              </div>
              <X onClick={() => setSelectedItem(null)} style={{cursor:'pointer'}}/>
            </div>
            <form style={styles.modalForm} onSubmit={handleRentSubmit}>
              <div style={styles.itemSummary}>
                <div><small>ITEM NAME</small><br/><strong>{selectedItem.name}</strong></div>
                <div><small>CATEGORY</small><br/><strong>{selectedItem.category}</strong></div>
                <div><small>OWNER</small><br/><strong>{selectedItem.owner}</strong></div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label>Start Date</label>
                  <input type="date" required style={styles.modalInput}/>
                </div>
                <div style={styles.formGroup}>
                  <label>End Date</label>
                  <input type="date" required style={styles.modalInput}/>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label>Duration (Hours)</label>
                <input type="number" placeholder="e.g. 5" style={styles.modalInput}/>
              </div>

              <div style={styles.formGroup}>
                <label>Purpose of Renting</label>
                <select style={styles.modalInput}>
                  <option>Personal Use</option>
                  <option>Project Work</option>
                  <option>Emergency</option>
                </select>
              </div>

              <label style={{fontSize:'13px', fontWeight:'bold'}}>Preferred Pickup Location</label>
              <div style={styles.radioGrid}>
                 {['Library', 'Hostel', 'Department Building', 'Flexible'].map(loc => (
                   <label key={loc} style={styles.radioItem}>
                     <input type="radio" name="loc" /> {loc}
                   </label>
                 ))}
              </div>

              <button className="tap-btn" type="submit" style={styles.modalSubmitBtn}>Submit Rent Request</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- STYLES ---
const styles = {
  marketWrapper: { fontFamily: 'Inter, system-ui, -apple-system, sans-serif', backgroundColor: '#fbfbf9ff', minHeight: '100vh', paddingBottom: '50px' },
  hero: { display: 'flex', padding: '60px 10%', backgroundColor: '#f3f4f6', alignItems: 'center', gap: '40px' },
  heroLeft: { flex: 1 },
  heroRight: { flex: 1 },
  heroHeading: { fontSize: '48px', color: '#1e293b', margin: 0 },
  heroSubHeading: { fontSize: '32px', color: '#4f46e5', margin: '10px 0' },
  heroPara: { color: '#64748b', fontSize: '18px', margin: '20px 0', lineHeight: '1.6' },
  shopNowBtn: { padding: '12px 30px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '25px', fontWeight: 'bold' },
  heroImg: { width: '100%', borderRadius: '20px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' },
  
  toolbar: { padding: '40px 10%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' },
  searchBar: { display: 'flex', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '30px', padding: '10px 20px', width: '100%', maxWidth: '600px' },
  searchInput: { border: 'none', outline: 'none', marginLeft: '10px', width: '100%', fontSize: '16px' },
  categoryList: { display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' },
  catBtn: { padding: '8px 16px', borderRadius: '20px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '14px' },
  catBtnActive: { padding: '8px 16px', borderRadius: '20px', border: 'none', backgroundColor: '#4f46e5', color: '#fff' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', padding: '0 10%' },
  card: { backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' },
  cardImgContainer: { position: 'relative', height: '180px' },
  cardImg: { width: '100%', height: '100%', objectFit: 'cover' },
  cardBadge: { position: 'absolute', top: '10px', right: '10px', backgroundColor: '#4f46e5', color: '#fff', fontSize: '10px', padding: '4px 8px', borderRadius: '10px' },
  cardBody: { padding: '20px' },
  cardTop: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  itemName: { fontSize: '16px', margin: 0 },
  rating: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 'bold' },
  cardDetail: { margin: '4px 0', fontSize: '13px', color: '#666' },
  cardBtnRow: { display: 'flex', gap: '10px', marginTop: '15px' },
  rentBtn: { flex: 1, padding: '10px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold' },
  infoBtn: { flex: 1, padding: '10px', backgroundColor: '#fff', border: '1px solid #4f46e5', color: '#4f46e5', borderRadius: '8px', fontWeight: 'bold' },

  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#fff', borderRadius: '20px', width: '90%', maxWidth: '500px', overflow: 'hidden' },
  modalHeader: { backgroundColor: '#4f46e5', color: '#fff', padding: '20px', display: 'flex', justifyContent: 'space-between' },
  modalForm: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' },
  itemSummary: { backgroundColor: '#f8fafc', padding: '15px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '12px' },
  formRow: { display: 'flex', gap: '10px' },
  formGroup: { flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' },
  modalInput: { padding: '10px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' },
  radioGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  radioItem: { fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', border: '1px solid #eee', borderRadius: '8px' },
  modalSubmitBtn: { padding: '15px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', marginTop: '10px' },

  infoPage: { padding: '40px 10%', backgroundColor: '#fff', minHeight: '100vh', position: 'relative', fontFamily: 'Inter, system-ui, sans-serif' },
  backBtn: { marginBottom: '20px', border: 'none', background: 'none', color: '#4f46e5', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' },
  infoContainer: { display: 'flex', gap: '50px', flexWrap: 'wrap' },
  infoLeft: { flex: 1, minWidth: '300px' },
  infoRight: { flex: 1.5, minWidth: '300px' },
  infoMainImg: { width: '100%', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' },
  ownerCard: { borderTop: '1px solid #eee', paddingTop: '20px', fontSize: '14px', color: '#555' },
  categoryBadge: { color: '#4f46e5', fontWeight: 'bold', fontSize: '12px', letterSpacing: '1px' },
  infoTitle: { fontSize: '32px', margin: '10px 0', color: '#1e293b' },
  infoDesc: { color: '#666', lineHeight: '1.6', fontSize: '15px' },
  specGrid: { display: 'flex', gap: '15px', margin: '25px 0' },
  specBox: { flex: 1, border: '1px solid #eee', padding: '12px', borderRadius: '10px', display: 'flex', flexDirection: 'column' },
  rentLargeBtn: { width: '100%', padding: '16px', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', transition: 'background-color 0.3s ease' },
  reviewSection: { marginTop: '40px' },
  reviewInputBox: { border: '1px solid #eee', padding: '15px', borderRadius: '12px', marginBottom: '25px' },
  reviewArea: { width: '100%', border: 'none', borderBottom: '1px solid #eee', outline: 'none', padding: '8px 0', fontSize: '14px' },
  postReviewBtn: { backgroundColor: '#1e293b', color: '#fff', padding: '6px 15px', borderRadius: '5px', border: 'none', float: 'right', fontSize: '13px', fontWeight: 'bold' },
  reviewItem: { paddingBottom: '15px', borderBottom: '1px solid #f0f0f0', marginBottom: '15px' },
  toast: { position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#10b981', color: '#fff', padding: '15px 25px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', zIndex: 2000 }
};

export default RentalMarket;