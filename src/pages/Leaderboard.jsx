import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { fetchUsers } from '../api/mockApi';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  useEffect(() => { fetchUsers().then(u => setUsers(u)); }, []);
  const sorted = [...users].sort((a,b) => (b.points||0) - (a.points||0));
  return (
    <Container className="container app-root">
      <Typography variant="h5">Leaderboard</Typography>
      <Paper className="card">
        {sorted.map((u, idx) => (
          <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 8 }}>
            <div>{idx+1}. {u.name}</div>
            <div>{u.points} pts</div>
          </div>
        ))}
      </Paper>
    </Container>
  );
}
