import { defineEventHandler, readBody, createError } from 'h3';
import { z } from 'zod';
import { db } from '../../utils/db';
import { hashPassword } from '../../utils/password';
import { signAccessToken, signRefreshToken } from '../../utils/jwt';

const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

export default defineEventHandler(async event => {
  const body = await readBody(event);
  const parsed = RegisterSchema.safeParse(body);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Registration Data',
      data: parsed.error.format()
    });
  }

  const { name, email, password } = parsed.data;

  const existingUser = db.findUserByEmail(email);
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'User with this email already exists'
    });
  }

  const passwordHash = await hashPassword(password);

  const newUser = db.createUser({
    name,
    email,
    passwordHash,
    role: 'member',
    status: 'active',
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`
  });

  const tokenPayload = {
    userId: newUser.id,
    email: newUser.email,
    role: newUser.role
  };

  const accessToken = signAccessToken(tokenPayload);
  const refreshToken = signRefreshToken(tokenPayload);

  db.refreshTokens.set(refreshToken, newUser.id);

  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar
    },
    accessToken,
    refreshToken
  };
});
