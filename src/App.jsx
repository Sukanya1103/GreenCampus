import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Bins from './pages/Bins.jsx';
import Scan from './pages/Scan.jsx';
import Profile from './pages/Profile.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import VendorPanel from './pages/VendorPanel.jsx';
import { fetchUsers } from './api/mockApi.js';

export default function App(){
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('');
  useEffect(()=>{ fetchUsers().then(u => { setUsers(u); if(u[0]) setCurrentUserId(u[0].id); }); }, []);
  return (
    <>
      <NavBar users={users} userId={currentUserId} setUserId={setCurrentUserId} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bins" element={<Bins />} />
        <Route path="/scan" element={<Scan currentUserId={currentUserId} />} />
        <Route path="/profile" element={<Profile currentUserId={currentUserId} />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/vendor" element={<VendorPanel currentUserId={currentUserId} />} />
      </Routes>
    </>
  );
}
