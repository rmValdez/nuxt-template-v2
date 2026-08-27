import { defineEventHandler, getHeader, createError } from 'h3';
import { extractBearerToken, verifyAccessToken } from '../../utils/jwt';
import { db } from '../../utils/db';

export default defineEventHandler(async event => {
  const authHeader = getHeader(event, 'authorization');
  const token = extractBearerToken(authHeader);

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Missing token'
    });
  }

  try {
    const payload = verifyAccessToken(token);
    const user = db.findUserById(payload.userId);

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      });
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    };
  } catch (err: unknown) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Invalid or expired token',
      data: err
    });
  }
});
