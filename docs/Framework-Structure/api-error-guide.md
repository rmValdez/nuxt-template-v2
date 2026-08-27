# API Error Handling Guide — Nitro Server & Nuxt 3

This document specifies the standard error response format, HTTP status codes, and client classification strategy used in `nuxt-template-v2`.

---

## 1. Standard Error Format

All Nitro server errors return normalized JSON payloads:

```json
{
  "statusCode": 401,
  "statusMessage": "Unauthorized: Invalid or expired token",
  "data": {
    "code": "AUTH_EXPIRED",
    "details": "JWT verification failed"
  }
}
```

---

## 2. HTTP Status Code Mapping

| Status Code | Type | Meaning & Action |
| :--- | :--- | :--- |
| **400** | Bad Request | Zod request validation failure. Check submitted fields. |
| **401** | Unauthorized | Missing or expired token. Redirect to login. |
| **403** | Forbidden | Insufficient RBAC role permissions. |
| **404** | Not Found | Target entity (user, post) does not exist. |
| **409** | Conflict | Duplicate entity (e.g., email already registered). |
| **500** | Internal Error | Unhandled server exception. Logged to telemetry. |

---

## 3. Server Exception Throwing Pattern

In Nitro endpoints, always use `createError`:

```ts
import { createError, defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  if (!isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Failed',
      data: { field: 'email', issue: 'Invalid format' }
    });
  }
});
```
