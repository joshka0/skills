# local-hop Dev Proxy

Manage the **local-hop** secure proxy and remote browser system.

**Machine profile:** hostnames, Tailscale IPs, access URLs, and logins live in
`~/.local-hop/profile.md` — read it first. Never copy those values into skills,
repos, or command output.

## Architecture

```
Mac (this machine)
  ↓ Tailscale VPN (encrypted)
dev-machine (Ubuntu, IP in profile)
  ↓ 127.0.0.1 only (loopback)
  kasmweb containers (KasmVNC)
  ↓ Tailscale Serve (TLS termination, tailnet only)
  https://<dev-domain> → valid certs, no warnings
```

**Key principle:** Containers bind to `127.0.0.1` only. Tailscale Serve exposes
them to the tailnet with valid HTTPS. Never use Funnel.

Services: Desktop (base port), Firefox (:6081), Chrome (:6082), Brave (:6083) —
URLs and logins in the profile.

## Key Paths

| Item | Path |
|------|------|
| Repo | `~/repos/personal/local-hop` |
| Dev SSH alias | `ssh dev` (Tailscale SSH) |
| PAC file (Mac) | `~/.local-hop/proxy.pac` |
| Machine profile | `~/.local-hop/profile.md` |

## Mac Quick Commands

- `hop-socks` — Start SOCKS5 proxy on `:1080`
- `hop-socks-kill` — Stop SOCKS5 proxy
- `hop-exit` — Route ALL traffic via dev-machine (Tailscale exit node)
- `hop-exit-off` — Stop using exit node
- `hop-novnc` — Open desktop browser

## Security Rules

1. **Never use Funnel** — Serve only (`tailscale serve`, never `tailscale funnel`)
2. **Containers bind 127.0.0.1** — never 0.0.0.0
3. **App-level auth** — Kasm user/viewer login on all services (values in profile)
4. **UFW firewall** — SSH (22) + Tailscale range (100.64.0.0/10) + loopback
5. **Never expose** Docker sockets, DB consoles, .env viewers, admin panels

## Common Tasks

Start the SOCKS proxy:

```bash
hop-socks
# Configure browser: SOCKS5 at 127.0.0.1:1080
# Or use PAC file: file://$HOME/.local-hop/proxy.pac
```

Use dev-machine as exit node:

```bash
hop-exit       # enables
hop-exit-off   # disables
```

Open a remote browser: `open <URL from profile>` (desktop, or :6081/:6082/:6083
for Firefox/Chrome/Brave).

Check dev-machine service status:

```bash
ssh dev 'docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"'
```

Check Tailscale Serve status:

```bash
ssh dev 'sudo tailscale serve status'
```

Restart a container:

```bash
ssh dev 'docker restart kasm-firefox'
```

Control browser via xdotool:

```bash
ssh dev 'docker exec -e DISPLAY=:1 kasm-firefox xdotool key ctrl+l'
ssh dev 'docker exec -e DISPLAY=:1 kasm-firefox xdotool type --clearmodifiers --delay 50 "https://example.com"'
ssh dev 'docker exec -e DISPLAY=:1 kasm-firefox xdotool key Return'
```

Add/remove a Tailscale Serve endpoint:

```bash
ssh dev 'sudo tailscale serve --bg --https=8080 http://127.0.0.1:3000'  # add
ssh dev 'sudo tailscale serve --https=8080 off'                          # remove
```

## Troubleshooting

- **401 on browser URL:** Normal — Kasm login page; credentials in the profile.
- **Cert warning:** Check `tailscale serve status`
- **Container not responding:** `ssh dev 'docker restart kasm-<name>'`
- **Exit node not working:** Check https://login.tailscale.com/admin/machines
- **Funnel accidentally enabled:** `ssh dev 'sudo tailscale funnel off'`
