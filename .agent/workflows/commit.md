---
description: Stage all changes, generate a compact commit message, and push to remote
---

1. Stage all changes
// turbo
git add $(git rev-parse --show-toplevel) && sleep 3

2. Analyze changes and commit
   - Run `git diff --cached --stat` to see what changed.
   - Generate a concise, compact commit message based on these changes.
   - Run `git commit -m "<your-message>" && git push` (Replace <your-message> with your generated message).
