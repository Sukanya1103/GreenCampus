export const initial = {
  users: [
    { id: 'u1', name: 'Sukanya Rana', role: 'student', level: 1, points: 120, achievements: ['First Drop'], email: 'sukanya@campus.edu' },
    { id: 'u2', name: 'Sakshi Rajput', role: 'student', level: 1, points: 40, achievements: [], email: 'sakshi@campus.edu' },
    { id: 'vendor1', name: 'GreenCycle', role: 'vendor', points: 0, assignedBins: ['b1','b3'], email: 'vendor@greencycle.com' },
    { id: 'admin', name: 'Admin', role: 'admin', points: 0, email: 'admin@campus.edu' }
  ],
  bins: [
    { id: 'b1', label: 'Block A - Bin 1', type: ['Dry'], fill: 45, location: 'Block A', qr: 'b1' },
    { id: 'b2', label: 'Block B - Bin 2', type: ['Wet'], fill: 70, location: 'Block B', qr: 'b2' },
    { id: 'b3', label: 'Hostel - Bin 3', type: ['E-waste','Dry'], fill: 18, location: 'Hostel', qr: 'b3' }
  ],
  rewards: [
    { id: 'r1', title: 'Canteen Voucher', cost: 100 },
    { id: 'r2', title: 'Reusable Bottle', cost: 200 }
  ],
  transactions: [
    { id: 't1', userId: 'u1', binId: 'b1', wasteType: 'Dry', weightKg: 0.5, points: 5, timestamp: Date.now()-86400000 }
  ],
  pickups: [
    // vendor pickup jobs
  ],
  announcements: [
    { id: 'a1', title: 'Plastic Clean-up Week', body: 'Compete and earn double points!' }
  ]
};
