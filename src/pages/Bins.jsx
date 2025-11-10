import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import { fetchBins } from '../api/mockApi';
import BinCard from '../components/BinCard';

export default function Bins() {
  const [bins, setBins] = useState([]);
  useEffect(() => { fetchBins().then(setBins); }, []);
  return (
    <Container className="container app-root">
      <Typography variant="h5" gutterBottom>Bins</Typography>
      <Grid container spacing={2}>
        {bins.map(b => (
          <Grid item key={b.id} xs={12} sm={6} md={4}>
            <BinCard bin={b} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
