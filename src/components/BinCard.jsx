import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Stack, Chip } from '@mui/material';

export default function BinCard({ bin }) {
  return (
    <Card className="card" sx={{ minWidth: 220 }}>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="subtitle1">{bin.label}</Typography>
          <Typography variant="body2" color="text.secondary">{bin.location}</Typography>
          <Stack direction="row" spacing={1}>
            {bin.type.map((t) => <Chip key={t} label={t} size="small" />)}
          </Stack>
          <Typography variant="caption">Fill: {bin.fill}%</Typography>
          <LinearProgress variant="determinate" value={bin.fill} />
          <Typography variant="caption">QR ID: <strong>{bin.id}</strong></Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
