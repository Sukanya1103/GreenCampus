import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <AppBar position="sticky" color="default">
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>GreenCampus — Waste Management</Typography>
        <Button component={RouterLink} to="/">Dashboard</Button>
        <Button component={RouterLink} to="/bins">Bins</Button>
        <Button component={RouterLink} to="/scan">Scan</Button>
        <Button component={RouterLink} to="/leaderboard">Leaderboard</Button>
        <Button component={RouterLink} to="/profile">Profile</Button>
        <Button component={RouterLink} to="/admin" color="inherit" variant="outlined" size="small">Admin</Button>
      </Toolbar>
    </AppBar>
  );
}
