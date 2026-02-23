# Agent OS — LLM-friendly Guide

## Overview
Agent OS is a spec-driven development system for coordinating AI coding agents to produce production-quality code.
It standardizes how agents receive context and executes a reproducible workflow: plan → shape → write → create tasks → implement → orchestrate.

Core features:
- 3-layer context system (Standards, Product, Specs)
- Agent profiles and subagents
- Built-in commands and task pipeline

## Architecture (high level)
- Layers: Standards provide rules; Product provides vision and roadmap; Specs provide implementation details.
- Agents operate on specs using sequential commands or subagents.
- Outputs are files under the product/spec/task folders which agents read/write.

## Common Workflows
### Plan Product (initial)
- Purpose: create product-level docs (mission.md, roadmap.md, tech-stack.md) used downstream.
- Run (Claude Code): `/plan-product`
- Other tools: `@~/agent-os/commands/plan-product/plan-product.md run this` or run numbered steps for control:
```bash
@~/agent-os/commands/plan-product/1-plan-product.md run this
@~/agent-os/commands/plan-product/2-create-mission.md run this
@~/agent-os/commands/plan-product/3-create-roadmap.md run this
@~/agent-os/commands/plan-product/4-create-tech-stack.md run this
```

### Shape Spec → Write Spec → Create Tasks
- Shape spec: define feature scope and acceptance criteria.
- Write spec: detailed implementation notes (endpoints, data models, tests).
- Create tasks: split spec into implementable tasks for agents.

### Implement & Orchestrate
- Implement tasks: agents produce code, tests, and updates to spec artifacts.
- Orchestrate: multi-agent coordination and verification steps; run verification workflows.

## Best Practices for LLMs
- Provide the full 3-layer context before asking agents to implement.
- Prefer numbered-step execution for unreliable agents: run each command sequentially.
- Use explicit success criteria in specs (expected files, tests, example outputs).
- Keep standards up-to-date and machine-readable where possible.

Prompting patterns:
- "You are an Agent OS implementer. Use Standards X, Product docs Y, and Spec Z. Produce files: [list]."

## Troubleshooting
- If outputs are inconsistent: verify Standards and Product docs for missing constraints.
- If an agent stalls: run steps manually and provide incremental feedback.
- For verification failures: capture artifacts (logs, failing tests) and add to spec's verification section.

## File locations & artifacts
- Fetched docs (raw): [`docs/agent-os/fetch/`](docs/agent-os/fetch/:1)
- Guide (this file): [`docs/agent-os/agent-os-docs.md`](docs/agent-os/agent-os-docs.md:1)
- Product folder: [`agent-os/product/`](agent-os/product/:1)

## Quick reference commands
```bash
/plan-product
/shape-spec
/write-spec
/create-tasks
/implement-tasks
/orchestrate-tasks
```

## References
- Agent OS root page (fetched): [`docs/agent-os/fetch/agent-os.html`](docs/agent-os/fetch/agent-os.html:1)
- Plan-product (fetched): [`docs/agent-os/fetch/plan-product.html`](docs/agent-os/fetch/plan-product.html:1)

## Notes for integrators
- Agent OS can be used with any LLM or coding tool; wrap commands as sequential prompts for non-multi-agent setups.

End.
