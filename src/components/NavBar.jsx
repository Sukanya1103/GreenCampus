import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, MenuItem, Select } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NavBar({ role, setRole, userId, setUserId, users }) {
  return (
    <AppBar position="sticky" color="default" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }} className="header-title">GreenCampus</Typography>
        <Button component={RouterLink} to="/">Dashboard</Button>
        <Button component={RouterLink} to="/bins">Bins</Button>
        <Button component={RouterLink} to="/scan">Scan</Button>
        <Button component={RouterLink} to="/leaderboard">Leaderboard</Button>
        <Button component={RouterLink} to="/profile">Profile</Button>
        <Button component={RouterLink} to="/admin" color="inherit" variant="outlined" size="small">Admin</Button>
        <Box sx={{ ml: 2 }}>
          <Select size="small" value={userId} onChange={(e)=>setUserId(e.target.value)}>
            {users.map(u => <MenuItem key={u.id} value={u.id}>{u.name} ({u.role})</MenuItem>)}
          </Select>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
