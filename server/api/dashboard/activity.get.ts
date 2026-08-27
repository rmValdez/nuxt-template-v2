import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  return [
    {
      id: 'act-1',
      title: 'Nitro Engine Started',
      description: 'SSR server initialized on port 3000.',
      timestamp: '5 minutes ago',
      type: 'success'
    },
    {
      id: 'act-2',
      title: 'Cross-Origin Connection Established',
      description: 'Handshake completed with Vue 3 client on port 5173.',
      timestamp: '15 minutes ago',
      type: 'info'
    },
    {
      id: 'act-3',
      title: 'JWT Secret Key Active',
      description: 'HMAC SHA-256 signatures active for auth sessions.',
      timestamp: '1 hour ago',
      type: 'warning'
    }
  ];
});
