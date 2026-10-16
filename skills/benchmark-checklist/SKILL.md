---
name: benchmark-checklist
description: "Seven checks for a performance number before you report or act on it: limiter, tuning, limits, errors, repeat runs, relevance, real work. Use when you measure a speedup or a regression."
---

# Benchmark checklist

Answer each question with evidence from a run, never with a guess from the
code.

If the user asked for a quick estimate, one run is enough. Check questions 4
and 7, and say that it is one run. A choice between options is never a quick
estimate.

## Before you run

- Write the claim in the words you will report: "export is 30% faster at p50
  on the 60k-row dataset". The questions test that sentence.
- Read the measurement script. Note what it times, counts, and ignores.
- Check the free CPU (`local-procs load`). Other agents share these cores. If
  you cannot stop the other load, alternate the two sides so both get the
  same noise, and say so in the report.

## The questions

1. **Why not double?** Name the limiter: a core, a lock, the disk, the
   network, or the load generator. Take it from a profile or system counters
   in a run that you do not report, because a profiler slows the work. Then
   map the hot spot to source. If a change did not move the number, find the
   limiter before you call the change useless.
2. **Was it tuned?** Run each side as production runs it: release build,
   production flags and env, batching, pools, caches as warm as production
   has them, the same versions and data. If the limiter is a setting (a
   commit per row, a debug build, a missing index), that side is not tuned.
   Tune it and measure again. If you cannot tune it, do not pick a winner
   from that run.
3. **Did it break limits?** Do the arithmetic. Compare bytes per second with
   the disk and network bandwidth, and operations per second times the cost
   per operation with the cores. If you remove a piece that takes 10% of the
   run, the run is at most about 11% faster. A result past a limit measured a
   cache, a no-op, or a bug.
4. **Did it error?** Count failures and non-success responses. Check that
   the outputs are correct, not only present. A rejection is fast; a timeout
   or a retry is slow. If the script does not count errors, add the count.
5. **Does it reproduce?** Run each side at least 5 times, alternating A, B,
   A, B. Report the median and the range. A gap smaller than the run-to-run
   variation is no measurable difference.
6. **Does it matter?** Measure the end-to-end path that a user waits on, with
   realistic data sizes and concurrency. Report the micro result as a share
   of the whole.
7. **Did it happen?** Confirm that the work ran inside the timed region: the
   request reached the server, the rows were written, the code used the
   result. A generator that nothing iterates, a promise that nothing awaits,
   and a timeout all give numbers for work that did not happen.

For an eval result, ask the same of the trials: did each run do the task,
does the gap hold across trials and models, and does the scenario matter.

## Report

- Put the verdict first: faster, slower, no measurable difference, or
  inconclusive.
- Give the number with its unit, the run count, the range, and the limiter:
  "p50 41 ms to 33 ms, median of 7 runs per side, range 32 to 35 ms after,
  bound by JSON parsing on one core".
- The verdict is inconclusive when you cannot name the limiter, when a side
  ran untuned, or when you could not check questions 4 and 7. Name the gap.
- Keep the runs, the range, and the limiter evidence in an artifact, with
  the command that reproduces them.

Adapted from pstack `benchmark-checklist` (MIT, copyright 2026 Lauren Tan).
