// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Activities from "./pages/Activities";
import Apply from "./pages/Apply";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FAQs from "./pages/FAQs";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboards
import AdminDashboard from "./dashboards/Admin";
import PartnerDashboard from "./dashboards/Partner";
import TraineeDashboard from "./dashboards/Trainee";

// Auth
import PrivateRoute from "./components/PrivateRoute"; // now we use the separate component

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected dashboards with role-based access */}
        <Route
          path="/admin-dashboard/*"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/partner-dashboard/*"
          element={
            <PrivateRoute allowedRoles={["partner"]}>
              <PartnerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/trainee-dashboard/*"
          element={
            <PrivateRoute allowedRoles={["trainee"]}>
              <TraineeDashboard />
            </PrivateRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
