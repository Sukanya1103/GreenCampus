import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Bins from './pages/Bins';
import Scan from './pages/Scan';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import AdminPanel from './pages/AdminPanel';
import VendorPanel from './pages/VendorPanel';

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bins" element={<Bins />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/vendor" element={<VendorPanel />} />
      </Routes>
    </>
  );
}
