# Testing Standards

## Frameworks
*   **Unit**: Vitest
*   **Integration**: Mocha (VS Code Host)

## The Golden Rule: NO MOCKING
**We rely on "Sociable" Unit Tests.**
*   **Avoid**: Mocking internal dependencies or libraries just to isolate a function.
*   **Prefer**: Testing the *behavior* of the system using real instances where possible.
*   **Exception**: Use *Fakes* (lightweight, working implementations) for external IO (e.g., FileSystem, Network, LLM API) to keep tests fast and deterministic.

## Test Structure
*   **Arrange**: Setup the state (create a temporary workspace, config).
*   **Act**: Execute the command or function.
*   **Assert**: Verify the *outcome* (file created, state changed), not the *implementation details*.

## LLM Testing
*   **Do not** make live calls to LLMs in unit tests.
*   Use a **Fake LLM Provider** that returns deterministic responses to verify prompt construction and response parsing.
