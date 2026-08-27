import { defineEventHandler, getRouterParam, createError } from 'h3';
import { db } from '../../utils/db';

export default defineEventHandler(event => {
  const id = getRouterParam(event, 'id');
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing post id'
    });
  }

  const idx = db.posts.findIndex(p => p.id === id);
  if (idx !== -1) {
    db.posts.splice(idx, 1);
  }

  return { success: true, id };
});
