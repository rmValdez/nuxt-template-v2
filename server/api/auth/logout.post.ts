import { defineEventHandler, readBody } from 'h3';
import { db } from '../../utils/db';

export default defineEventHandler(async event => {
  const body = await readBody(event).catch(() => ({}));
  const refreshToken = body?.refreshToken;

  if (refreshToken) {
    db.refreshTokens.delete(refreshToken);
  }

  return {
    success: true,
    message: 'Logged out successfully'
  };
});
