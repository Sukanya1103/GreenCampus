import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, TextField, MenuItem, Button, Stack } from '@mui/material';
import { fetchUsers, fetchBins, logDisposal } from '../api/mockApi';

export default function Scan() {
  const [users, setUsers] = useState([]);
  const [bins, setBins] = useState([]);
  const [userId, setUserId] = useState('');
  const [binId, setBinId] = useState('');
  const [wasteType, setWasteType] = useState('Dry');
  const [weight, setWeight] = useState(0.2);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers().then(u => { setUsers(u); if (u[0]) setUserId(u[0].id); });
    fetchBins().then(b => { setBins(b); if (b[0]) setBinId(b[0].id); });
  }, []);

  async function handleLog() {
    setMessage('Logging...');
    try {
      const tx = await logDisposal({ userId, binId, wasteType, weight: parseFloat(weight) });
      setMessage(`Logged: +${tx.points} points for ${tx.weightKg}kg`);
    } catch (e) {
      setMessage('Error: ' + e.message);
    }
  }

  return (
    <Container className="container app-root">
      <Typography variant="h5" gutterBottom>Simulate Scan / Dispose</Typography>
      <Paper className="card">
        <Stack spacing={2}>
          <TextField select label="User" value={userId} onChange={e=>setUserId(e.target.value)}>
            {users.map(u => <MenuItem key={u.id} value={u.id}>{u.name} ({u.id})</MenuItem>)}
          </TextField>
          <TextField select label="Bin (scan result)" value={binId} onChange={e=>setBinId(e.target.value)}>
            {bins.map(b => <MenuItem key={b.id} value={b.id}>{b.label} — {b.id}</MenuItem>)}
          </TextField>
          <TextField select label="Waste Type" value={wasteType} onChange={e=>setWasteType(e.target.value)}>
            <MenuItem value="Plastic">Plastic</MenuItem>
            <MenuItem value="Dry">Dry</MenuItem>
            <MenuItem value="Wet">Wet</MenuItem>
            <MenuItem value="E-waste">E-waste</MenuItem>
          </TextField>
          <TextField label="Weight (kg)" type="number" inputProps={{ step: 0.1 }} value={weight} onChange={e=>setWeight(e.target.value)} />
          <Button variant="contained" onClick={handleLog}>Log Disposal</Button>
          <Typography variant="body2">{message}</Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
