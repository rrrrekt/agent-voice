# Tech Stack — boiler-express-api

## Framework & Runtime
- **Application Framework:** Express 4
- **Language:** TypeScript 5 (strict mode: `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- **Runtime:** Node.js 22 (LTS)
- **Package Manager:** npm

## Backend
- **HTTP Framework:** Express 4 (`express`)
- **Validation:** Zod — env vars (fail-fast on startup) + request body validation
- **Authentication:** JSON Web Tokens (`jsonwebtoken`) — short-lived access tokens + DB-persisted refresh tokens
- **Password Hashing:** bcryptjs (rounds configurable via env)
- **Security:** `helmet` (HTTP headers), `cors` (configurable origin)

## Database & Storage
- **Database:** PostgreSQL 17
- **ORM:** Drizzle ORM (`drizzle-orm`) — type-safe, migration-first, no magic
- **DB Client:** `pg` (node-postgres) with connection pool (`Pool`)
- **Migrations:** `drizzle-kit generate` → `tsx src/db/migrate.ts`
- **Schema location:** `src/db/schema.ts`

## Logging & Observability
- **Logger:** Pino (`pino` + `pino-http`) — structured JSON in prod, pretty-print in dev
- **Log level:** Configurable via `LOG_LEVEL` env var

## Testing & Quality
- **Test Framework:** Vitest
- **Linting:** ESLint (`@typescript-eslint/*`)
- **Type checking:** `tsc --noEmit`
- **No mocking** — all tests run against real services or recorded traces (policy since 2025-11-24)

## Deployment & Infrastructure
- **Containerisation:** Docker (multi-stage Dockerfile) + Docker Compose
- **Compose services:** `api` + `db` (Postgres with healthcheck)
- **Graceful shutdown:** SIGTERM/SIGINT → drain pool → exit 0

## Developer Experience
- **Dev server:** `tsx watch src/index.ts` (hot reload)
- **DB GUI:** Drizzle Studio (`npm run db:studio`)
- **Build:** `tsc` → `dist/`
- **Start:** `node dist/index.js`

## Agent-OS Integration
- **Agent constitution:** `AGENT.md`
- **Task list:** `tasks.md`
- **Product docs:** `agent-os/product/` (mission, roadmap, tech-stack)
- **Standards:** `agent-os/standards/` (global, backend, testing)
- **Compatible with:** Zerogravity worker orchestration
