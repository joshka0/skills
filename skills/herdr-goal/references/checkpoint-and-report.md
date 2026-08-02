# Checkpoint and report

Read this only when sealing a main epoch or executing Luna verification.

## Main checkpoint

Checkpoint must run from the pinned main terminal while Herdr reports it as
`working`.

Start from `../assets/verification-packet-v1.json`. Replace its example goal,
epoch, objective, scopes, criteria, steps, and absolute cwd; keep every schema
key and the four prohibitions. Do not add `callback_invite_path` or
`callback_command`: goal injects both only into the sealed copy. Every command
side effect, including Rust `target/` output, must be listed explicitly.

1. Validate the packet against the current goal ID and exact epoch.
2. Create the dormant fixed-epoch callback to obtain its protected invite
   path.
3. Seal the final packet once, including the invite path and the transport-
   injected absolute `callback_command` argv prefix, but never its bearer
   capability. Sync it and record the SHA-256 digest.
4. Create the linked settle wake with deterministic goal/epoch client keys.
5. Require durable callback and wake acknowledgements plus
   `VerificationArmed` before the main ends its turn.

Equivalent retries may return the same resources. Conflicting client-key or
packet reuse is a stall, not an overwrite.

## Luna verification

After watcher resumes Luna:

1. Confirm the prompt goal ID, epoch, packet path, and digest match protected
   state.
2. Read the sealed packet and execute its ordered commands exactly.
3. Capture only requested evidence. Do not edit source, mutate Git, delegate,
   change the plan, or invent a missing check.
4. Stop on ambiguity and submit `blocked` with the exact missing decision.
5. Submit one status: `pass`, `changes-requested`, `blocked`, or `failed`.

Use the sealed `callback_command` prefix exactly, append the required status,
summary, and body-file arguments, and reconcile it with current live help.
Never substitute a PATH-based command or read or print the capability yourself.
The closed packet/report JSON status is `changes_requested`; map that one value
to the CLI spelling `--status changes-requested`. The other status spellings
are identical in JSON and CLI.

## Verdict meaning

- `pass`: every required criterion passed with evidence; main must still
  reconcile and complete.
- `changes-requested`: verification ran but named criteria failed; include the
  smallest actionable delta.
- `blocked`: verification could not decide safely because required authority,
  state, or input was unavailable.
- `failed`: the verifier or required check failed independently of product
  correctness.

One callback is accepted per epoch. Identical replay is idempotent; conflicting
replay is rejected.
