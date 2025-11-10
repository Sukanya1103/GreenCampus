// Dummy data exported for use by mockApi and components
export const users = [
  { id: 'u1', name: 'Aditi', role: 'student', points: 120, email: 'aditi@example.com' },
  { id: 'u2', name: 'Rohit', role: 'student', points: 80, email: 'rohit@example.com' },
  { id: 'admin', name: 'Admin', role: 'admin', points: 0, email: 'admin@example.com' }
];

export const vendors = [
  { id: 'v1', name: 'GreenCycle Pvt Ltd', assignedBins: ['b1', 'b3'] }
];

export const bins = [
  { id: 'b1', label: 'Block A - Bin 1', type: ['Dry', 'Plastic'], fill: 45, location: 'Block A' },
  { id: 'b2', label: 'Block B - Bin 2', type: ['Wet'], fill: 70, location: 'Block B' },
  { id: 'b3', label: 'Hostel Area - Bin 3', type: ['E-waste', 'Dry'], fill: 20, location: 'Hostel Area' }
];

export const rewards = [
  { id: 'r1', title: 'Canteen Voucher', costPoints: 100 },
  { id: 'r2', title: 'Reusable Bottle', costPoints: 200 }
];

export const transactions = [
  {
    id: 't1',
    userId: 'u1',
    binId: 'b1',
    wasteType: 'Plastic',
    weightKg: 0.5,
    points: 5,
    timestamp: Date.now() - 1000 * 60 * 60 * 24
  }
];
