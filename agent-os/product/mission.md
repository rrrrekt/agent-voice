# Product Mission — boiler-express-api

## Pitch
`boiler-express-api` is a production-ready Express API boilerplate that helps developers ship backend services fast by providing a solid, opinionated foundation with auth, database access, validation, logging, and Docker — all wired together and TypeScript-strict from day one.

## Users

### Primary Customers
- **Solo developers / indie hackers**: Need a reliable starting point without weeks of setup
- **Small product teams**: Want a consistent, auditable baseline for new microservices
- **AI coding agents (Zerogravity workers)**: Consume this as the canonical scaffold when spawning new backend instances

### User Personas

**The Pragmatist** (25–45)
- **Role:** Full-stack or backend developer
- **Context:** Building a new SaaS product, internal tool, or microservice under time pressure
- **Pain Points:** Auth boilerplate is tedious; every project starts with the same 3 days of wiring; inconsistent error handling across services
- **Goals:** Clone → configure → ship in under an hour; confidence the baseline is production-safe

**The Zerogravity Worker** (AI agent)
- **Role:** Coding agent spawned by the orchestrator
- **Context:** Given a task to build a new feature on top of this boilerplate
- **Pain Points:** Unfamiliar project layout slows initial orientation; inconsistent conventions cause drift
- **Goals:** Read AGENT.md, understand the structure, execute tasks without ambiguity

## The Problem

### Repetitive, Fragile Bootstrapping
Every new Express service starts with the same slog: set up TypeScript, wire Postgres, add JWT auth, configure Zod validation, add Pino logging, containerize. Done wrong, it introduces security holes (no helmet, weak JWT handling) or architectural debt (no service layer, fat routes). The average developer loses 2–4 days per new service.

**Our Solution:** A single `git clone` yields a fully wired, production-safe Express API ready for feature development.

## Differentiators

### Zerogravity-Native
Unlike generic boilerplates, this repo ships with `AGENT.md`, `tasks.md`, and `agent-os/` — meaning a Zerogravity worker can pick it up autonomously and immediately start executing tasks with zero orientation cost.

### Strict by Default
TypeScript strict mode, Zod env validation on startup (fail-fast), Drizzle ORM (no magic), and a global error handler that never leaks internals. Opinionated where it matters; extensible everywhere else.

## Key Features

### Core Features
- **Auth out of the box:** Register, login, refresh, logout, and `/me` with JWT access tokens + DB-persisted refresh tokens (30-day rotation)
- **Type-safe DB access:** Drizzle ORM with explicit schema — no surprises, migrations you own
- **Fail-fast env validation:** Zod parses and validates all env vars at startup; bad config surfaces immediately, not at runtime
- **Structured logging:** Pino with pretty-print in dev, JSON in prod — request IDs propagated automatically

### Reliability Features
- **Global error handler:** `AppError` + Zod errors caught centrally; no accidental 500s leaking stack traces
- **Graceful shutdown:** SIGTERM/SIGINT handled; DB pool drained cleanly before exit
- **Docker-first:** Multi-stage Dockerfile + docker-compose with Postgres healthcheck

### Developer Experience
- **Hot reload dev server:** `tsx watch` — no manual restarts during development
- **Drizzle Studio:** Visual DB browser via `npm run db:studio`
- **Agent-OS ready:** AGENT.md, tasks.md, and agent-os/ scaffold included for AI-assisted development
