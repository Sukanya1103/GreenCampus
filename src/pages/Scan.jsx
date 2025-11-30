import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, TextField, MenuItem, Button, Stack } from '@mui/material';
import { fetchBins, fetchUsers, logDisposal } from '../api/mockApi.js';

export default function Scan({ currentUserId }){
  const [bins, setBins] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(currentUserId || '');
  const [binId, setBinId] = useState('');
  const [wasteType, setWasteType] = useState('Dry');
  const [weight, setWeight] = useState(0.2);
  const [msg, setMsg] = useState('');
  useEffect(()=>{ fetchBins().then(setBins); fetchUsers().then(u=>{ setUsers(u); if(u[0]) setUserId(u[0].id); }); },[]);
  useEffect(()=> setUserId(currentUserId), [currentUserId]);

  async function handleSubmit(){
    setMsg('Logging...');
    try{
      const tx = await logDisposal({ userId, binId, wasteType, weightKg: parseFloat(weight) });
      setMsg(`Logged +${tx.points} pts for ${tx.weightKg} kg`);
    }catch(e){ setMsg('Error: '+e.message); }
  }

  return (
    <Container className="app-root">
      <Typography variant="h5" sx={{mb:2}}>Scan / Dispose</Typography>
      <Paper className="card">
        <Stack spacing={2}>
          <TextField select label="User" value={userId} onChange={e=>setUserId(e.target.value)}>
            {users.map(u => <MenuItem key={u.id} value={u.id}>{u.name} ({u.role})</MenuItem>)}
          </TextField>
          <TextField select label="Bin (simulate QR scan)" value={binId} onChange={e=>setBinId(e.target.value)}>
            {bins.map(b=> <MenuItem key={b.id} value={b.id}>{b.label} — {b.id}</MenuItem>)}
          </TextField>
          <TextField select label="Waste Type" value={wasteType} onChange={e=>setWasteType(e.target.value)}>
            <MenuItem value="Plastic">Plastic</MenuItem>
            <MenuItem value="Dry">Dry</MenuItem>
            <MenuItem value="Wet">Wet</MenuItem>
            <MenuItem value="E-waste">E-waste</MenuItem>
          </TextField>
          <TextField label="Weight (kg)" type="number" inputProps={{ step:0.1 }} value={weight} onChange={e=>setWeight(e.target.value)} />
          <Button variant="contained" onClick={handleSubmit}>Log Disposal</Button>
          <Typography className="small-muted">{msg}</Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
