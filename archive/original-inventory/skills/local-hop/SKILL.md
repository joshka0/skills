---
name: local-hop
description: Manage the local-hop dev proxy setup -- Tailscale exit node, Serve for HTTPS remote browsers, SOCKS proxy, and secure isolated browsing through the dev machine.
triggers:
  - local-hop
  - hop
  - exit node
  - SOCKS proxy
  - kasm
  - remote browser
  - browse through dev
  - tailscale serve
---

# local-hop Skill

Manage the **local-hop** secure proxy and remote browser system.

## Architecture

```
Mac (this machine)
  ↓ Tailscale VPN (encrypted)
dev-machine (Ubuntu, 100.108.103.115)
  ↓ 127.0.0.1 only (loopback)
  kasmweb containers (KasmVNC)
  ↓ Tailscale Serve (TLS termination, tailnet only)
  https://dev-machine.tailbf79e9.ts.net → valid certs, no warnings
```

**Key principle:** Containers bind to `127.0.0.1` only. Tailscale Serve exposes them to the tailnet with valid HTTPS. Never use Funnel.

## Access URLs (all tailnet-only, valid Tailscale certs)

| Service | URL | Login |
|---------|-----|-------|
| Desktop | `https://dev-machine.tailbf79e9.ts.net` | `kasm_user` / `localhop` |
| Firefox | `https://dev-machine.tailbf79e9.ts.net:6081` | `kasm_user` / `localhop` |
| Chrome | `https://dev-machine.tailbf79e9.ts.net:6082` | `kasm_user` / `localhop` |
| Brave | `https://dev-machine.tailbf79e9.ts.net:6083` | `kasm_user` / `localhop` |

**Read-only viewer:** `kasm_viewer` / `localhop`

## Key Paths

| Item | Path |
|------|------|
| Repo | `~/repos/personal/local-hop` |
| Dev SSH alias | `ssh dev` (Tailscale SSH) |
| Dev Tailscale IP | `100.108.103.115` |
| Dev Tailscale domain | `dev-machine.tailbf79e9.ts.net` |
| PAC file (Mac) | `~/.local-hop/proxy.pac` |

## Mac Quick Commands

In `~/.zshrc`:

- `hop-socks` -- Start SOCKS5 proxy on `:1080`
- `hop-socks-kill` -- Stop SOCKS5 proxy
- `hop-exit` -- Route ALL traffic via dev-machine (Tailscale exit node)
- `hop-exit-off` -- Stop using exit node
- `hop-novnc` -- Open desktop browser

## Security Model

```
App binds 127.0.0.1 only
  → Tailscale Serve (private TLS termination)
  → Funnel DISABLED
  → UFW allows SSH + Tailscale range only
  → Kasm app-level auth on every service
```

### Rules
1. **Never use Funnel** -- Serve only (`tailscale serve`, never `tailscale funnel`)
2. **Containers bind 127.0.0.1** -- never 0.0.0.0
3. **App-level auth** -- kasm_user/kasm_viewer login on all services
4. **UFW firewall** -- SSH (22) + Tailscale range (100.64.0.0/10) + loopback
5. **Never expose** Docker sockets, DB consoles, .env viewers, admin panels
6. **Check before changes:** `tailscale serve status`

## Common Tasks

### Start the SOCKS proxy (selective routing)
```bash
hop-socks
# Configure browser: SOCKS5 at 127.0.0.1:1080
# Or use PAC file: file:///Users/joshka/.local-hop/proxy.pac
```

### Use dev-machine as exit node (ALL traffic)
```bash
hop-exit       # enables
hop-exit-off   # disables
```

### Open a remote browser
```bash
# Desktop
open https://dev-machine.tailbf79e9.ts.net
# Firefox
open https://dev-machine.tailbf79e9.ts.net:6081
# Chrome
open https://dev-machine.tailbf79e9.ts.net:6082
# Brave
open https://dev-machine.tailbf79e9.ts.net:6083
```

### Check dev-machine service status
```bash
ssh dev 'docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"'
```

### Check Tailscale Serve status
```bash
ssh dev 'sudo tailscale serve status'
```

### Restart a container on dev
```bash
ssh dev 'docker restart kasm-desktop'   # Desktop
ssh dev 'docker restart kasm-firefox'   # Firefox
ssh dev 'docker restart kasm-chrome'    # Chrome
ssh dev 'docker restart kasm-brave'     # Brave
```

### Control browser via xdotool (inside container)
```bash
# Open URL in active browser
ssh dev 'docker exec -e DISPLAY=:1 kasm-firefox xdotool key ctrl+l'
ssh dev 'docker exec -e DISPLAY=:1 kasm-firefox xdotool type --clearmodifiers --delay 50 "https://example.com"'
ssh dev 'docker exec -e DISPLAY=:1 kasm-firefox xdotool key Return'
```

### Add/remove a Tailscale Serve endpoint
```bash
# Add: expose a local service privately
ssh dev 'sudo tailscale serve --bg --https=8080 http://127.0.0.1:3000'

# Remove
ssh dev 'sudo tailscale serve --https=8080 off'

# Reset all
ssh dev 'sudo tailscale serve reset'
```

### Rebuild Tailscale Serve config
```bash
ssh dev 'sudo tailscale serve reset'
ssh dev 'sudo tailscale serve --bg --https=443 https+insecure://localhost:6080'
ssh dev 'sudo tailscale serve --bg --https=6081 https+insecure://localhost:6081'
ssh dev 'sudo tailscale serve --bg --https=6082 https+insecure://localhost:6082'
ssh dev 'sudo tailscale serve --bg --https=6083 https+insecure://localhost:6083'
```

### Teardown
```bash
ssh dev 'docker stop kasm-desktop kasm-firefox kasm-chrome kasm-brave'
ssh dev 'sudo tailscale serve reset'
```

## Troubleshooting

- **401 on browser URL:** Normal -- Kasm login page. Use `kasm_user` / `localhop`
- **Cert warning:** Should NOT happen with Tailscale Serve. If it does, check `tailscale serve status`
- **Container not responding:** `ssh dev 'docker restart kasm-<name>'`
- **Exit node not working:** Check admin console at https://login.tailscale.com/admin/machines
- **SOCKS proxy won't start:** Check `ssh dev` works, then `pkill -f "ssh.*local-hop-socks"` and retry
- **Funnel accidentally enabled:** `ssh dev 'sudo tailscale funnel off'` then check `tailscale serve status`
