CampusRent:
Rent Smarter, Not Harder. CampusRent is a full-stack peer-to-peer rental platform designed specifically for the student community. It enables students to list, discover, and rent essential campus items—such as scientific calculators, lab equipment, and textbooks—directly from their peers, fostering a sustainable and cost-effective campus economy.

Core Features:
1. Secure Authentication & Profile Sync
    Google OAuth: Integrated with Firebase Google Authentication for a seamless, one-tap login experience.

    Identity Management: Automatically synchronizes user names and high-resolution profile pictures directly from Google to the personalized dashboard.

2. Interactive Student Dashboard
   Data Visualization: Real-time inventory analytics via Google Charts API, displaying item distribution across categories like Tech, Lab, and Clothing.

   Live Metrics: Instant tracking of listed items, active rent requests, and successful rentals to monitor user activity at a glance.

3. Rental Marketplace & Discovery
   Dynamic Search: Efficiently browse items by specific campus needs with real-time category filtering and search functionality.

   Detailed Info Pages: In-depth product views featuring item specifications, precise pickup locations, and student reviews updated for 2025/2026.

4. Smart Transaction Flow
   Request System: A dedicated flow for submitting rental requests, allowing users to specify duration, purpose, and meeting points.

   Real-time Feedback: The "Rent" button dynamically updates to "Rent Request Sent ✓" upon successful submission to provide instant confirmation.

   Scheduling: Integrated with Google Calendar to allow students to set handover reminders with a single click.


  Technical Stack:
  Frontend: React.js (Hooks, Router), Lucide-React Icons.
  
  Backend: Node.js & Express.js (RESTful API architecture).
  
  Database: Centralized data handling via db.js for persistent storage of listings and transactions.
  
  Authentication: Firebase Auth (Google OAuth 2.0).
  
  APIs: Google Charts API, Google Calendar Scheduling.
  
  
  Installation & Setup:
  Frontend
  Bash
  
  cd frontend
  npm install
  npm start
  Backend
  Bash
  
  cd backend
  npm install
  npm start
  
  Developer
  Team Bug Busters 
