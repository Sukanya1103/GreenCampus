import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

export default function AdminPanel() {
  // For brevity this is a scaffold. You can call mockApi to fetch users/bins and provide forms to add/update.
  return (
    <Container className="container app-root">
      <Typography variant="h5">Admin Panel</Typography>
      <Paper className="card">
        <Typography variant="subtitle1">Manage Users / Bins / Rewards</Typography>
        <Typography variant="body2">This panel is a scaffold. You can extend it to add CRUD forms that call mockApi functions (fetchUsers, fetchBins, etc.).</Typography>
      </Paper>
    </Container>
  );
}
