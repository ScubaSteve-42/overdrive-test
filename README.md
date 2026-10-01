# overdrive-test

Sandbox repo for trying the [overdrive](https://github.com/kevinold/overdrive) harness and the
[multi-worker-pm](https://github.com/kevinold/skills) skill. The code is a tiny string-utility
library with no dependencies. The point is the workflow around it.

## Layout

- `src/`: one function per file.
- `test/`: one `node:test` file per function.
- `.github/workflows/ci.yml`: runs `npm test` on pushes to `main` and on pull requests.

## Try it

Run the tests with `npm test` (Node 22 or newer).

Open issues labeled `agent-ready` are the work queue. Each issue names the files it touches in
backticks, so the PM can run several in parallel without two workers editing the same file.

Preview what the PM would pick up, without spawning anything:

    node ~/.claude/skills/multi-worker-pm/scripts/run.mjs select --dry-run

Or, from a Claude Code session in this folder: `/multi-worker-pm --dry-run`.
