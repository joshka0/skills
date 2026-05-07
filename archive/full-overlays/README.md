# Full Overlay Archive

This directory preserves old provider `full` overlay snapshots.

They are archived because active provider overlays now live under `providers/`,
and compose inputs live under `bundles/<provider>/<bundle>`.

Use the compose scripts to rebuild broad overlays from available bundle inputs:

```sh
./bin/compose-codex-skills.sh --full
./bin/compose-provider-skills.sh --provider claude --full
```

