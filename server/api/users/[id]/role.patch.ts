import { defineEventHandler, readBody, getRouterParam, createError } from 'h3';
import { z } from 'zod';
import { db } from '../../../utils/db';

const RoleSchema = z.object({
  role: z.enum(['admin', 'manager', 'member', 'guest'])
});

export default defineEventHandler(async event => {
  const userId = getRouterParam(event, 'id');
  const body = await readBody(event);
  const parsed = RoleSchema.safeParse(body);

  if (!userId || !parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid user or role data'
    });
  }

  const user = db.findUserById(userId);
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    });
  }

  user.role = parsed.data.role;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    avatar: user.avatar,
    createdAt: user.createdAt
  };
});
