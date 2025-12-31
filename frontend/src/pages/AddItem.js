import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Hooks for data and navigation
import { CheckCircle, Upload, ChevronRight, Package, MapPin, DollarSign, Image as ImageIcon, Loader2, ArrowLeft } from 'lucide-react';

const AddItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editData = location.state?.editData; // Check if we are in Edit Mode

  const [currentStep, setCurrentStep] = useState(1);
  const [notification, setNotification] = useState("");
  const [imagePreview, setImagePreview] = useState(editData?.image || null); // Pre-fill image if editing
  const [isLoading, setIsLoading] = useState(false);
  
  // Pre-fill form if editData exists
  const [formData, setFormData] = useState({
    itemName: editData?.name || '',
    category: editData?.category || 'Tech & Gadgets',
    type: editData?.type || '',
    model: editData?.model || '',
    age: editData?.age || '',
    isPaid: editData?.price?.includes('Paid') ? 'Paid' : 'Free',
    price: editData?.price?.replace(/\D/g, '') || '', // Extract numbers only if editing
    duration: editData?.duration || '',
    location: editData?.location || '',
    timing: editData?.timing || '',
    image: editData?.image || null
  });

  const categories = ["Tech & Gadgets", "Lab Equipment", "Textbooks", "Sports & Fitness", "Clothing", "Miscellaneous"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      // Create a temporary URL so the image can be seen immediately
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const isFormComplete = () => {
    return (
      formData.itemName !== '' && 
      formData.type !== '' && 
      formData.model !== '' && 
      formData.age !== '' && 
      formData.location !== '' && 
      formData.image !== null &&
      (formData.isPaid === 'Free' || formData.price !== '')
    );
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (!isFormComplete()) return;
    
    setIsLoading(true);

    // Simulate network delay for loading effect
    setTimeout(() => {
      setIsLoading(false);
      setNotification(editData ? "Successfully Updated!" : "Successfully Posted!");
      
      // We pass the data back. IMPORTANT: We include imagePreview so the next page can show the image
      setTimeout(() => {
        if (editData) {
          navigate('/my-listings', { 
            state: { updatedItem: { ...formData, id: editData.id, imagePreview } } 
          });
        } else {
          navigate('/my-listings', { 
            state: { newItem: { ...formData, imagePreview } } 
          });
        }
      }, 1500);
    }, 1500);
  };

  const steps = [
    { id: 1, label: "Basic Details", icon: <Package size={18} /> },
    { id: 2, label: "Rental Info", icon: <DollarSign size={18} /> },
    { id: 3, label: "Handover Info", icon: <MapPin size={18} /> },
    { id: 4, label: "Upload Photo", icon: <ImageIcon size={18} /> }
  ];

  return (
    <div style={styles.pageContainer}>
      {notification && (
        <div style={styles.toast}>
          <CheckCircle size={20} /> {notification}
        </div>
      )}

      <div style={styles.formCard}>
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>{editData ? "Edit Your Item" : "Post an Item"}</h2>
          <p style={styles.sidebarSubTitle}>
            {editData ? "Update the details of your shared item below" : "Help a fellow student by putting your unused items on rent"}
          </p>
          
          <div style={styles.stepList}>
            {steps.map((step) => (
              <div key={step.id} style={styles.stepItem}>
                <div style={{
                  ...styles.stepIcon,
                  backgroundColor: currentStep >= step.id ? '#4f46e5' : '#e2e8f0',
                  color: currentStep >= step.id ? '#fff' : '#64748b'
                }}>
                  {currentStep > step.id ? <CheckCircle size={16} /> : step.icon}
                </div>
                <span style={{
                  ...styles.stepLabel,
                  color: currentStep >= step.id ? '#1e293b' : '#94a3b8',
                  fontWeight: currentStep === step.id ? '600' : '400'
                }}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          
          {editData && (
             <button onClick={() => navigate('/my-listings')} style={styles.cancelBtn}>
               <ArrowLeft size={14}/> Cancel Editing
             </button>
          )}
        </div>

        <div style={styles.formContent}>
          <div style={styles.formInner}>
            <form onSubmit={handlePost} style={styles.form}>
              
              {currentStep === 1 && (
                <div style={styles.section}>
                  <h3 style={styles.sectionHeading}>Basic Item Details</h3>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Item Name</label>
                    <input name="itemName" value={formData.itemName} onChange={handleInputChange} type="text" placeholder="e.g. Scientific Calculator" style={styles.input} />
                  </div>
                  <div style={styles.row}>
                    <div style={{flex: 1}}>
                      <label style={styles.label}>Category</label>
                      <select name="category" value={formData.category} onChange={handleInputChange} style={styles.input}>
                        {categories.map(cat => <option key={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div style={{flex: 1}}>
                      <label style={styles.label}>Type</label>
                      <input name="type" value={formData.type} onChange={handleInputChange} type="text" placeholder="e.g. Electronics" style={styles.input} />
                    </div>
                  </div>
                  <div style={styles.row}>
                    <div style={{flex: 1}}>
                      <label style={styles.label}>Model</label>
                      <input name="model" value={formData.model} onChange={handleInputChange} type="text" placeholder="e.g. TI-84 Plus" style={styles.input} />
                    </div>
                    <div style={{flex: 1}}>
                      <label style={styles.label}>Condition / Age</label>
                      <input name="age" value={formData.age} onChange={handleInputChange} type="text" placeholder="e.g. 1 year old" style={styles.input} />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div style={styles.section}>
                  <h3 style={styles.sectionHeading}>Rental Info</h3>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Rental Type</label>
                    <div style={styles.radioGroup}>
                      <label style={styles.radioOption}>
                        <input type="radio" name="isPaid" value="Free" checked={formData.isPaid === 'Free'} onChange={handleInputChange} /> Free
                      </label>
                      <label style={styles.radioOption}>
                        <input type="radio" name="isPaid" value="Paid" checked={formData.isPaid === 'Paid'} onChange={handleInputChange} /> Paid
                      </label>
                    </div>
                  </div>
                  <div style={styles.row}>
                    <div style={{flex: 1}}>
                      <label style={styles.label}>Price (per day)</label>
                      <input name="price" value={formData.price} onChange={handleInputChange} type="number" placeholder="₹ 0.00" style={styles.input} disabled={formData.isPaid === 'Free'} />
                    </div>
                    <div style={{flex: 1}}>
                      <label style={styles.label}>Max Duration</label>
                      <input name="duration" value={formData.duration} onChange={handleInputChange} type="text" placeholder="e.g. 7 days" style={styles.input} />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div style={styles.section}>
                  <h3 style={styles.sectionHeading}>Handover Info</h3>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Preferred Pickup Location</label>
                    <input name="location" value={formData.location} onChange={handleInputChange} type="text" placeholder="e.g. Central Library Entrance" style={styles.input} />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Available Days/Timing</label>
                    <input name="timing" value={formData.timing} onChange={handleInputChange} type="text" placeholder="e.g. Mon-Fri, 4 PM to 6 PM" style={styles.input} />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div style={styles.section}>
                  <h3 style={styles.sectionHeading}>Upload Photo</h3>
                  <div style={styles.uploadBox}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" style={styles.previewImage} />
                    ) : (
                      <>
                        <Upload size={40} color="#94a3b8" />
                        <p style={{marginTop: '10px', color: '#64748b'}}>Click to upload item image</p>
                      </>
                    )}
                    <input type="file" style={styles.fileInput} onChange={handleImageChange} accept="image/*" />
                  </div>
                  {imagePreview && (
                    <button type="button" onClick={() => {setImagePreview(null); setFormData({...formData, image: null})}} style={styles.removeBtn}>
                      Remove and change image
                    </button>
                  )}
                </div>
              )}

              <div style={styles.buttonContainer}>
                {currentStep > 1 && (
                  <button type="button" onClick={() => setCurrentStep(currentStep - 1)} style={styles.backButton}>
                    Back
                  </button>
                )}
                <div style={{marginLeft: 'auto'}}>
                  {currentStep < 4 ? (
                    <button type="button" onClick={() => setCurrentStep(currentStep + 1)} style={styles.nextButton}>
                      Next Step <ChevronRight size={18} />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      style={{
                        ...styles.submitButton,
                        opacity: (isFormComplete() && !isLoading) ? 1 : 0.5,
                        cursor: (isFormComplete() && !isLoading) ? 'pointer' : 'not-allowed',
                      }}
                      disabled={!isFormComplete() || isLoading}
                    >
                      {isLoading ? (
                        <><Loader2 size={18} style={styles.spinner} /> {editData ? "Updating..." : "Posting..."}</>
                      ) : (
                        editData ? "Save Changes" : "Post Item"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: { minHeight: '100vh', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'Inter, sans-serif' },
  formCard: { display: 'flex', width: '900px', height: '550px', backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' },
  sidebar: { width: '320px', backgroundColor: '#f8fafc', padding: '40px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' },
  sidebarTitle: { fontSize: '22px', fontWeight: 'bold', color: '#4f46e5', marginBottom: '10px' },
  sidebarSubTitle: { fontSize: '13px', color: '#64748b', lineHeight: '1.5', marginBottom: '40px' },
  stepList: { display: 'flex', flexDirection: 'column', gap: '25px', flex: 1 },
  stepItem: { display: 'flex', alignItems: 'center', gap: '15px' },
  stepIcon: { width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  stepLabel: { fontSize: '14px' },
  cancelBtn: { display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#ef4444', fontSize: '13px', cursor: 'pointer', marginTop: 'auto', fontWeight: '600' },
  formContent: { flex: 1, padding: '40px 50px', position: 'relative', display: 'flex', flexDirection: 'column' },
  formInner: { height: '100%', display: 'flex', flexDirection: 'column' },
  form: { height: '100%', display: 'flex', flexDirection: 'column' },
  section: { flex: 1 },
  sectionHeading: { fontSize: '20px', marginBottom: '25px', color: '#1e293b' },
  inputGroup: { marginBottom: '15px' },
  label: { display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' },
  input: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px', boxSizing: 'border-box' },
  row: { display: 'flex', gap: '15px', marginBottom: '15px' },
  radioGroup: { display: 'flex', gap: '20px', padding: '5px 0' },
  radioOption: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' },
  uploadBox: { border: '2px dashed #e2e8f0', borderRadius: '12px', padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', height: '180px', overflow: 'hidden' },
  previewImage: { height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' },
  removeBtn: { marginTop: '8px', color: '#ef4444', background: 'none', border: 'none', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' },
  fileInput: { position: 'absolute', opacity: 0, inset: 0, cursor: 'pointer' },
  buttonContainer: { display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9' },
  nextButton: { backgroundColor: '#4f46e5', color: '#fff', padding: '10px 20px', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', cursor: 'pointer' },
  backButton: { backgroundColor: 'transparent', color: '#64748b', border: 'none', cursor: 'pointer', fontWeight: '600' },
  submitButton: { backgroundColor: '#4f46e5', color: '#fff', padding: '10px 25px', borderRadius: '8px', border: 'none', fontWeight: 'bold', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '10px' },
  toast: { position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#10b981', color: '#fff', padding: '15px 25px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', zIndex: 100 },
  spinner: { animation: 'spin 1s linear infinite' },
};

// CSS for spinner animation
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
  document.head.appendChild(styleSheet);
}

export default AddItem;