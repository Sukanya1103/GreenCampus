import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';
import { fetchBins, fetchTransactions } from '../api/mockApi';
import { WastePie, FillBar } from '../components/ChartWidgets';

export default function Dashboard() {
  const [bins, setBins] = useState([]);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetchBins().then(setBins);
    fetchTransactions().then(setTransactions);
  }, []);

  // compute waste by type (simple)
  const wasteSummary = transactions.reduce((acc, t) => {
    acc[t.wasteType] = (acc[t.wasteType] || 0) + t.weightKg;
    return acc;
  }, {});
  const pieData = Object.entries(wasteSummary).map(([k, v]) => ({ name: k, value: parseFloat(v.toFixed(2)) }));
  const fillData = bins.map(b => ({ name: b.label.split(' - ')[0], fill: b.fill }));

  return (
    <Container className="container app-root">
      <Typography variant="h5" gutterBottom>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}><WastePie data={pieData.length ? pieData : [{name:'No Data', value:1}]} /></Grid>
        <Grid item xs={12} md={6}><FillBar data={fillData} /></Grid>
        <Grid item xs={12}>
          <Paper className="card">
            <Typography variant="h6">Recent Disposals</Typography>
            {transactions.length === 0 ? <Typography>No activity yet.</Typography> : transactions.slice(0,5).map(tx => (
              <div key={tx.id}>
                <strong>{tx.wasteType}</strong> — {tx.weightKg} kg — +{tx.points} pts — {new Date(tx.timestamp).toLocaleString()}
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
