import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { fetchBins } from '../api/mockApi.js';
import BinCard from '../components/BinCard.jsx';

export default function Bins(){
  const [bins, setBins] = useState([]);
  useEffect(()=>{ fetchBins().then(setBins); },[]);
  return (
    <Container className="app-root">
      <Typography variant="h5" sx={{mb:2}}>Bins</Typography>
      <Grid container spacing={2}>
        {bins.map(b => (
          <Grid item xs={12} sm={6} md={4} key={b.id}><BinCard bin={b} /></Grid>
        ))}
      </Grid>
    </Container>
  );
}
