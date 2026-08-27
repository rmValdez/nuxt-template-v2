import { defineEventHandler, readBody, createError } from 'h3';
import { z } from 'zod';
import { db } from '../../utils/db';
import { comparePassword } from '../../utils/password';
import { signAccessToken, signRefreshToken } from '../../utils/jwt';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export default defineEventHandler(async event => {
  const body = await readBody(event);
  const parsed = LoginSchema.safeParse(body);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Request',
      data: parsed.error.format()
    });
  }

  const { email, password } = parsed.data;
  const user = db.findUserByEmail(email);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password'
    });
  }

  const isValidPassword = await comparePassword(password, user.passwordHash);
  if (!isValidPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password'
    });
  }

  const tokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };

  const accessToken = signAccessToken(tokenPayload);
  const refreshToken = signRefreshToken(tokenPayload);

  db.refreshTokens.set(refreshToken, user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    },
    accessToken,
    refreshToken
  };
});
