# Project Knowledge Base Setup Guide

**Purpose**: Instructions on how to add the Standardized Knowledge Base structure to a specific Project Workspace (`/ws/<project>/`).

## When to use
Use this when you enter a project that lacks an `AGENTS.md` or `.agent/` directory, and you need to establish a persistent brain for that specific project.

## Steps

1.  **Create Directory Structure**:
    ```bash
    mkdir -p .agent/{knowledge,secrets,skills,workflows}
    ```

2.  **Create Project Root `AGENTS.md`**:
    *   Create `AGENTS.md` in the project root.
    *   Content should define:
        *   **Project Name & Goal**: What is this repo?
        *   **Tech Stack**: Key technologies used.
        *   **Pointers**: Link to `.agent/knowledge/INDEX.md`.

3.  **Create Local Smart Index**:
    *   Create `.agent/knowledge/INDEX.md`.
    *   Add rows for project-specific docs (e.g., `../docs/api.md`, `../tasks.md`).

4.  **Copy/Symlink Workflows (Optional)**:
    *   If the project uses standard workflows (e.g., specific deploy scripts), put them in `.agent/workflows/`.

## Protocol Reminder
Once this is set up, Agents operating in this directory will prioritize:
`.agent/knowledge/INDEX.md` (Local) **BEFORE** `~/.agent/knowledge/INDEX.md` (Global).
