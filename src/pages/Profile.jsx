import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import { fetchUsers, fetchTransactions, fetchRewards, redeemReward } from '../api/mockApi';

export default function Profile() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [txs, setTxs] = useState([]);
  const [rewards, setRewards] = useState([]);
  useEffect(() => {
    fetchUsers().then(u => { setUsers(u); const me = u[0]; setUser(me); });
    fetchTransactions().then(setTxs);
    fetchRewards().then(setRewards);
  }, []);

  async function handleRedeem(rewardId) {
    try {
      await redeemReward({ userId: user.id, rewardId });
      // refresh users
      const all = await fetchUsers();
      const me = all.find(x => x.id === user.id);
      setUser(me);
      alert('Redeemed');
    } catch (e) {
      alert(e.message);
    }
  }

  if (!user) return <Container className="container app-root"><Typography>Loading...</Typography></Container>;

  return (
    <Container className="container app-root">
      <Typography variant="h5">Profile</Typography>
      <Paper className="card">
        <Typography variant="h6">{user.name}</Typography>
        <Typography>Points: <strong>{user.points}</strong></Typography>
      </Paper>

      <Paper className="card" sx={{ mt: 2 }}>
        <Typography variant="h6">Redeem Rewards</Typography>
        {rewards.map(r => (
          <div key={r.id} style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
            <div style={{ flex: 1 }}>
              <strong>{r.title}</strong> — {r.costPoints} pts
            </div>
            <Button variant="contained" onClick={() => handleRedeem(r.id)} disabled={user.points < r.costPoints}>Redeem</Button>
          </div>
        ))}
      </Paper>

      <Paper className="card" sx={{ mt: 2 }}>
        <Typography variant="h6">Your Recent Disposals</Typography>
        {txs.filter(t => t.userId === user.id).slice(0,6).map(tx => (
          <div key={tx.id}>
            {tx.wasteType} — {tx.weightKg}kg — +{tx.points}pts — {new Date(tx.timestamp).toLocaleString()}
          </div>
        ))}
      </Paper>
    </Container>
  );
}
