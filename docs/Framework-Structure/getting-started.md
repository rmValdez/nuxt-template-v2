# Getting Started with Nuxt 3 Master Template

## Prerequisites
- Node.js 18+ or 20+
- pnpm 9.x (`npm install -g pnpm@9`)

---

## 1. Quick Start

```bash
# Clone and install dependencies
cd nuxt-template-v2
pnpm install

# Start development server
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. Default Seed Accounts

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `password123` | Full access (Users, Posts, Dashboard, Settings) |
| **Manager** | `alex@example.com` | `password123` | Content & user read access |
| **Member** | `user@example.com` | `password123` | Content creation & dashboard view |

---

## 3. Connecting to External Frontends

To allow `vue-template-v3` or `angular-template-v4` to consume Nuxt 3's backend:
1. Ensure Nuxt 3 dev server is running on port `3000`.
2. In your frontend client `.env`, set:
   ```env
   VITE_API_BASE_URL="http://localhost:3000/api"
   VITE_ENABLE_MOCK_API=false
   ```
3. All requests from your frontend will now be processed by Nuxt 3's Nitro backend!
