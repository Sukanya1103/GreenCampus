import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { fetchUsers } from '../api/mockApi.js';

export default function Leaderboard(){
  const [users, setUsers] = useState([]);
  useEffect(()=>{ fetchUsers().then(setUsers); },[]);
  const sorted = [...users].sort((a,b)=> (b.points||0)-(a.points||0));
  return (
    <Container className="app-root">
      <Typography variant="h5">Leaderboard</Typography>
      <Paper className="card" sx={{ mt:1 }}>
        {sorted.map((u, idx) => (
          <div key={u.id} style={{display:'flex', justifyContent:'space-between', padding:8, borderBottom:'1px solid #f6f6f6'}}>
            <div>{idx+1}. {u.name} <span className="small-muted">({u.role})</span></div>
            <div>{u.points || 0} pts</div>
          </div>
        ))}
      </Paper>
    </Container>
  );
}
