import { Routes, Route, Navigate } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Elections from "./pages/Elections";
import ElectionDetails from "./pages/ElectionDetails";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageElections from "./pages/admin/ManageElections";
import ManageCandidates from "./pages/admin/ManageCandidates";
import ManageVoters from "./pages/admin/ManageVoters";
import AdminResults from "./pages/admin/AdminResults";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/elections" element={<Elections />} />
            <Route path="/elections/:id" element={<ElectionDetails />} />
            <Route path="/vote/:electionId" element={<Vote />} />
            <Route path="/results" element={<Results />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/elections" element={<ManageElections />} />
            <Route path="/admin/candidates" element={<ManageCandidates />} />
            <Route path="/admin/voters" element={<ManageVoters />} />
            <Route path="/admin/results" element={<AdminResults />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
