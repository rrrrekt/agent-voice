# Antigravity Tool Usage Guidelines

This document provides a comprehensive reference for the tools available to the Antigravity agent.
It is designed to ensure efficient, safe, and correct usage of the available capabilities.

## 📚 Table of Contents

1.  [File Editing & Manipulation](./FILE-EDIT-GUIDELINES.md) (Detailed Guide)
2.  [File Exploration & Search](#file-exploration--search)
3.  [Terminal & Command Execution](#terminal--command-execution)
4.  [Browser & Web Access](#browser--web-access)
5.  [Task Management & Communication](#task-management--communication)
6.  [Miscellaneous](#miscellaneous)

---

## File Exploration & Search

Before editing any file, you must understand the repository structure and file contents.

### `list_dir`
*   **Purpose:** Lists the contents of a directory (files and subdirectories).
*   **Usage:** Use this to explore standard paths or find where specific components are located.
*   **Best Practice:** Always start with `list_dir` on unfamiliar directories to avoid guessing
    paths.

### `view_file`
*   **Purpose:** Reads the content of a file.
*   **Usage:** Mandatory before any edit. Supports reading specific line ranges (`StartLine`,
    `EndLine`) for large files.
*   **Limit:** Can view up to 800 lines at a time.
*   **Best Practice:** Always read the *latest* version of a file before applying changes to ensure
    your `TargetContent` for edits is accurate.

### `view_file_outline`
*   **Purpose:** Detailed breakdown of classes and functions in a file.
*   **Usage:** Best first step when exploring a new, large source file.
*   **Benefit:** Helps you understand the structure without reading thousands of lines of code.

### `view_code_item`
*   **Purpose:** View specific functions or classes by name (e.g., `Class.method`).
*   **Usage:** Localized inspection of specific code symbols found via search.

### `find_by_name`
*   **Purpose:** Finds files based on glob patterns (e.g., `**/*.ts`).
*   **Usage:** Locating files when you know the name but not the path.

### `grep_search`
*   **Purpose:** Searches for text patterns (regex or literal) within files.
*   **Usage:** Finding usage examples of a function, locating where a variable is defined, or
    finding TODOs.
*   **Best Practice:** Use specific queries to avoid overwhelming results (capped at 50).

---

## Terminal & Command Execution

Executes shell commands in the user's environment.

### `run_command`
*   **Purpose:** Runs a shell command (Linux/Bash).
*   **Usage:** Building projects (`npm run build`), running tests, git operations, etc.
*   **Key Parameters:**
    *   `SafeToAutoRun`: Set `true` *only* for non-destructive commands (e.g., `ls`, `cat`,
        `grep`).
*   **Constraint:** Never use `cd`. Always specify `Cwd`.

### `command_status`
*   **Purpose:** Checks the output and status of a backgrounded command.
*   **Usage:** Polling for build completion or checking long-running test logs.

### `send_command_input`
*   **Purpose:** Interacts with a running process.
*   **Usage:** Sending "y" to a prompt, interacting with a REPL, or terminating a hung process.
*   **Parameters:** `Input` (string to send) or `Terminate` (boolean to kill).

---

## Browser & Web Access

Antigravity has full browser capabilities for research and verification.

### `browser_subagent`
*   **Purpose:** Spawns a sub-agent to control a real Chrome browser.
*   **Usage:** End-to-end testing, verifying UI changes, filling forms, and navigating complex web
    apps.
*   **Capabilities:** Clicking, typing, scrolling, capturing screenshots.
*   **Files:** Session recordings are saved as artifacts.

### `read_url_content`
*   **Purpose:** Fetches the text content of a URL (headless).
*   **Usage:** Quickly reading documentation pages, API specs, or static sites.
*   **Limitation:** No JavaScript interaction. Use `browser_subagent` for dynamic sites.

### `search_web`
*   **Purpose:** Google Search.
*   **Usage:** Finding documentation, resolving error messages, or researching libraries.

---

## Task Management & Communication

Managing the agent's workflow and communicating with the user.

### `task_boundary`
*   **Purpose:** Defines the structure of the work.
*   **Usage:** Call at the start of every major step (Planning, Execution, Verification).
*   **Fields:** `TaskName` (Header), `TaskStatus` (Current Action), `TaskSummary` (Progress).
*   **Rule:** Always keep `tasks.md` in sync with these updates.

### `notify_user`
*   **Purpose:** The *only* way to send a visible message to the user during a task.
*   **Usage:**
    *   Asking clarifying questions.
    *   Requesting review of files (`PathsToReview`).
    *   Reporting completion.
*   **Constraint:** Exits "Task Mode". You must assume work stops until the user replies.

---

## Miscellaneous

### `generate_image`
*   **Purpose:** Creates or edits images using AI.
*   **Usage:** UI mockups, generating assets, or visual explorations.

### `list_resources` / `read_resource`
*   **Purpose:** Accessing MCP (Model Context Protocol) resources.
*   **Usage:** Reading external data or context provided by attached MCP servers.
