import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

export default function VendorPanel() {
  return (
    <Container className="container app-root">
      <Typography variant="h5">Vendor Panel</Typography>
      <Paper className="card">
        <Typography>Assigned Pickups (mock)</Typography>
        <Typography variant="caption">Vendors can view assigned bins, confirm pickups and update status. Use mockApi.schedulePickup to simulate scheduling.</Typography>
      </Paper>
    </Container>
  );
}
