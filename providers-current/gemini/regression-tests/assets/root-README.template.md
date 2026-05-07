# Regression Tests

Each regression test lives in its own folder:

`tests/regression/<index>-<descriptive-title>/`

Each folder contains:
- `README.md` — what bug this prevents
- `run.sh` — executes the case (CI calls this)

## Run all regression tests

```bash
bash tests/regression/run.sh
```

## Run a single regression test

```bash
bash tests/regression/<index>-<descriptive-title>/run.sh
```
