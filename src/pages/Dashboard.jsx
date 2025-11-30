import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';
import { fetchBins, fetchTransactions, fetchAnnouncements } from '../api/mockApi.js';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';

const COLORS = ['#00695c','#ff6b6b','#0288d1','#ffb300'];

export default function Dashboard(){
  const [bins, setBins] = useState([]);
  const [txs, setTxs] = useState([]);
  const [anns, setAnns] = useState([]);
  useEffect(()=>{ fetchBins().then(setBins); fetchTransactions().then(setTxs); fetchAnnouncements().then(setAnns); },[]);
  const byType = Object.values(txs.reduce((acc,t)=>{ acc[t.wasteType]=(acc[t.wasteType]||0)+t.weightKg; return acc; },{})).length ? Object.entries(txs.reduce((acc,t)=>{ acc[t.wasteType]=(acc[t.wasteType]||0)+t.weightKg; return acc; },{})).map(([k,v])=>({ name:k, value:parseFloat(v.toFixed(2)) })) : [{name:'No Data', value:1}];
  const fillData = bins.map(b=>({ name: b.label.split(' - ')[0], fill: b.fill }));
  return (
    <Container className="app-root">
      <Typography variant="h5" sx={{mb:2}}>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper className="card">
            <Typography variant="subtitle1">Waste by Type</Typography>
            <div style={{height:240}}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie dataKey="value" data={byType} outerRadius={80} label>
                    {byType.map((e,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="card">
            <Typography variant="subtitle1">Bin Fill Levels</Typography>
            <div style={{height:240}}>
              <ResponsiveContainer>
                <BarChart data={fillData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="fill" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="card">
            <Typography variant="subtitle1">Recent Disposals</Typography>
            {txs.slice(0,8).map(tx => (
              <div key={tx.id} style={{padding:'8px 0', borderBottom: '1px solid #f0f0f0'}}>
                <strong>{tx.wasteType}</strong> — {tx.weightKg} kg — +{tx.points} pts — <span className="small-muted">{new Date(tx.timestamp).toLocaleString()}</span>
              </div>
            ))}
            {txs.length===0 && <Typography className="small-muted">No activity yet.</Typography>}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="card">
            <Typography variant="subtitle1">Announcements</Typography>
            {anns.map(a => (
              <div key={a.id} style={{padding:'8px 0'}}><strong>{a.title}</strong><div className="small-muted">{a.body}</div></div>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
