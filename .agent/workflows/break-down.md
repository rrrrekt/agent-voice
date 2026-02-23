---
description: Break down a plan or a roadmap item or a high level project goal
---

Input is a <plan> or a <roadmap-item> or a <high level goal>, regardless which one we put it in <source>.
We then read <source> with high level definitions and break them down in 2 rounds:
1. Break down this <source> into <big tasks> and give them a development time estimation in minutes.
2. Foreach <big task> that takes > 30m to build: break it down into smaller <tasks>. Loop if > 30m and break again.

Create subtasks that are:
1. Atomic and self-contained
2. Can be completed in < 30 minutes each
3. Have clear completion criteria

Output format:
Numbered and checkable with nested sub.
- [ ] **1.0.0**: EX: Verify Dependencies and Ship Extension
  - [ ] **1.1.0**: EX: Identify missing transitive dependencies
    - [x] **1.1.1**: EX: Inspect `@libsql/*` and `libsql` dependencies
...

_Include acceptance criteria for each task. On completion, make sure proof is available via a proof command._
Append the task with subtasks to [tasks.md](/ws/zerogravity/tasks.md), no explanations.
