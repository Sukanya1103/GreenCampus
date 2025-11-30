import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import { fetchPickups, vendorConfirmPickup, fetchBins, fetchUsers } from '../api/mockApi.js';

export default function VendorPanel({ currentUserId }){
  const [pickups, setPickups] = useState([]);
  const [bins, setBins] = useState([]);
  useEffect(()=>{ fetchBins().then(setBins); fetchPickups().then(setPickups); }, []);
  const mine = pickups.filter(p => p.vendorId === currentUserId);

  async function confirm(id){
    await vendorConfirmPickup(id);
    alert('Confirmed');
    fetchPickups().then(setPickups);
  }

  return (
    <Container className="app-root">
      <Typography variant="h5">Vendor Panel</Typography>
      <Paper className="card" sx={{ mt:1 }}>
        <Typography variant="subtitle1">Your Pickups</Typography>
        {mine.length===0 && <div className="small-muted">No pickups assigned</div>}
        {mine.map(p => (
          <div key={p.id} style={{display:'flex', justifyContent:'space-between', padding:8}}>
            <div>Bin: {p.binId} — {p.status}</div>
            <Button onClick={()=>confirm(p.id)} disabled={p.status !== 'scheduled'}>Confirm</Button>
          </div>
        ))}
      </Paper>
    </Container>
  );
}
