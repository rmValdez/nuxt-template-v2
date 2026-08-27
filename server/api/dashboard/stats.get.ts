import { defineEventHandler } from 'h3';
import { db } from '../../utils/db';

export default defineEventHandler(() => {
  return {
    totalUsers: db.users.length * 4760,
    usersGrowth: 14.8,
    activeSessions: 3920,
    sessionsGrowth: 9.4,
    totalRevenue: 98500,
    revenueGrowth: 24.6,
    apiHealth: 99.99
  };
});
