import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Button, TextField, MenuItem } from '@mui/material';
import { fetchUsers, fetchBins, fetchPickups, schedulePickup, addAnnouncement, deleteUser } from '../api/mockApi.js';

export default function AdminPanel(){
  const [users, setUsers] = useState([]);
  const [bins, setBins] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [vendorId, setVendorId] = useState('');
  const [binId, setBinId] = useState('');
  useEffect(()=>{ fetchUsers().then(setUsers); fetchBins().then(setBins); fetchPickups().then(setPickups); }, []);

  async function handleSchedule(){
    if(!vendorId||!binId) return alert('Select vendor & bin');
    await schedulePickup({ vendorId, binId, scheduledFor: new Date().toISOString() });
    alert('Scheduled');
    fetchPickups().then(setPickups);
  }
  async function handleAnn(){
    const title = prompt('Announcement title'); if(!title) return;
    const body = prompt('Announcement body');
    await addAnnouncement({ title, body });
    alert('Posted');
  }
  async function handleDelete(u){ if(!confirm('Delete user?')) return; await deleteUser(u.id); fetchUsers().then(setUsers); }

  return (
    <Container className="app-root">
      <Typography variant="h5">Admin Panel</Typography>
      <Paper className="card" sx={{ mt:1 }}>
        <Typography variant="subtitle1">Users</Typography>
        {users.map(u => <div key={u.id} style={{display:'flex', justifyContent:'space-between', padding:8}}>{u.name} <Button color="error" size="small" onClick={()=>handleDelete(u)}>Delete</Button></div>)}
      </Paper>

      <Paper className="card" sx={{ mt:2 }}>
        <Typography variant="subtitle1">Create Pickup</Typography>
        <TextField select label="Vendor" value={vendorId} onChange={e=>setVendorId(e.target.value)} sx={{mr:1}}>
          {users.filter(u=>u.role==='vendor').map(v=> <MenuItem key={v.id} value={v.id}>{v.name}</MenuItem>)}
        </TextField>
        <TextField select label="Bin" value={binId} onChange={e=>setBinId(e.target.value)} sx={{mr:1}}>
          {bins.map(b=> <MenuItem key={b.id} value={b.id}>{b.label}</MenuItem>)}
        </TextField>
        <Button onClick={handleSchedule}>Schedule</Button>
      </Paper>

      <Paper className="card" sx={{ mt:2 }}>
        <Typography variant="subtitle1">Announcements</Typography>
        <Button onClick={handleAnn}>New Announcement</Button>
      </Paper>
    </Container>
  );
}
