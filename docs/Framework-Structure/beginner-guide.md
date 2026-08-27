# Beginner Guide to Nuxt 3 & Nitro

Welcome to the **Nuxt 3 Master Template**! This guide is designed for developers who want to understand the fundamentals of building with Nuxt 3, Nitro server routes, and modern authentication.

---

## 1. What is Nuxt 3?

Nuxt 3 is an intuitive framework built on top of **Vue 3**. It offers:
- **Server-Side Rendering (SSR)** for instantaneous first contentful paint and superior SEO.
- **File-based Routing**: Dropping a file in `pages/dashboard.vue` automatically creates a `/dashboard` route.
- **Auto-Imports**: Composables in `composables/` and components in `components/` are available everywhere without manual import statements.

---

## 2. What is Nitro?

**Nitro** is the next-generation server engine powering Nuxt 3:
- Creates ultra-fast server endpoints in `server/api/`.
- Zero-configuration serverless deployments (Cloudflare Workers, Vercel, Node servers).
- Built-in request parsing with `readBody(event)` and error generation with `createError({...})`.

---

## 3. How Authentication Works

1. **User Submits Login**:
   `LoginForm` calls `useAuth().login({ email, password })`.
2. **Nitro Validates**:
   `server/api/auth/login.post.ts` verifies password against bcrypt hash in `server/utils/db.ts`.
3. **Tokens Issued**:
   Nitro issues a short-lived Access Token (1h) and long-lived Refresh Token (7d).
4. **Session Persisted**:
   Tokens are stored in cookies and memory, attaching `Authorization: Bearer <token>` to future requests.
