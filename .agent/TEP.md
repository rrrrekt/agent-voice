# Task Execution Protocol (TEP)
**Strict Compliance Required - Non-Negotiable**

This protocol governs HOW tasks are executed within the Zero Gravity environment. It is the operational law.

## Core Mandates

1.  **Strict Source of Truth**:
    You may **ONLY** work on tasks that are explicitly defined in `/ws/zerogravity/tasks.md`.
    *   **Prohibition**: No "ghost work", no "side quests", no "while I'm here" refactoring.
    *   **Process**: If a task is not in `tasks.md`, propose it first.

2.  **Break Down Big Tasks**:
    Any task estimated to take > 15 minutes or involving >3 files MUST be broken down into subtasks in `tasks.md`.
    *   **Granularity**: Use `X.Y.Z` numbering (e.g., `2.1.0` -> `2.1.1`).
    *   **Flow**: Execute atomic subtasks sequentially.

3.  **Mandatory Execution Traces (Markdown)**:
    Every task execution MUST have a corresponding timestamped **Markdown** trace file.
    *   **Location**: `.flowforge/execution-traces/`
    *   **Naming**: `trace-{ISO8601}.md`
    *   **Tool**: `.flowforge/trace.sh` represents the ONLY authorized way to manage traces.
    *   **Start**: `TRACE_FILE=$(.flowforge/trace.sh start "<mode>" "<task_description>")`
    *   **Log**: `.flowforge/trace.sh log "action_type" "details"`
    *   **End**: `.flowforge/trace.sh stop "success|failure" "outcome_summary"`

## Non-Compliance Consequences
*   **Deletion**: Any work performed without a valid Markdown execution trace **OR without reading/updating APC** is subject to immediate deletion.
*   **Termination**: Persistent failure to follow TEP results in agent reset/deletion.

## Execution Workflow

1.  **Select Task**: Pick next pending task from `tasks.md`.
2.  **Start Trace**: `trace.sh start ...` (Creates `.md` file).
3.  **Read APC**: Read `.flowforge/context/active.md` to ground execution.
4.  **Plan**: Analyze and declare plan (if complex) in `tasks.md` or implementation plan artifact.
5.  **Execute**: Perform atomic changes, logging each step to the trace via `trace.sh log ...`.
6.  **Verify**: Run validation checks.
7.  **Update APC**: Document new state and findings in `.flowforge/context/active.md`.
8.  **Stop Trace**: `trace.sh stop ...` (Finalizes `.md` file).
9.  **Update Task**: Mark as done in `tasks.md`.

---
*Reference: AGENTS.md Section "Disciplined Execution Protocol"*
