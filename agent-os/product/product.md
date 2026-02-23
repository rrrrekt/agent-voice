# Product Strategy: Zero Gravity

## Product Vision
Zero Gravity is an **Autonomous Agent Orchestrator** centered on _M_, an always-on Mastra supervisor. Instead of waiting for one-off prompts, _M_ continuously observes project state, delegates work to workers, reviews delivered outputs, and drives execution forward until task outcomes are complete.

Execution model: _M_ runs primarily in the CLI as the **global control plane**, while extension-side governors run on each worker instance as the **local governance plane**.

## Unique Value Proposition
*   **Vigilant Supervision**: _M_ maintains helicopter view across projects and keeps execution alive continuously.
*   **Delegation + Review Loop**: _M_ assigns work to workers, validates delivery quality, and re-delegates when criteria are not met.
*   **Dual-Layer Governance**: Extension governors independently verify local execution health and quality on behalf of _M_.
*   **Task-Driven Autonomy**: It ingests `tasks.md` as the canonical work graph and advances state with explicit checkpoints.
*   **Zero-Config Onboarding**: Drops into any project with a `tasks.md` and starts orchestration immediately.

## Target Audience
*   **Developers**: Any developer (Junior to Senior) who organizes work with `tasks.md`.
*   **Teams**: Who need to offload routine implementation execution to trusted agents.

## Strategic Priorities (Next 30 Days)

### 1. Persistent _M_ Oversight
*   **Goal**: Keep _M_ running as a continuous supervisor loop over task state and worker activity.
*   **Metric**: Mean autonomous supervision duration without manual recovery.

### 2. Delegation and Quality Gate Loop
*   **Goal**: Enforce a reliable `delegate → deliver → review → accept/rework` cycle.
*   **Metric**: First-pass acceptance rate and rework turnaround time per task.

### 3. Fleet Pulse and Reliability
*   **Goal**: Maintain continuous pulse and health visibility across worker instances.
*   **Metric**: Heartbeat uptime, reclaim time on worker loss, and degraded-mode recovery rate.

### 4. Frictionless Onboarding
*   **Goal**: "Drop-in" compatibility.
*   **Requirement**: No complex config. Detect `tasks.md`, ingest rules, and go.

### 5. Remote Command
*   **Feature**: A dashboard to monitor and remote-control distributed Antigravity instances.
*   **Use Case**: Managing multiple workers while _M_ maintains project-level control and prioritization.

## Initial Fleet Topology (v1)

- Host A (`rekt@rektbox`): 2 VS Code workers + 1 Antigravity worker
- Host B (`sunai@vouwai`): 2 VS Code workers + 1 Antigravity worker
- Total: 6 worker instances under one _M_ supervisor

## Transport Evolution Strategy

1. **File Bus (current baseline):** inbox/outbox queues for local reliability.
2. **LAN Streaming Bus (next):** broker-backed topics for fleet heartbeat and task events.
3. **Federated Multi-Network (future):** mTLS relays and signed envelopes across network boundaries.
