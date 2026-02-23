# Product Roadmap — boiler-express-api

1. [ ] **Rate Limiting** — Add global + per-route rate limiting via `express-rate-limit`; protect auth endpoints with a tight limit (5 req/15min), apply a looser global limit; return `429` with a `Retry-After` header. `S`

2. [ ] **Request ID Middleware** — Inject a `x-request-id` header (generate via `crypto.randomUUID()` if absent) into every request and propagate it through all Pino log entries so distributed traces are traceable end-to-end. `XS`

3. [ ] **Items Resource (CRUD)** — Full CRUD resource (`/api/v1/items`) owned by the authenticated user: Drizzle schema, service layer, router, Zod validation, and integration tests. Demonstrates the canonical pattern for adding new domain resources. `M`

4. [ ] **Pagination Utility** — Implement a reusable `paginate(baseQuery, { page, limit })` helper that returns `{ data, meta: { page, limit, total, totalPages } }`; integrate with the items list endpoint. `S`

5. [ ] **Integration Test Suite** — Vitest integration tests for all auth endpoints against a real Postgres instance (no mocks); test register, login, refresh, logout, /me, and error cases (duplicate email, bad password, expired token). `M`

6. [ ] **GitHub Actions CI** — On every push and PR: run `typecheck`, `lint`, and integration tests in Docker Compose; gate merges on green; publish a test coverage summary as a PR comment. `S`

7. [ ] **Admin Role Middleware** — Add `requireRole('admin')` guards to protected routes; seed script for creating the first admin user; admin-only endpoint (`GET /api/v1/admin/users`) with pagination. `S`

8. [ ] **Email Verification Flow** — On register, send a verification email with a signed token (nodemailer + SMTP env vars); `POST /auth/verify-email` endpoint that activates the account; unverified users blocked from protected routes. `L`

> Notes
> - Items 1–2 are infrastructure; complete before domain features
> - Item 3 (Items CRUD) is the reference implementation pattern — all future resources should mirror it
> - Item 5 (tests) should be written alongside Item 3, not after
> - Order respects technical dependencies: rate limiting before exposure; request IDs before observability matters
