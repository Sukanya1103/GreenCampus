import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function WastePie({ data }) {
  return (
    <Card className="card">
      <CardContent>
        <Typography variant="subtitle1">Waste by Type</Typography>
        <div style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie dataKey="value" data={data} outerRadius={80} label>
                {data.map((entry, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function FillBar({ data }) {
  return (
    <Card className="card">
      <CardContent>
        <Typography variant="subtitle1">Bin Fill Levels</Typography>
        <div style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="fill" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
