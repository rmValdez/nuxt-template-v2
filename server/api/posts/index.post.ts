import { defineEventHandler, readBody, createError } from 'h3';
import { z } from 'zod';
import { db } from '../../utils/db';

const CreatePostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  author: z.string().default('Admin'),
  tags: z.array(z.string()).default([])
});

export default defineEventHandler(async event => {
  const body = await readBody(event);
  const parsed = CreatePostSchema.safeParse(body);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Post Data',
      data: parsed.error.format()
    });
  }

  const newPost = {
    id: `post-${Date.now()}`,
    ...parsed.data,
    createdAt: new Date().toISOString()
  };

  db.posts.unshift(newPost);
  return newPost;
});
