import { defineEventHandler, setResponseHeaders, handleCors } from 'h3';

export default defineEventHandler(event => {
  const isCorsHandled = handleCors(event, {
    origin: (origin) => true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
  });

  if (isCorsHandled) {
    return;
  }

  // Set explicit CORS headers for all incoming API routes
  if (event.path.startsWith('/api')) {
    setResponseHeaders(event, {
      'Access-Control-Allow-Origin': event.node.req.headers.origin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true'
    });
  }
});
