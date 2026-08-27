import { defineEventHandler } from 'h3';
import { db } from '../../utils/db';

export default defineEventHandler(() => {
  return db.posts;
});
