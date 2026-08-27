import bcrypt from 'bcryptjs';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'manager' | 'member' | 'guest';
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  createdAt: string;
}

export interface PostRecord {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  createdAt: string;
}

// Pre-computed bcrypt hash for 'password123'
const DEFAULT_PASSWORD_HASH = bcrypt.hashSync('password123', 10);

class InMemoryDatabase {
  public users: UserRecord[] = [
    {
      id: 'usr_admin_1',
      name: 'Admin User',
      email: 'admin@example.com',
      passwordHash: DEFAULT_PASSWORD_HASH,
      role: 'admin',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      createdAt: new Date(Date.now() - 3600000 * 24 * 30).toISOString()
    },
    {
      id: 'usr_mgr_2',
      name: 'Alex Rivera',
      email: 'alex@example.com',
      passwordHash: DEFAULT_PASSWORD_HASH,
      role: 'manager',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      createdAt: new Date(Date.now() - 3600000 * 24 * 15).toISOString()
    },
    {
      id: 'usr_mem_3',
      name: 'Morgan Chen',
      email: 'user@example.com',
      passwordHash: DEFAULT_PASSWORD_HASH,
      role: 'member',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString()
    }
  ];

  public posts: PostRecord[] = [
    {
      id: 'post-1',
      title: 'Nuxt 3 Nitro Engine Architecture',
      content:
        'Nitro compiles lightweight, standalone server routes capable of running on Node.js, Cloudflare Workers, or Vercel Edge with zero external runtime bloat.',
      author: 'Admin User',
      tags: ['nuxt3', 'nitro', 'fullstack'],
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      id: 'post-2',
      title: 'Enterprise Cross-Application Authentication',
      content:
        'Using centralized JWT signature verification and CORS middleware allows multiple frontends (Nuxt, Vue, Next) to authenticate against a single unified identity provider.',
      author: 'Alex Rivera',
      tags: ['security', 'jwt', 'rbac'],
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
    }
  ];

  public refreshTokens: Map<string, string> = new Map(); // token -> userId

  findUserByEmail(email: string): UserRecord | undefined {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id: string): UserRecord | undefined {
    return this.users.find(u => u.id === id);
  }

  createUser(user: Omit<UserRecord, 'id' | 'createdAt'>): UserRecord {
    const newUser: UserRecord = {
      ...user,
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }
}

export const db = new InMemoryDatabase();
