import { defineEventHandler, readBody, createError } from 'h3';
import { z } from 'zod';
import { db } from '../../utils/db';
import { verifyRefreshToken, signAccessToken, signRefreshToken } from '../../utils/jwt';

const RefreshSchema = z.object({
  refreshToken: z.string()
});

export default defineEventHandler(async event => {
  const body = await readBody(event);
  const parsed = RefreshSchema.safeParse(body);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing or invalid refresh token'
    });
  }

  const { refreshToken } = parsed.data;

  try {
    const payload = verifyRefreshToken(refreshToken);
    const userId = db.refreshTokens.get(refreshToken);

    if (!userId || userId !== payload.userId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid refresh token session'
      });
    }

    const user = db.findUserById(userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      });
    }

    // Invalidate old refresh token and rotate with new pair
    db.refreshTokens.delete(refreshToken);

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    const newAccessToken = signAccessToken(tokenPayload);
    const newRefreshToken = signRefreshToken(tokenPayload);

    db.refreshTokens.set(newRefreshToken, user.id);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  } catch (err: unknown) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Expired or invalid refresh token',
      data: err
    });
  }
});
