// Simple mock API using localStorage
import { users as initialUsers, bins as initialBins, vendors as initialVendors, rewards as initialRewards, transactions as initialTx } from '../data/dummyData';

const KEY = 'wms_mock_v1';

function initStorage() {
  if (!localStorage.getItem(KEY)) {
    const payload = { users: initialUsers, bins: initialBins, vendors: initialVendors, rewards: initialRewards, transactions: initialTx };
    localStorage.setItem(KEY, JSON.stringify(payload));
  }
}

function read() {
  initStorage();
  return JSON.parse(localStorage.getItem(KEY));
}

function write(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function wait(ms = 400) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function fetchUsers() {
  await wait();
  return read().users;
}

export async function fetchBins() {
  await wait();
  return read().bins;
}

export async function fetchVendors() {
  await wait();
  return read().vendors;
}

export async function fetchRewards() {
  await wait();
  return read().rewards;
}

export async function fetchTransactions() {
  await wait();
  return read().transactions;
}

/**
 * Log a disposal: updates transactions, increments user points and bin fill roughly.
 * Returns the new transaction.
 */
export async function logDisposal({ userId, binId, wasteType, weightKg }) {
  await wait();
  const db = read();
  const pts = Math.max(1, Math.round(weightKg * 10)); // example: 0.5kg => 5 points
  const tx = { id: 't_' + Date.now(), userId, binId, wasteType, weightKg, points: pts, timestamp: Date.now() };

  db.transactions = [tx, ...db.transactions];

  // update user points
  db.users = db.users.map(u => u.id === userId ? { ...u, points: (u.points || 0) + pts } : u);

  // update bin fill (add 1-3% per disposal depending on weight)
  db.bins = db.bins.map(b => b.id === binId ? { ...b, fill: Math.min(100, b.fill + Math.round(weightKg * 2)) } : b);

  write(db);
  return tx;
}

export async function redeemReward({ userId, rewardId }) {
  await wait();
  const db = read();
  const reward = db.rewards.find(r => r.id === rewardId);
  const user = db.users.find(u => u.id === userId);
  if (!reward || !user) throw new Error('Invalid');
  if (user.points < reward.costPoints) throw new Error('Not enough points');
  db.users = db.users.map(u => u.id === userId ? { ...u, points: u.points - reward.costPoints } : u);
  write(db);
  return { success: true, newPoints: user.points - reward.costPoints };
}

export async function schedulePickup({ vendorId, binId, dateISO }) {
  await wait();
  // In a real backend you'd store jobs; here we'll just return ok
  return { success: true, vendorId, binId, scheduledFor: dateISO };
}
