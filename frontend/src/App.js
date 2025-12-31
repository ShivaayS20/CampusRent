import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RentalMarket from "./pages/RentalMarket";
import AddItem from "./pages/AddItem";
import MyListings from "./pages/MyListings";
import RentRequests from "./pages/RentRequests";
import Profile from "./pages/Profile.js";
import ContactUs from "./pages/contactUs.js";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Landing page */}
          <Route index element={<LandingPage />} />

          {/* Auth pages */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="market" element={<RentalMarket />} />
          <Route path="add-item" element={<AddItem />} />
          <Route path="my-listings" element={<MyListings />} />
          <Route path="rent-request" element={<RentRequests/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="contactus" element={<ContactUs />} />
         



        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
