// frontend/src/dashboards/Trainee/index.jsx
import { Routes, Route, Link } from "react-router-dom";

// Subpages
import Profile from "./Profile";
import MyPlacements from "./MyPlacements";
import Applications from "./Applications";
import Documents from "./Documents";
import Certificates from "./Certificates";
import Settings from "./Settings";

// Shared pages reused
import Activities from "../../pages/Activities";
import Apply from "../../pages/Apply";

const TraineeDashboard = () => {
  return (
    <div className="trainee-dashboard">
      <h2>Trainee Dashboard</h2>

      {/* Temporary nav for testing */}
      <nav>
        <Link to="profile">Profile</Link> |{" "}
        <Link to="my-placements">My Placements</Link> |{" "}
        <Link to="applications">Applications</Link> |{" "}
        <Link to="activities">Activities</Link> |{" "}
        <Link to="documents">Documents</Link> |{" "}
        <Link to="certificates">Certificates</Link> |{" "}
        <Link to="settings">Settings</Link> |{" "}
        <Link to="apply">Apply for New Placement</Link>
      </nav>

      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="my-placements" element={<MyPlacements />} />
        <Route path="applications" element={<Applications />} />
        <Route path="activities" element={<Activities fromDashboard={true} />} />
        <Route path="documents" element={<Documents />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="settings" element={<Settings />} />
        <Route path="apply" element={<Apply />} />
      </Routes>
    </div>
  );
};

export default TraineeDashboard;
