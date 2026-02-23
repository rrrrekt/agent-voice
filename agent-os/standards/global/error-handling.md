# Error Handling Standards

## Core Philosophy
**Fail Fast, Fail Loud.**
Silent failures are the enemy of autonomous agents. If something goes wrong, the system must know immediately to attempt recovery or halt.

## Standards
1.  **No Empty Catch Blocks**:
    *   ❌ `catch (e) {}`
    *   ✅ `catch (e) { Logger.error(e); throw e; }`

2.  **Typed Errors**: Create custom error classes for domain-specific failures (e.g., `MastraAgentConnectionError`, `TaskParsingError`).

3.  **Boundary Protection**:
    *   **Extension**: Wrap command executions in `try/catch` and show user-friendly error messages via `vscode.window.showErrorMessage`.
    *   **React**: Use Error Boundaries (already implemented) to prevent white screens.

4.  **Logging**:
    *   Log all errors to the Output Channel.
    *   Include context (e.g., `[ZeroGravity] Failed to parse prompt: <error_details>`).

5.  **Recovery**:
    *   For external API calls (LLM, Network), implement **retry logic** with exponential backoff.
    *   Do not crash the extension for a single failed API request.
