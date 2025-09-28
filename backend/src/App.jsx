import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import TraineeDashboard from "./dashboards/TraineeDashboard";
import PartnerDashboard from "./dashboards/PartnerDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route
          path="/trainee-dashboard"
          element={<ProtectedRoute><TraineeDashboard /></ProtectedRoute>}
        />
        <Route
          path="/partner-dashboard"
          element={<ProtectedRoute><PartnerDashboard /></ProtectedRoute>}
        />
        <Route
          path="/admin-dashboard"
          element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;
