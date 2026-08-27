<div align="center">
  <img src="https://nuxt.com/assets/design-kit/icon-green.svg" alt="Nuxt Logo" width="120" height="120" />
  <h1>Nuxt 3 Nitro Master Template</h1>
  <p>An enterprise-grade Nuxt 3 template featuring fullstack Nitro JWT authentication, RBAC, Pinia, and Tailwind CSS.</p>
</div>

---

## ✨ Features

- **Framework**: [Nuxt 3.15+](https://nuxt.com/) with SSR & standalone Nitro backend engine
- **Authentication**:
  - `POST /api/auth/login` (Bcrypt comparison + JWT access & refresh tokens)
  - `POST /api/auth/register` (Password hashing + new tenant onboarding)
  - `GET /api/auth/me` (Bearer token user payload extraction)
  - `POST /api/auth/refresh` (Token rotation)
  - `POST /api/auth/logout` (Session invalidation)
- **CORS Support**: Cross-Origin resource sharing pre-configured for Vue 3 SPA (`localhost:5173`)
- **State Management**: `@pinia/nuxt`
- **Styling**: Tailwind CSS & `@vueuse/core` dark/light modes
- **Package Manager**: `pnpm`

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Nuxt Server
```bash
pnpm dev
```
The server will start on `http://localhost:3000`.

---

## 🔗 Connecting from `vue-template-v3`

Set the environment in `vue-template-v3/.env`:
```env
VITE_API_BASE_URL="http://localhost:3000/api"
VITE_ENABLE_MOCK_API=false
```
Your Vue 3 frontend will now authenticate directly against Nuxt 3's backend API!
