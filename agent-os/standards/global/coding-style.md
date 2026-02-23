# Coding Style & Conventions

## General Principles
1.  **Strict Typing**: `any` is forbidden. Use `unknown` if necessary, but prefer strict Zod schemas or Interfaces.
2.  **Functional over Object-Oriented**: Prefer pure functions and composition over deep class hierarchies.
3.  **Immutability**: Treat data as immutable by default. Use `const` everywhere.

## TypeScript Standards
*   **Interfaces**: Use `interface` for public APIs and data shapes. Use `type` for unions and primitives.
*   **Async/Await**: Use `async/await` exclusively. **Do not** use raw `.then()` chains.
*   **Naming**:
    *   `PascalCase` for Classes, Components, and Interfaces.
    *   `camelCase` for variables, functions, and instances.
    *   `UPPER_CASE` for constants.
*   **Exports**: Prefer Named Exports over Default Exports to ensure consistent naming across imports.

## React (Webview)
*   **Functional Components**: Class components are forbidden.
*   **Hooks**: Custom logic must be extracted into custom hooks (`useSomeLogic`).
*   **Styles**: Use Tailwind utility classes. Avoid inline `style={{ ... }}` props.

## Project Specifics
*   **Path Aliases**: Use absolute imports (if configured) or consistent relative paths.
*   **No Magic Numbers**: Extract magic numbers and strings into named constants.
