# Browser Setup & NotebookLM CLI for Agent Operations

**Created:** 2026-02-05
**Updated:** 2026-02-05
**Purpose:** How to spawn browser instances and use NotebookLM CLI

---

## Quick Reference

### Check if browser is available
```bash
curl -s http://localhost:9231/json | head -10
```

### Spawn authenticated Chrome browser
```bash
cd /ws/zerogravity && ./browser.sh ag
```

This spawns an **already authenticated** Chrome browser on **port 9231**.

---

## Port Assignments

| Port | Purpose |
|------|---------|
| 9000 | VSCode/AntiGravity (ANTI BROWSER - where agent lives) |
| 9230 | Agent's controllable browser (YOUR BROWSER) - screenshots |
| 9231 | Authenticated Chrome via `./browser.sh ag` |
| 9222 | Container Chrome (may not be accessible from host) |

---

## Browser Usage Pattern

1. **Always check port 9231 first** before trying to spawn
2. If not available, run: `cd /ws/zerogravity && ./browser.sh ag`
3. Wait 2-3 seconds for browser to start
4. Verify with: `curl -s http://localhost:9231/json`

---

## NotebookLM CLI (`nlm`)

**Location:** `/ws/zerogravity/notebooklm-mcp-cli`
**Run with:** `uv run nlm <command>`

### Auth Setup
Cookies go in: `~/.notebooklm-mcp-cli/profiles/default/cookies.json`
- Must be **just the cookies object**, not `{cookies: {...}}`
- Check auth: `uv run nlm login --check`

### Key Commands

```bash
# Check auth
uv run nlm login --check

# List notebooks
uv run nlm notebook list

# Create notebook
uv run nlm notebook create "Title Here"

# Add source (URL)
uv run nlm source add <notebook-id> --url "https://example.com" --wait

# Add source (text)
uv run nlm source add <notebook-id> --text "Content here" --title "Title"

# Add source (file)
uv run nlm source add <notebook-id> --file document.pdf --wait

# Add source (YouTube)
uv run nlm source add <notebook-id> --youtube "https://youtube.com/watch?v=xxx"

# Query notebook
uv run nlm query <notebook-id> "Your question here"

# Get notebook description
uv run nlm describe notebook <notebook-id>
```

### Extract Cookies from Browser (port 9231)
```bash
cd /ws/zerogravity && node << 'EOF'
const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');

async function main() {
  const targets = await new Promise((resolve, reject) => {
    http.get('http://localhost:9231/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  let target = targets.find(t => t.type === 'page' && !t.url.startsWith('chrome'));
  if (!target) target = targets[0];

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 1;

  ws.on('open', () => {
    ws.send(JSON.stringify({
      id: id++,
      method: 'Page.navigate',
      params: { url: 'https://notebooklm.google.com' }
    }));
  });

  ws.on('message', (data) => {
    const msg = JSON.parse(data);
    if (msg.id === 1) {
      setTimeout(() => {
        ws.send(JSON.stringify({
          id: id++,
          method: 'Network.getCookies',
          params: { urls: ['https://notebooklm.google.com'] }
        }));
      }, 4000);
    } else if (msg.id === 2 && msg.result) {
      const cookieObj = {};
      msg.result.cookies.forEach(c => { cookieObj[c.name] = c.value; });
      fs.writeFileSync('/tmp/nlm-cookies.json', JSON.stringify(cookieObj, null, 2));
      console.log('Saved', Object.keys(cookieObj).length, 'cookies');
      ws.close();
      process.exit(0);
    }
  });
}
main().catch(console.error);
EOF

# Then copy to profile:
mkdir -p ~/.notebooklm-mcp-cli/profiles/default
cp /tmp/nlm-cookies.json ~/.notebooklm-mcp-cli/profiles/default/cookies.json
```

---

## DO NOT

- Don't launch random Chrome instances with `flatpak run`
- Don't assume port 9222 is accessible (may be in container)
- Don't try to authenticate interactively - use the pre-authenticated browser
- Don't wrap cookies in `{cookies: {...}}` - save the raw object
