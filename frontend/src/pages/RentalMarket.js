import React, { useState, useEffect } from 'react';
import { Search, X, Star, MapPin, CheckCircle, Loader2, ChevronDown, Shield, Truck, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const INITIAL_ITEMS = [
  { id: 1, name: "Scientific Calculator TI-84", category: "Tech & Gadgets", type: "Electronics", age: "2 years", model: "TI-84 Plus CE", rating: 4.8, image: "1.jpg", owner: "Sarah Jenkins", price: "₹40/day", location: "Central Library, 1st Floor Reading Room" },
  { id: 101, name: "Casio Scientific Calculator", category: "Tech & Gadgets", type: "Electronics", age: "1 year", model: "fx-991EX", rating: 4.6, image: "2.jpg", owner: "Rahul V.", price: "Free", location: "Science Block, 3rd Floor, Physics Lab" },
  { id: 102, name: "Graphing Calculator TI-89", category: "Tech & Gadgets", type: "Electronics", age: "3 years", model: "Titanium Edition", rating: 4.9, image: "3.jpg", owner: "Prof. Gupta", price: "₹100/day", location: "Math Dept, 2nd Floor, Room 204" },
  { id: 103, name: "Canon EOS R50", category: "Tech & Gadgets", type: "Camera", age: "1 year", model: "Mirrorless", rating: 4.9, image: "https://shotkit.com/wp-content/uploads/bb-plugin/cache/canon_eos_90d--landscape-f04ec76f3516f9869d54a25d66e64851-zybravgx2q47.jpeg", owner: "Alex Rivera", price: "₹500/day", location: "Media Center, Basement Wing" },
  { id: 104, name: "Sony Noise Cancelling Headphones", category: "Tech & Gadgets", type: "Audio", age: "2 years", model: "WH-1000XM4", rating: 4.7, image: "head.jpg", owner: "Kevin L.", price: "₹150/day", location: "Hostel Block A, Room 302" },
  { id: 105, name: "Logitech Wireless Presenter", category: "Tech & Gadgets", type: "Accessory", age: "1 year", model: "R400", rating: 4.5, image: "remote.jpg", owner: "Student Union", price: "Free", location: "Auditorium Side Office" },
  { id: 2, name: "Professional Lab Coat", category: "Lab Equipment", type: "Apparel", age: "1 year", model: "Medium/Acid-Resistant", rating: 4.5, image: "l1.jpeg", owner: "Dr. Michael Chen", price: "₹50/day", location: "Chemistry Lab, Ground Floor" },
  { id: 201, name: "Cotton White Lab Coat", category: "Lab Equipment", type: "Apparel", age: "6 months", model: "Large/Unisex", rating: 4.7, image: "l2.png", owner: "Priya Sharma", price: "Free", location: "Biology Dept, 2nd Floor, Room 210" },
  { id: 202, name: "Safety Goggles", category: "Lab Equipment", type: "Eye Wear", age: "1 year", model: "Anti-Fog", rating: 4.3, image: "glass.jpg", owner: "Chemistry Society", price: "Free", location: "Chemistry Lab, Reception Counter" },
  { id: 5, name: "Introduction to Algorithms", category: "Textbooks", type: "Hardcover", age: "4 years", model: "3rd Edition (CLRS)", rating: 5.0, image: "algo.png", owner: "Library Staff", price: "Free", location: "Main Library, CS Section" },
  { id: 501, name: "Organic Chemistry Textbook", category: "Textbooks", type: "Hardcover", age: "2 years", model: "Morrison & Boyd", rating: 4.4, image: "vhem.png", owner: "Vikram K.", price: "₹30/day", location: "Chemistry Dept, 1st Floor Staff Room" },
  { id: 502, name: "Engineering Drawing Set", category: "Textbooks", type: "Toolkit", age: "2 years", model: "Standard Professional", rating: 4.6, image: "edd.jpg", owner: "Suresh P.", price: "₹40/day", location: "Mechanical Workshop, Ground Floor" },
  { id: 4, name: "Wilson Basketball", category: "Sports & Fitness", type: "Equipment", age: "3 years", model: "Official Size", rating: 4.2, image: "https://www.sportscasting.com/wp-content/uploads/2020/02/NBA-Game-Ball.jpg", owner: "John Doe", price: "Free", location: "Indoor Sports Complex" },
  { id: 601, name: "Badminton Racket Set", category: "Sports & Fitness", type: "Equipment", age: "1 year", model: "Yonex Muscle Power", rating: 4.8, image: "racket.jpg", owner: "Karan M.", price: "₹20/day", location: "Hostel Block B, Common Room" },
  { id: 701, name: "Rechargeable Desk Lamp", category: "Miscellaneous", type: "Utility", age: "1 year", model: "LED Touch Control", rating: 4.5, image: "lamp.jpg", owner: "Sneha R.", price: "Free", location: "Girls Hostel, 1st Floor, Room 112" }
];

const ORANGE = '#ff6b35';
const ORANGE2 = '#f7931e';
const DARK = '#0F172A';

const RentalMarket = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [backendItems, setBackendItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [infoItem, setInfoItem] = useState(null);
  const [isRented, setIsRented] = useState(false);
  const [isLoadingBackend, setIsLoadingBackend] = useState(true);
  const [reviews, setReviews] = useState([
    { user: "Kevin L.", rating: 5, comment: "Perfect condition and super clean. Picked up easily from the library!", date: "2025-01-20", avatar: "KL" },
    { user: "Priya M.", rating: 4, comment: "Really helpful, saved me a lot of money. Will rent again.", date: "2025-02-10", avatar: "PM" },
    { user: "Arjun S.", rating: 5, comment: "Great experience! Owner was very responsive.", date: "2025-03-05", avatar: "AS" }
  ]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [notification, setNotification] = useState("");
  const [wishlist, setWishlist] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [email, setEmail] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const categories = ["All", "Tech & Gadgets", "Lab Equipment", "Textbooks", "Sports & Fitness", "Clothing & Uniforms", "Miscellaneous"];

  useEffect(() => {
    const fetchBackendItems = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/items`);
        if (!res.ok) throw new Error("Failed to fetch");
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
          owner: item.owner?.firstName ? `${item.owner.firstName} ${item.owner.lastName || ""}`.trim() : "Campus User",
          price: item.price === 0 ? "Free" : `₹${item.price}/day`,
          location: item.location || "On Campus",
          description: item.description || "",
        }));
        setBackendItems(formatted);
      } catch (err) {
        console.error("Failed to load backend items:", err);
      } finally {
        setIsLoadingBackend(false);
      }
    };
    fetchBackendItems();
  }, []);

  useEffect(() => {
    const merged = [...INITIAL_ITEMS, ...backendItems];
    const filtered = merged.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeCategory === "All" || item.category === activeCategory)
    );
    setItems(filtered);
  }, [searchTerm, activeCategory, backendItems]);

  const handleRentSubmit = (e) => {
    e.preventDefault();
    setNotification("Rent Request Sent Successfully!");
    setSelectedItem(null);
    setIsRented(true);
    setTimeout(() => setNotification(""), 3000);
  };

  const handlePostReview = () => {
    if (!newReview.comment) return;
    const reviewObj = {
      user: "Current User",
      rating: newReview.rating || 5,
      comment: newReview.comment,
      date: new Date().toLocaleDateString(),
      avatar: "CU"
    };
    setReviews([reviewObj, ...reviews]);
    setNewReview({ rating: 0, comment: "" });
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const faqs = [
    { q: "How do I pick up the item?", a: "Contact the owner through the platform after your request is approved. They will share the exact pickup location and timing." },
    { q: "What if the item is damaged?", a: "Both parties agree to a condition check at handover. Any damage is documented and handled per our campus rental policy." },
    { q: "Can I extend my rental period?", a: "Yes! Contact the owner before your rental ends to request an extension, subject to availability." },
    { q: "Is my payment secure?", a: "All transactions are handled securely through the CampusRent platform with verified campus accounts." }
  ];

  // ====== INFO PAGE — PREMIUM SHOPIFY-STYLE ======
  if (infoItem) {
    const thumbnails = [infoItem.image, infoItem.image, infoItem.image, infoItem.image];
    const relatedItems = INITIAL_ITEMS.filter(i => i.category === infoItem.category && i.id !== infoItem.id).slice(0, 4);
    const avgRating = (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1);

    return (
      <div style={infoStyles.page}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          * { font-family: 'Plus Jakarta Sans', system-ui, sans-serif !important; box-sizing: border-box; }
          .tap-btn { transition: all 0.2s ease !important; cursor: pointer; }
          .tap-btn:active { transform: scale(0.97) !important; }
          @keyframes fadeIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
          @keyframes spin { to { transform: rotate(360deg); } }
          .anim { animation: fadeIn 0.5s ease both; }
          .thumb-img:hover { border-color: #ff6b35 !important; }
          .faq-row:hover { background: #f8fafc !important; }
          .related-card:hover { box-shadow: 0 12px 30px rgba(0,0,0,0.1) !important; transform: translateY(-4px) !important; }
          .related-card { transition: all 0.3s ease !important; }
          .rent-main-btn:hover { background: linear-gradient(135deg, #e85a25, #e07010) !important; transform: translateY(-2px) !important; box-shadow: 0 12px 28px rgba(255,107,53,0.4) !important; }
          .request-btn:hover { background: #1e293b !important; transform: translateY(-2px) !important; }
          .back-link:hover { color: #ff6b35 !important; }
          .rent-main-btn, .request-btn { transition: all 0.25s ease !important; }
        `}</style>

        {/* BREADCRUMB NAV */}
        <div style={infoStyles.breadcrumb}>
          <span className="back-link tap-btn" style={infoStyles.breadcrumbLink} onClick={() => { setInfoItem(null); setIsRented(false); setSelectedImageIndex(0); }}>
            Marketplace
          </span>
          <span style={infoStyles.breadcrumbSep}>›</span>
          <span style={infoStyles.breadcrumbCurrent}>{infoItem.name}</span>
        </div>

        {/* MAIN PRODUCT SECTION */}
        <div style={infoStyles.productSection}>
          {/* LEFT — Image Gallery */}
          <div style={infoStyles.galleryCol}>
            {/* Main Image */}
            <div style={infoStyles.mainImgWrapper}>
              <img
                src={infoItem.image}
                alt={infoItem.name}
                style={infoStyles.mainImg}
                onError={e => { e.target.src = "https://via.placeholder.com/600x500?text=No+Image"; }}
              />
            </div>
            {/* Thumbnails */}
            <div style={infoStyles.thumbRow}>
              {thumbnails.map((src, i) => (
                <div
                  key={i}
                  className="thumb-img"
                  onClick={() => setSelectedImageIndex(i)}
                  style={{
                    ...infoStyles.thumb,
                    borderColor: selectedImageIndex === i ? ORANGE : '#E2E8F0',
                    boxShadow: selectedImageIndex === i ? `0 0 0 2px rgba(255,107,53,0.2)` : 'none',
                  }}
                >
                  <img src={src} alt="" style={infoStyles.thumbImg} onError={e => { e.target.src = "https://via.placeholder.com/80?text=..."; }} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Product Details */}
          <div style={infoStyles.detailCol} className="anim">
            {/* Category breadcrumb */}
            <span style={infoStyles.catLabel}>{infoItem.category} · {infoItem.type}</span>

            {/* Title */}
            <h1 style={infoStyles.productTitle}>
              {infoItem.name}:<br />
              <span style={infoStyles.productSubtitle}>Campus Verified. Ready to Rent.</span>
            </h1>

            {/* Rating row */}
            <div style={infoStyles.ratingRow}>
              <div style={infoStyles.starsRow}>
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={18} fill={s <= Math.round(parseFloat(avgRating)) ? "#FFD700" : "none"} color={s <= Math.round(parseFloat(avgRating)) ? "#FFD700" : "#D1D5DB"} />
                ))}
              </div>
              <span style={infoStyles.ratingNum}>{avgRating}</span>
              <span style={infoStyles.ratingLink}>Based on {reviews.length} Reviews</span>
            </div>

            {/* Price */}
            <div style={infoStyles.priceBlock}>
              {infoItem.price !== 'Free' && (
                <span style={infoStyles.originalPrice}>₹{parseInt(infoItem.price) + 100}/day</span>
              )}
              <span style={infoStyles.currentPrice}>{infoItem.price}</span>
              {infoItem.price !== 'Free' && (
                <span style={infoStyles.saveBadge}>SAVE 25% | CAMPUS DEAL</span>
              )}
              {infoItem.price === 'Free' && (
                <span style={{ ...infoStyles.saveBadge, backgroundColor: '#dcfce7', color: '#166534' }}>FREE RENTAL</span>
              )}
            </div>

            {/* Description */}
            <p style={infoStyles.productDesc}>
              Well-maintained {infoItem.name} available for short-term campus rental.
              Condition: <strong>{infoItem.age} old</strong> · Model: <strong>{infoItem.model}</strong>.
              Listed by a verified campus user — pick up from <strong>{infoItem.location}</strong>.
            </p>

            {/* Trust badges */}
            

            {/* CTAs */}
            <button
              className="tap-btn rent-main-btn"
              disabled={isRented}
              style={{
                ...infoStyles.rentMainBtn,
                background: isRented
                  ? 'linear-gradient(135deg, #10b981, #059669)'
                  : `linear-gradient(135deg, ${ORANGE}, ${ORANGE2})`,
                cursor: isRented ? 'default' : 'pointer',
              }}
              onClick={() => !isRented && setSelectedItem(infoItem)}
            >
              {isRented ? "✓ Rent Request Sent" : "Rent This Item"}
            </button>

            

            {/* Owner info */}
            <div style={infoStyles.ownerBlock}>
              <div style={infoStyles.ownerAvatar}>
                {infoItem.owner.split(' ').map(w => w[0]).join('').substring(0,2).toUpperCase()}
              </div>
              <div>
                <div style={infoStyles.ownerName}>{infoItem.owner}</div>
                <div style={infoStyles.ownerMeta}>Verified Campus User · {infoItem.location.split(',')[0]}</div>
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div style={infoStyles.sectionBlock}>
          <h2 style={infoStyles.sectionTitle}>Customer Reviews</h2>
          <div style={infoStyles.reviewsGrid}>
            {reviews.map((r, i) => (
              <div key={i} style={infoStyles.reviewCard}>
                <div style={infoStyles.reviewTop}>
                  <div style={infoStyles.reviewAvatar}>{r.avatar || r.user.substring(0,2).toUpperCase()}</div>
                  <div style={infoStyles.starsRow}>
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={14} fill={s <= r.rating ? "#FFD700" : "none"} color={s <= r.rating ? "#FFD700" : "#D1D5DB"} />
                    ))}
                  </div>
                </div>
                <p style={infoStyles.reviewComment}>{r.comment}</p>
                <div style={infoStyles.reviewMeta}>{r.user} · {r.date}</div>
              </div>
            ))}
          </div>

          {/* Write a review */}
          <div style={infoStyles.writeReview}>
            <h3 style={infoStyles.writeReviewTitle}>Write a Review</h3>
            <div style={infoStyles.starPicker}>
              {[1,2,3,4,5].map(star => (
                <Star
                  key={star} size={24} style={{ cursor: 'pointer' }}
                  fill={star <= newReview.rating ? "#FFD700" : "none"}
                  color={star <= newReview.rating ? "#FFD700" : "#D1D5DB"}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                />
              ))}
              <span style={{ fontSize: '13px', color: '#94a3b8', marginLeft: '8px' }}>Select rating</span>
            </div>
            <textarea
              placeholder="Share your rental experience..."
              style={infoStyles.reviewInput}
              value={newReview.comment}
              onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
            />
            <button className="tap-btn" style={infoStyles.postReviewBtn} onClick={handlePostReview}>
              Post Review
            </button>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div style={infoStyles.sectionBlock}>
          <h2 style={infoStyles.sectionTitle}>Frequently Asked Questions</h2>
          <div style={infoStyles.faqList}>
            {faqs.map((faq, i) => (
              <div key={i} style={infoStyles.faqItem}>
                <div
                  className="faq-row tap-btn"
                  style={infoStyles.faqHeader}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span style={infoStyles.faqQuestion}>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    color="#64748b"
                    style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', flexShrink: 0 }}
                  />
                </div>
                {openFaq === i && (
                  <div style={infoStyles.faqAnswer}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RELATED ITEMS */}
        {relatedItems.length > 0 && (
          <div style={infoStyles.sectionBlock}>
            <div style={infoStyles.relatedHeader}>
              <h2 style={infoStyles.sectionTitle}>Related Items</h2>
              <div style={infoStyles.relatedNav}>
                <button style={infoStyles.navBtn}><ChevronLeft size={18} /></button>
                <button style={infoStyles.navBtn}><ChevronRight size={18} /></button>
              </div>
            </div>
            <div style={infoStyles.relatedGrid}>
              {relatedItems.map(item => (
                <div
                  key={item.id}
                  className="related-card"
                  style={infoStyles.relatedCard}
                  onClick={() => { setInfoItem(item); setSelectedImageIndex(0); setIsRented(false); window.scrollTo(0,0); }}
                >
                  <div style={infoStyles.relatedImgBox}>
                    <img src={item.image} alt={item.name} style={infoStyles.relatedImg}
                      onError={e => { e.target.src = "https://via.placeholder.com/200?text=Item"; }} />
                  </div>
                  <div style={infoStyles.relatedBody}>
                    <div style={infoStyles.relatedName}>{item.name}</div>
                    <div style={infoStyles.relatedPrice}>{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STICKY BOTTOM BAR */}
        <div style={infoStyles.stickyBar}>
          <div style={infoStyles.stickyLeft}>
            <div style={infoStyles.stickyAvatar}>
              {infoItem.name.substring(0,2).toUpperCase()}
            </div>
            <div>
              <div style={infoStyles.stickyName}>{infoItem.name}</div>
              <div style={infoStyles.stickyPrice}>{infoItem.price}</div>
            </div>
          </div>
          <button
            className="tap-btn"
            style={{
              ...infoStyles.stickyBtn,
              background: isRented ? '#10b981' : `linear-gradient(135deg, ${ORANGE}, ${ORANGE2})`,
            }}
            onClick={() => !isRented && setSelectedItem(infoItem)}
          >
            {isRented ? "Request Sent ✓" : "Rent Now"}
          </button>
        </div>

        {/* RENT MODAL */}
        {selectedItem && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <div style={styles.modalHeader}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Rent Request</h2>
                  <p style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>Fill in the details for your rental.</p>
                </div>
                <X onClick={() => setSelectedItem(null)} style={{ cursor: 'pointer' }} />
              </div>
              <form style={styles.modalForm} onSubmit={handleRentSubmit}>
                <div style={styles.itemSummary}>
                  <div><small style={{ color: '#94a3b8', fontWeight: '600' }}>ITEM</small><br /><strong>{selectedItem.name}</strong></div>
                  <div><small style={{ color: '#94a3b8', fontWeight: '600' }}>CATEGORY</small><br /><strong>{selectedItem.category}</strong></div>
                  <div><small style={{ color: '#94a3b8', fontWeight: '600' }}>OWNER</small><br /><strong>{selectedItem.owner}</strong></div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}><label style={styles.modalLabelStyle}>Start Date</label><input type="date" required style={styles.modalInput} /></div>
                  <div style={styles.formGroup}><label style={styles.modalLabelStyle}>End Date</label><input type="date" required style={styles.modalInput} /></div>
                </div>
                <div style={styles.formGroup}><label style={styles.modalLabelStyle}>Duration (Hours)</label><input type="number" placeholder="e.g. 5" style={styles.modalInput} /></div>
                <div style={styles.formGroup}>
                  <label style={styles.modalLabelStyle}>Purpose</label>
                  <select style={styles.modalInput}><option>Personal Use</option><option>Project Work</option><option>Emergency</option></select>
                </div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginTop: '5px' }}>Preferred Pickup Location</label>
                <div style={styles.radioGrid}>
                  {['Library', 'Hostel', 'Department Building', 'Flexible'].map(loc => (
                    <label key={loc} style={styles.radioItem}><input type="radio" name="loc" /> {loc}</label>
                  ))}
                </div>
                <button className="tap-btn" type="submit" style={styles.modalSubmitBtn}>Submit Rent Request</button>
              </form>
            </div>
          </div>
        )}

        {notification && <div style={styles.toast}><CheckCircle size={18} /> {notification}</div>}
      </div>
    );
  }

  // ====== MAIN MARKET PAGE ======
  return (
    <div className="market-wrapper" style={styles.marketWrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .market-wrapper, .market-wrapper * { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; box-sizing: border-box; }
        .tap-btn { transition: all 0.2s cubic-bezier(0.4,0,0.2,1) !important; cursor: pointer; }
        .tap-btn:active { transform: scale(0.95) !important; }
        @keyframes premiumFadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes shopTextPerfectUpwardAnimation { 0%{opacity:0;transform:translate(-50%,120px) scale(.9);filter:blur(10px);}100%{opacity:.88;transform:translate(-50%,0) scale(1);filter:blur(0);} }
        @keyframes floatCardUp { from{opacity:0;transform:translate(-50%,40px);}to{opacity:1;transform:translate(-50%,0);} }
        @keyframes cardFadeUp { from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);} }
        @keyframes spin { to{transform:rotate(360deg);} }
        .animated-hero{animation:premiumFadeIn 1.5s ease-out forwards;}
        .animated-shop-text{animation:shopTextPerfectUpwardAnimation 1.5s cubic-bezier(0.16,1,0.3,1) forwards;}
        .product-card-view{animation:cardFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both;}
        .card-hover{transition:all 0.4s cubic-bezier(0.16,1,0.3,1) !important;}
        .pill-hover{transition:all 0.25s ease !important;}
        .pill-hover:hover{background:linear-gradient(135deg,#f1f5f9,#e8edff) !important;transform:translateY(-2px) !important;box-shadow:0 6px 16px rgba(0,0,0,0.08) !important;color:#0F172A !important;}
        .pill-hover-active:hover{transform:translateY(-2px) !important;}
        .wishlist-btn{transition:all 0.25s ease !important;background:rgba(255,255,255,0.9) !important;}
        .wishlist-btn:hover{background:#fff !important;transform:scale(1.12) !important;}
        .action-rent-btn{transition:all 0.25s ease !important;}
        .action-rent-btn:hover{background:linear-gradient(135deg,${ORANGE},${ORANGE2}) !important;transform:translateY(-2px) !important;box-shadow:0 8px 20px rgba(255,107,53,0.35) !important;}
        .action-info-btn{transition:all 0.25s ease !important;}
        .action-info-btn:hover{border-color:${ORANGE} !important;color:${ORANGE} !important;transform:translateY(-2px) !important;}
        .cta-join-btn{transition:all 0.3s ease !important;}
        .cta-join-btn:hover{transform:translateY(-2px) !important;box-shadow:0 12px 28px rgba(255,107,53,0.4) !important;}
        .social-chip{transition:all 0.2s ease !important;}
        .social-chip:hover{border-color:${ORANGE} !important;color:${ORANGE} !important;}
        .footer-link{transition:color 0.2s ease !important;}
        .footer-link:hover{color:${ORANGE} !important;}
      `}</style>

      {notification && <div style={styles.toast}><CheckCircle size={18} /> {notification}</div>}

      {/* HERO */}
      <section style={styles.premiumHero}>
        <div style={styles.heroBgImageWrapper}>
          <img src="/market_background.png" alt="Campus Background" style={styles.premiumHeroBgImage} />
          <div style={styles.premiumHeroOverlay}></div>
        </div>
        <div style={styles.shopTextWrapper}>
          <div className="animated-shop-text" style={styles.massiveShopText}> Shop </div>
        </div>
        <div style={styles.floatingSearchCard}>
          <p style={styles.floatingCardLabel}>FIND WHAT YOU NEED, FAST</p>
          <div style={styles.searchInnerRow}>
            <div style={styles.searchInputContainer}>
              <Search size={18} color="#94a3b8" style={{ minWidth: '18px' }} />
              <input type="text" placeholder="Search items, categories, or models..." style={styles.premiumSearchInput} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div style={styles.dropdownContainer}>
              <select style={styles.premiumCategoryDropdown} value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)}>
                {categories.map(cat => <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>)}
              </select>
            </div>
            <button className="tap-btn" style={styles.premiumSearchSubmitBtn}> Search </button>
          </div>
        </div>
      </section>

      {/* CATEGORY PILLS */}
      <div style={styles.pillsContainer}>
        <div style={styles.pillsScrollRow}>
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button key={cat} className={isActive ? "tap-btn pill-hover-active" : "tap-btn pill-hover"} style={isActive ? styles.premiumPillActive : styles.premiumPillInactive} onClick={() => setActiveCategory(cat)}>
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION TITLE */}
      <div style={styles.marketMainTitleBlock}>
        <h2 style={styles.sectionHeadingText}>Available Now</h2>
        <p style={styles.sectionSubtextText}>Verified items from students near you · {items.length} listings</p>
      </div>

      {/* LOADING */}
      {isLoadingBackend && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Loader2 size={20} style={{ animation: 'spin 1s linear infinite', color: ORANGE }} /> Loading items...
        </div>
      )}

      {/* PRODUCT GRID */}
      <div style={styles.premiumGrid}>
        {items.map((item, index) => {
          const isWishlisted = !!wishlist[item.id];
          const isHovered = hoveredCard === item.id;
          return (
            <div key={item.id} className="card-hover product-card-view" style={{ ...styles.premiumProductCard, animationDelay: `${index * 0.05}s`, transform: isHovered ? 'translateY(-10px)' : 'translateY(0)', boxShadow: isHovered ? '0 28px 56px rgba(15,23,42,0.12)' : '0 4px 16px rgba(15,23,42,0.04)' }} onMouseEnter={() => setHoveredCard(item.id)} onMouseLeave={() => setHoveredCard(null)}>
              <div style={styles.premiumCardImageWrapper}>
                <img src={item.image} alt={item.name} style={{ ...styles.premiumCardImage, transform: isHovered ? 'scale(1.07)' : 'scale(1)' }} onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x300?text=No+Item+Image"; }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 45%, rgba(15,23,42,0.55) 100%)', opacity: isHovered ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: 'none' }} />
                <span style={styles.premiumCardCategoryTag}>{item.category}</span>
                {item.price === 'Free' && <span style={styles.freeBadge}>FREE</span>}
                <button className="wishlist-btn" style={{ ...styles.premiumCardWishlistButton, background: isWishlisted ? `linear-gradient(135deg, ${ORANGE}, ${ORANGE2})` : 'rgba(255,255,255,0.92)' }} onClick={(e) => { e.stopPropagation(); toggleWishlist(item.id); }} title="Add to wishlist">
                  <Star size={15} fill={isWishlisted ? '#fff' : 'none'} color={isWishlisted ? '#fff' : '#64748b'} />
                </button>
              </div>
              <div style={styles.premiumCardBodyDetails}>
                <div style={styles.premiumCardTopRow}>
                  <h3 style={styles.premiumCardTitleText} title={item.name}>{item.name}</h3>
                  <div style={styles.premiumCardRatingBadge}>
                    <Star size={13} fill="#FFD700" color="#FFD700" />
                    <span style={styles.premiumCardRatingText}>{item.rating}</span>
                  </div>
                </div>
                <div style={styles.premiumCardMetadataBlock}>
                  <div style={styles.premiumMetaItem}><span style={styles.metaLabelText}>Owner:</span><span style={styles.metaValueText}>{item.owner}</span></div>
                  <div style={styles.premiumMetaItem}><span style={styles.metaLabelText}>Type:</span><span style={styles.metaValueText}>{item.type} · {item.age}</span></div>
                  {item.location && <div style={styles.premiumMetaItem}><span style={styles.metaLabelText}>Location:</span><span style={{ ...styles.metaValueText, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{item.location}</span></div>}
                </div>
                <div style={styles.premiumCardFooterRow}>
                  <div style={styles.premiumCardPriceContainer}>
                    <span style={styles.priceHeadingLabel}>RENTAL PRICE</span>
                    <span style={{ ...styles.priceHeadingValueText, color: item.price === 'Free' ? '#10b981' : ORANGE }}>{item.price}</span>
                  </div>
                  <div style={styles.premiumCardActionsWrapper}>
                    <button className="tap-btn action-info-btn" style={styles.premiumInfoActionButton} onClick={() => setInfoItem(item)}>Info</button>
                    <button className="tap-btn action-rent-btn" style={styles.premiumRentActionButton} onClick={() => setSelectedItem(item)}>Rent Now</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA SECTION */}
      <section style={ctaStyles.section}>
        <div style={ctaStyles.container}>
          <div style={ctaStyles.glow1} />
          <div style={ctaStyles.glow2} />
          <div style={ctaStyles.inner}>
            <div style={ctaStyles.leftBlock}>
              <span style={ctaStyles.tag}>🎓 Join the Community</span>
              <h2 style={ctaStyles.heading}>Ready to Find Your Next<br /><span style={ctaStyles.headingAccent}>Campus Essential?</span></h2>
              <p style={ctaStyles.subtext}>Get notified when new items go live near you. Join 2,000+ students already renting smarter.</p>
              <div style={ctaStyles.statsRow}>
                {[['500+', 'Items Listed'], ['2000+', 'Students'], ['₹80K+', 'Saved']].map(([num, label]) => (
                  <div key={label} style={ctaStyles.statItem}>
                    <span style={ctaStyles.statNum}>{num}</span>
                    <span style={ctaStyles.statLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={ctaStyles.rightBlock}>
              <div style={ctaStyles.formCard}>
                <h3 style={ctaStyles.formTitle}>Get Early Access</h3>
                <p style={ctaStyles.formSub}>Be first to know when items drop near you.</p>
                <div style={ctaStyles.inputWrapper}>
                  <input type="email" placeholder="your@college.edu" value={email} onChange={e => setEmail(e.target.value)} style={ctaStyles.emailInput} onFocus={e => e.target.style.borderColor = ORANGE} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
                  <button className="tap-btn cta-join-btn" style={ctaStyles.joinBtn}>Join Community →</button>
                </div>
                <p style={ctaStyles.privacyNote}>No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={footerStyles.footer}>
        <div style={footerStyles.inner}>
          <div style={footerStyles.brand}>
            <span style={footerStyles.logo}>Campus<span style={{ color: ORANGE }}>Rent</span></span>
            <p style={footerStyles.tagline}>Short-term rentals for exams, projects, labs, and daily campus life.</p>
            <div style={footerStyles.socialRow}>
              {['Twitter', 'Instagram', 'LinkedIn'].map(s => (
                <span key={s} className="social-chip" style={footerStyles.socialChip}>{s}</span>
              ))}
            </div>
          </div>
          <div style={footerStyles.linksGrid}>
            {[
              { title: 'About', links: ['Our Story', 'How it Works', 'Careers'] },
              { title: 'Support', links: ['Help Center', 'Contact Us', 'Safety'] },
              { title: 'Resources', links: ['Blog', 'Privacy', 'Terms', 'FAQ'] },
            ].map(col => (
              <div key={col.title}>
                <p style={footerStyles.colTitle}>{col.title}</p>
                {col.links.map(l => <p key={l} className="footer-link" style={footerStyles.colLink}>{l}</p>)}
              </div>
            ))}
          </div>
        </div>
      </footer>

      {/* RENT MODAL */}
      {selectedItem && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Rent Request</h2>
                <p style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>Fill in the details for your rental.</p>
              </div>
              <X onClick={() => setSelectedItem(null)} style={{ cursor: 'pointer', opacity: 0.9 }} />
            </div>
            <form style={styles.modalForm} onSubmit={handleRentSubmit}>
              <div style={styles.itemSummary}>
                <div><small style={{ color: '#94a3b8', fontWeight: '600' }}>ITEM</small><br /><strong style={{ color: '#1e293b' }}>{selectedItem.name}</strong></div>
                <div><small style={{ color: '#94a3b8', fontWeight: '600' }}>CATEGORY</small><br /><strong style={{ color: '#1e293b' }}>{selectedItem.category}</strong></div>
                <div><small style={{ color: '#94a3b8', fontWeight: '600' }}>OWNER</small><br /><strong style={{ color: '#1e293b' }}>{selectedItem.owner}</strong></div>
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}><label style={styles.modalLabelStyle}>Start Date</label><input type="date" required style={styles.modalInput} /></div>
                <div style={styles.formGroup}><label style={styles.modalLabelStyle}>End Date</label><input type="date" required style={styles.modalInput} /></div>
              </div>
              <div style={styles.formGroup}><label style={styles.modalLabelStyle}>Duration (Hours)</label><input type="number" placeholder="e.g. 5" style={styles.modalInput} /></div>
              <div style={styles.formGroup}>
                <label style={styles.modalLabelStyle}>Purpose</label>
                <select style={styles.modalInput}><option>Personal Use</option><option>Project Work</option><option>Emergency</option></select>
              </div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginTop: '5px' }}>Preferred Pickup Location</label>
              <div style={styles.radioGrid}>
                {['Library', 'Hostel', 'Department Building', 'Flexible'].map(loc => (
                  <label key={loc} style={styles.radioItem}><input type="radio" name="loc" /> {loc}</label>
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

// ====== INFO PAGE STYLES ======
const infoStyles = {
  page: { backgroundColor: '#fff', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", paddingBottom: '100px' },
  breadcrumb: { padding: '18px 6% 18px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #F1F5F9', backgroundColor: '#fff' },
  breadcrumbLink: { fontSize: '13px', color: '#64748b', fontWeight: '500', cursor: 'pointer', transition: 'color 0.2s ease' },
  breadcrumbSep: { fontSize: '13px', color: '#cbd5e1' },
  breadcrumbCurrent: { fontSize: '13px', color: DARK, fontWeight: '600' },

  productSection: { display: 'flex', gap: '60px', padding: '20px 6%', flexWrap: 'wrap', maxWidth: '1400px', margin: '0 auto' },

  galleryCol: { flex: '0 0 420px', minWidth: '300px' },
  mainImgWrapper: { borderRadius: '16px', overflow: 'hidden', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', marginBottom: '16px', height: '420px' },
  mainImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  thumbRow: { display: 'flex', gap: '12px' },
  thumb: { width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #E2E8F0', cursor: 'pointer', flexShrink: 0, transition: 'border-color 0.2s ease, box-shadow 0.2s ease' },
  thumbImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },

  detailCol: { flex: 1, minWidth: '300px' },
  catLabel: { fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' },
  productTitle: { fontSize: '32px', fontWeight: '900', color: DARK, margin: '10px 0 0', lineHeight: '1.2', letterSpacing: '-0.02em' },
  productSubtitle: { color: ORANGE, background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },

  ratingRow: { display: 'flex', alignItems: 'center', gap: '10px', margin: '16px 0' },
  starsRow: { display: 'flex', gap: '2px' },
  ratingNum: { fontSize: '15px', fontWeight: '800', color: DARK },
  ratingLink: { fontSize: '13px', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' },

  priceBlock: { display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0 20px', flexWrap: 'wrap' },
  originalPrice: { fontSize: '18px', color: '#94a3b8', textDecoration: 'line-through', fontWeight: '500' },
  currentPrice: { fontSize: '32px', fontWeight: '900', color: DARK },
  saveBadge: { fontSize: '12px', fontWeight: '800', backgroundColor: '#fef3c7', color: '#92400e', padding: '4px 12px', borderRadius: '6px', letterSpacing: '0.04em' },

  productDesc: { fontSize: '15px', color: '#475569', lineHeight: '1.7', margin: '0 0 24px', maxWidth: '520px' },

  trustRow: { display: 'flex', gap: '24px', margin: '0 0 28px', padding: '20px 0', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9' },
  trustItem: { display: 'flex', alignItems: 'center', gap: '10px' },
  trustText: { fontSize: '12px', color: '#64748b', fontWeight: '600', lineHeight: '1.4' },

  rentMainBtn: { width: '100%', padding: '18px', borderRadius: '14px', border: 'none', fontSize: '16px', fontWeight: '800', color: '#fff', letterSpacing: '0.01em', marginBottom: '12px', display: 'block' },
  requestBtn: { width: '100%', padding: '18px', borderRadius: '14px', border: 'none', backgroundColor: DARK, color: '#fff', fontSize: '16px', fontWeight: '700', marginBottom: '28px', display: 'block', cursor: 'pointer' },

  ownerBlock: { display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', backgroundColor: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0' },
  ownerAvatar: { width: '44px', height: '44px', borderRadius: '50%', background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE2})`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', flexShrink: 0 },
  ownerName: { fontSize: '15px', fontWeight: '700', color: DARK },
  ownerMeta: { fontSize: '12px', color: '#94a3b8', marginTop: '2px' },

  sectionBlock: { padding: '48px 6%', maxWidth: '1400px', margin: '0 auto', borderTop: '1px solid #F1F5F9' },
  sectionTitle: { fontSize: '26px', fontWeight: '800', color: DARK, margin: '0 0 28px', letterSpacing: '-0.02em' },

  reviewsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px', marginBottom: '36px' },
  reviewCard: { backgroundColor: '#F8FAFC', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0' },
  reviewTop: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' },
  reviewAvatar: { width: '38px', height: '38px', borderRadius: '50%', backgroundColor: DARK, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', flexShrink: 0 },
  reviewComment: { fontSize: '14px', color: '#475569', lineHeight: '1.6', margin: '0 0 10px' },
  reviewMeta: { fontSize: '11px', color: '#94a3b8', fontWeight: '600' },

  writeReview: { backgroundColor: '#F8FAFC', borderRadius: '16px', padding: '28px', border: '1px solid #E2E8F0' },
  writeReviewTitle: { fontSize: '18px', fontWeight: '700', color: DARK, margin: '0 0 16px' },
  starPicker: { display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' },
  reviewInput: { width: '100%', border: '1.5px solid #E2E8F0', borderRadius: '12px', padding: '14px 16px', fontSize: '14px', color: DARK, outline: 'none', resize: 'none', minHeight: '100px', backgroundColor: '#fff', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: '16px' },
  postReviewBtn: { backgroundColor: DARK, color: '#fff', padding: '12px 28px', borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' },

  faqList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  faqItem: { border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' },
  faqHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', cursor: 'pointer', backgroundColor: '#fff', transition: 'background 0.2s ease' },
  faqQuestion: { fontSize: '15px', fontWeight: '600', color: DARK },
  faqAnswer: { padding: '0 22px 18px', fontSize: '14px', color: '#475569', lineHeight: '1.7', backgroundColor: '#fff' },

  relatedHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  relatedNav: { display: 'flex', gap: '8px' },
  navBtn: { width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #E2E8F0', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  relatedGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' },
  relatedCard: { borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E8F0', backgroundColor: '#fff', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  relatedImgBox: { height: '160px', backgroundColor: '#F8FAFC', overflow: 'hidden' },
  relatedImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  relatedBody: { padding: '14px 16px' },
  relatedName: { fontSize: '14px', fontWeight: '700', color: DARK, marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  relatedPrice: { fontSize: '14px', fontWeight: '800', color: ORANGE },

  stickyBar: { position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTop: '1px solid #E2E8F0', padding: '14px 6%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, boxShadow: '0 -8px 24px rgba(0,0,0,0.06)' },
  stickyLeft: { display: 'flex', alignItems: 'center', gap: '14px' },
  stickyAvatar: { width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800', color: DARK, flexShrink: 0 },
  stickyName: { fontSize: '15px', fontWeight: '700', color: DARK, maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  stickyPrice: { fontSize: '13px', color: ORANGE, fontWeight: '700', marginTop: '2px' },
  stickyBtn: { padding: '13px 32px', borderRadius: '12px', border: 'none', color: '#fff', fontWeight: '800', fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s ease', flexShrink: 0 },
};

// ====== MAIN STYLES ======
const styles = {
  marketWrapper: { backgroundColor: '#FFFFFF', minHeight: '100vh', paddingBottom: '0px', overflowX: 'hidden' },
  premiumHero: { position: 'relative', width: '100%', height: '550px', backgroundColor: '#0F172A', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'visible', marginBottom: '110px', zIndex: 1 },
  heroBgImageWrapper: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', zIndex: 1 },
  premiumHeroBgImage: { width: '100%', height: '100%', objectFit: 'cover', opacity: 0.94 },
  premiumHeroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.12)', zIndex: 2 },
  shopTextWrapper: { position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' },
  massiveShopText: { position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, 0)', fontSize: 'min(55vw, 350px)', fontWeight: '900', color: '#FFFFFF', margin: 0, letterSpacing: '-0.04em', opacity: 0.88, zIndex: 3, pointerEvents: 'none', textAlign: 'center', width: '100%' },
  floatingSearchCard: { position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '860px', backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '24px 32px 28px', boxShadow: '0 25px 50px rgba(15,23,42,0.14)', zIndex: 5, border: '1px solid rgba(226,232,240,0.8)' },
  floatingCardLabel: { fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 14px 2px', textAlign: 'left' },
  searchInnerRow: { display: 'flex', alignItems: 'center', gap: '16px', width: '100%', flexWrap: 'wrap' },
  searchInputContainer: { flex: 2, display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#F8FAFC', borderRadius: '30px', padding: '12px 20px', border: '1px solid #E2E8F0', minWidth: '240px' },
  premiumSearchInput: { border: 'none', outline: 'none', backgroundColor: 'transparent', width: '100%', fontSize: '14px', color: '#0F172A', fontWeight: '500' },
  dropdownContainer: { flex: 1, minWidth: '160px', backgroundColor: '#F8FAFC', borderRadius: '30px', border: '1px solid #E2E8F0', padding: '12px 16px' },
  premiumCategoryDropdown: { width: '100%', border: 'none', outline: 'none', backgroundColor: 'transparent', fontSize: '14px', color: '#334155', fontWeight: '600', cursor: 'pointer' },
  premiumSearchSubmitBtn: { padding: '12px 32px', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', borderRadius: '30px', fontWeight: '700', fontSize: '14px', letterSpacing: '0.02em', boxShadow: '0 4px 12px rgba(15,23,42,0.15)', minWidth: '110px' },
  pillsContainer: { padding: '0 8%', maxWidth: '1400px', margin: '0 auto 48px', display: 'flex', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  pillsScrollRow: { display: 'flex', gap: '10px', overflowX: 'auto', padding: '6px 4px', scrollbarWidth: 'none', flexWrap: 'wrap', justifyContent: 'center' },
  premiumPillInactive: { padding: '10px 22px', borderRadius: '30px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', cursor: 'pointer' },
  premiumPillActive: { padding: '10px 22px', borderRadius: '30px', border: 'none', background: `linear-gradient(135deg, #ff6b35, #f7931e)`, color: '#FFFFFF', fontSize: '13px', fontWeight: '700', whiteSpace: 'nowrap', boxShadow: '0 6px 20px rgba(255,107,53,0.3)', cursor: 'pointer', transform: 'translateY(-2px)' },
  marketMainTitleBlock: { padding: '0 8%', maxWidth: '1400px', margin: '0 auto 32px', textAlign: 'left' },
  sectionHeadingText: { fontSize: '28px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px', letterSpacing: '-0.02em' },
  sectionSubtextText: { fontSize: '14px', color: '#64748B', margin: 0, fontWeight: '500' },
  premiumGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '28px', padding: '0 8%', maxWidth: '1400px', margin: '0 auto 80px' },
  premiumProductCard: { backgroundColor: '#FFFFFF', borderRadius: '22px', overflow: 'hidden', border: '1px solid #F0F0F2', display: 'flex', flexDirection: 'column', position: 'relative', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' },
  premiumCardImageWrapper: { position: 'relative', height: '220px', width: '100%', backgroundColor: '#F8FAFC', overflow: 'hidden' },
  premiumCardImage: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)', display: 'block' },
  premiumCardCategoryTag: { position: 'absolute', top: '14px', left: '14px', backgroundColor: 'rgba(15,23,42,0.82)', backdropFilter: 'blur(4px)', color: '#FFFFFF', fontSize: '11px', fontWeight: '700', padding: '5px 12px', borderRadius: '30px', letterSpacing: '0.02em' },
  freeBadge: { position: 'absolute', bottom: '14px', left: '14px', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', fontSize: '10px', fontWeight: '800', padding: '4px 10px', borderRadius: '12px', letterSpacing: '0.08em' },
  premiumCardWishlistButton: { position: 'absolute', top: '14px', right: '14px', width: '34px', height: '34px', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transition: 'all 0.25s ease' },
  premiumCardBodyDetails: { padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 },
  premiumCardTopRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' },
  premiumCardTitleText: { fontSize: '16px', fontWeight: '700', color: '#0F172A', margin: 0, lineHeight: '1.4', textAlign: 'left', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' },
  premiumCardRatingBadge: { display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#FFFBEB', padding: '4px 8px', borderRadius: '8px', border: '1px solid #FEF3C7', flexShrink: 0 },
  premiumCardRatingText: { fontSize: '12px', fontWeight: '700', color: '#D97706' },
  premiumCardMetadataBlock: { display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '20px', borderBottom: '1px dashed #E2E8F0', paddingBottom: '16px', textAlign: 'left' },
  premiumMetaItem: { display: 'flex', fontSize: '13px', lineHeight: '1.4', gap: '4px' },
  metaLabelText: { color: '#94a3b8', width: '60px', fontWeight: '500', flexShrink: 0 },
  metaValueText: { color: '#475569', fontWeight: '600' },
  premiumCardFooterRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', gap: '12px' },
  premiumCardPriceContainer: { display: 'flex', flexDirection: 'column', textAlign: 'left' },
  priceHeadingLabel: { fontSize: '9px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.06em' },
  priceHeadingValueText: { fontSize: '20px', fontWeight: '800', marginTop: '2px' },
  premiumCardActionsWrapper: { display: 'flex', gap: '8px', alignItems: 'center' },
  premiumInfoActionButton: { padding: '9px 16px', backgroundColor: '#FFFFFF', border: '1.5px solid #E2E8F0', color: '#475569', borderRadius: '12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' },
  premiumRentActionButton: { padding: '9px 18px', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: '700', boxShadow: '0 4px 12px rgba(15,23,42,0.18)', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 },
  modal: { backgroundColor: '#fff', borderRadius: '24px', width: '92%', maxWidth: '480px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', border: '1px solid #E2E8F0' },
  modalHeader: { backgroundColor: '#0F172A', color: '#fff', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  modalForm: { padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' },
  itemSummary: { backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', border: '1px solid #E2E8F0', textAlign: 'left' },
  formRow: { display: 'flex', gap: '12px' },
  formGroup: { flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' },
  modalLabelStyle: { fontSize: '13px', fontWeight: '600', color: '#475569' },
  modalInput: { padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '14px', color: '#0F172A', backgroundColor: '#F8FAFC' },
  radioGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  radioItem: { fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: '10px', cursor: 'pointer', fontWeight: '500', color: '#334155', backgroundColor: '#FFFFFF' },
  modalSubmitBtn: { padding: '14px', backgroundColor: '#0F172A', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '14px', marginTop: '12px', boxShadow: '0 4px 12px rgba(15,23,42,0.15)', cursor: 'pointer' },
  toast: { position: 'fixed', bottom: '24px', right: '24px', backgroundColor: '#0F172A', color: '#fff', padding: '16px 28px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.15)', zIndex: 3000, fontSize: '14px', fontWeight: '600' }
};

const ctaStyles = {
  section: { padding: '0 8% 80px', maxWidth: '1400px', margin: '0 auto' },
  container: { background: 'linear-gradient(135deg, #0F172A 0%, #0f0f1a 100%)', borderRadius: '36px', padding: '64px 60px', position: 'relative', overflow: 'hidden' },
  glow1: { position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.18) 0%, transparent 70%)', top: '-150px', right: '-100px', pointerEvents: 'none' },
  glow2: { position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,147,30,0.12) 0%, transparent 70%)', bottom: '-80px', left: '10%', pointerEvents: 'none' },
  inner: { position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' },
  leftBlock: { flex: 1, minWidth: '280px' },
  tag: { display: 'inline-block', fontSize: '12px', fontWeight: '700', color: '#ff6b35', background: 'rgba(255,107,53,0.12)', border: '1px solid rgba(255,107,53,0.25)', padding: '6px 16px', borderRadius: '30px', marginBottom: '20px', letterSpacing: '0.04em' },
  heading: { fontSize: '34px', fontWeight: '800', color: '#fff', lineHeight: '1.2', margin: '0 0 14px', letterSpacing: '-0.5px' },
  headingAccent: { background: 'linear-gradient(135deg, #ff6b35, #f7931e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
  subtext: { fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.6', maxWidth: '400px', margin: '0 0 32px' },
  statsRow: { display: 'flex', gap: '28px' },
  statItem: { display: 'flex', flexDirection: 'column', gap: '2px' },
  statNum: { fontSize: '22px', fontWeight: '800', color: '#fff' },
  statLabel: { fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontWeight: '500' },
  rightBlock: { flex: '0 0 340px', minWidth: '280px' },
  formCard: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '24px', padding: '32px', backdropFilter: 'blur(10px)' },
  formTitle: { fontSize: '20px', fontWeight: '700', color: '#fff', margin: '0 0 8px' },
  formSub: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: '0 0 24px' },
  inputWrapper: { display: 'flex', flexDirection: 'column', gap: '12px' },
  emailInput: { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '14px', padding: '14px 18px', fontSize: '14px', color: '#fff', outline: 'none', transition: 'border-color 0.2s ease', width: '100%', boxSizing: 'border-box' },
  joinBtn: { background: 'linear-gradient(135deg, #ff6b35, #f7931e)', color: '#fff', border: 'none', borderRadius: '14px', padding: '14px 24px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: '0 6px 18px rgba(255,107,53,0.25)' },
  privacyNote: { fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: '14px 0 0', textAlign: 'center' }
};

const footerStyles = {
  footer: { borderTop: '1px solid #EFEFEF', padding: '0px 8% 30px', background: '#fff' },
  inner: { maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap', paddingBottom: '40px', borderBottom: '1px solid #F0F0F2', marginBottom: '28px' },
  brand: { maxWidth: '260px' },
  logo: { fontSize: '20px', fontWeight: '800', color: '#0F172A', display: 'block', marginBottom: '12px' },
  tagline: { fontSize: '13px', color: '#A1A3A8', lineHeight: '1.6', margin: '0 0 20px' },
  socialRow: { display: 'flex', gap: '8px' },
  socialChip: { fontSize: '12px', fontWeight: '600', color: '#4B4D52', padding: '6px 14px', borderRadius: '20px', border: '1px solid #ECECEE', cursor: 'pointer' },
  linksGrid: { display: 'flex', gap: '48px', flexWrap: 'wrap' },
  colTitle: { fontSize: '14px', fontWeight: '700', color: '#0F172A', margin: '0 0 14px' },
  colLink: { fontSize: '13px', color: '#A1A3A8', margin: '0 0 10px', cursor: 'pointer' },
};

export default RentalMarket;