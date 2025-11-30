import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import { fetchUsers, fetchTransactions, fetchRewards, redeemReward } from '../api/mockApi.js';

export default function Profile({ currentUserId }){
  const [user, setUser] = useState(null);
  const [txs, setTxs] = useState([]);
  const [rewards, setRewards] = useState([]);
  useEffect(()=>{ fetchUsers().then(u=>{ const me = u.find(x=>x.id===currentUserId) || u[0]; setUser(me); }); fetchTransactions().then(setTxs); fetchRewards().then(setRewards); },[currentUserId]);

  async function handleRedeem(id){
    try{
      await redeemReward({ userId: user.id, rewardId: id });
      const updated = await fetchUsers();
      setUser(updated.find(x=>x.id===user.id));
      alert('Redeemed!');
    }catch(e){ alert(e.message); }
  }

  if(!user) return <Container className="app-root"><Typography>Loading...</Typography></Container>;
  return (
    <Container className="app-root">
      <Typography variant="h5">Profile</Typography>
      <Paper className="card" sx={{ mt:1 }}>
        <Typography variant="h6">{user.name} — <span className="small-muted">Level {user.level}</span></Typography>
        <Typography>Points: <strong>{user.points}</strong></Typography>
        <Typography>Achievements: {user.achievements?.join(', ') || '—'}</Typography>
      </Paper>

      <Paper className="card" sx={{ mt:2 }}>
        <Typography variant="h6">Redeem</Typography>
        {rewards.map(r => (
          <div key={r.id} style={{display:'flex', justifyContent:'space-between', padding:8}}>
            <div>{r.title} — {r.cost} pts</div>
            <Button variant="contained" size="small" disabled={!user || user.points < r.cost} onClick={()=>handleRedeem(r.id)}>Redeem</Button>
          </div>
        ))}
      </Paper>

      <Paper className="card" sx={{ mt:2 }}>
        <Typography variant="h6">Your Recent Disposals</Typography>
        {txs.filter(t=>t.userId===user.id).slice(0,6).map(tx=>
          <div key={tx.id} style={{padding:6}}>{tx.wasteType} — {tx.weightKg}kg — +{tx.points}pts — <span className="small-muted">{new Date(tx.timestamp).toLocaleString()}</span></div>
        )}
      </Paper>
    </Container>
  );
}
