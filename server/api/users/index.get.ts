import { defineEventHandler } from 'h3';
import { db } from '../../utils/db';

export default defineEventHandler(() => {
  return db.users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.status,
    avatar: u.avatar,
    createdAt: u.createdAt
  }));
});
