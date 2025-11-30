import { initial } from '../data/dummyData.js';
const KEY = 'wms_mock_v2';

function init() {
  if (!localStorage.getItem(KEY)) {
    localStorage.setItem(KEY, JSON.stringify(initial));
  }
}
function read() { init(); return JSON.parse(localStorage.getItem(KEY)); }
function write(db) { localStorage.setItem(KEY, JSON.stringify(db)); }
function wait(ms=200){ return new Promise(r=>setTimeout(r, ms)); }

export async function getAll(entity){
  await wait();
  const db = read();
  return db[entity] || [];
}

// Users
export async function fetchUsers(){ return getAll('users'); }
export async function fetchBins(){ return getAll('bins'); }
export async function fetchTransactions(){ return getAll('transactions'); }
export async function fetchRewards(){ return getAll('rewards'); }
export async function fetchPickups(){ return getAll('pickups'); }
export async function fetchAnnouncements(){ return getAll('announcements'); }

// CRUD helpers
function uid(prefix='id'){ return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

// Log a disposal (simulate scan)
export async function logDisposal({ userId, binId, wasteType, weightKg }){
  await wait();
  const db = read();
  const points = Math.max(1, Math.round(weightKg * 10));
  const tx = { id: uid('t'), userId, binId, wasteType, weightKg, points, timestamp: Date.now() };
  db.transactions.unshift(tx);
  db.users = db.users.map(u => u.id===userId ? { ...u, points: (u.points||0)+points, level: calcLevel((u.points||0)+points) } : u);
  db.bins = db.bins.map(b => b.id===binId ? { ...b, fill: Math.min(100, b.fill + Math.round(weightKg*2)) } : b);
  // achievements example
  const user = db.users.find(u=>u.id===userId);
  if(user && !user.achievements.includes('Recycler')) user.achievements.push('Recycler');
  write(db);
  return tx;
}

function calcLevel(points){
  if(points >= 500) return 5;
  if(points >= 250) return 4;
  if(points >= 120) return 3;
  if(points >= 50) return 2;
  return 1;
}

export async function redeemReward({ userId, rewardId }){
  await wait();
  const db = read();
  const reward = db.rewards.find(r=>r.id===rewardId);
  const user = db.users.find(u=>u.id===userId);
  if(!reward || !user) throw new Error('Not found');
  if(user.points < reward.cost) throw new Error('Not enough points');
  user.points -= reward.cost;
  db.users = db.users.map(u => u.id===userId ? { ...user } : u);
  write(db);
  return { success: true, remaining: user.points };
}

export async function createUser(payload){
  await wait();
  const db = read();
  const newUser = { id: uid('u'), role: payload.role||'student', points:0, level:1, achievements:[], ...payload };
  db.users.push(newUser);
  write(db);
  return newUser;
}

export async function updateBin(updated){
  await wait();
  const db = read();
  db.bins = db.bins.map(b => b.id===updated.id ? {...b, ...updated} : b);
  write(db);
  return updated;
}

export async function schedulePickup({ vendorId, binId, scheduledFor }){
  await wait();
  const db = read();
  const job = { id: uid('p'), vendorId, binId, scheduledFor, status: 'scheduled' };
  db.pickups.unshift(job);
  write(db);
  return job;
}

export async function vendorConfirmPickup(pickupId){
  await wait();
  const db = read();
  db.pickups = db.pickups.map(p => p.id===pickupId ? {...p, status:'completed', completedAt: Date.now()} : p);
  // optionally lower bin fill
  const pu = db.pickups.find(p => p.id===pickupId);
  if(pu){
    db.bins = db.bins.map(b => b.id===pu.binId ? {...b, fill: Math.max(0, b.fill - 50)} : b);
  }
  write(db);
  return { success: true };
}

export async function addAnnouncement(payload){
  await wait();
  const db = read();
  const ann = { id: uid('a'), ...payload };
  db.announcements.unshift(ann);
  write(db);
  return ann;
}

// Basic admin queries (delete user example)
export async function deleteUser(userId){
  await wait();
  const db = read();
  db.users = db.users.filter(u => u.id !== userId);
  write(db);
  return { success: true };
}
