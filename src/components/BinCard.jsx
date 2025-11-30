import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Chip, Stack } from '@mui/material';

export default function BinCard({ bin }) {
  return (
    <Card className="card" sx={{ minWidth: 220 }}>
      <CardContent>
        <Typography variant="subtitle1">{bin.label}</Typography>
        <Typography className="small-muted">{bin.location}</Typography>
        <Stack direction="row" spacing={1} sx={{ mt:1, mb:1 }}>
          {bin.type.map(t => <Chip key={t} label={t} size="small"/>)}
        </Stack>
        <Typography variant="caption">Fill: {bin.fill}%</Typography>
        <LinearProgress variant="determinate" value={bin.fill} sx={{ mt:1, mb:1 }}/>
        <Typography variant="caption">QR: <strong>{bin.qr}</strong></Typography>
      </CardContent>
    </Card>
  );
}
