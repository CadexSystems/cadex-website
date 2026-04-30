# CLAUDE.md — Cadex Website

## SESSION START

1. Read `tasks/lessons.md` — apply all lessons before touching anything

2. Read `tasks/todo.md` — understand current state

3. If neither exists, create them before starting

## WORKFLOW

### 1. Plan First

- Enter plan mode for any non-trivial task (3+ steps)

- Write plan to `tasks/todo.md` before implementing

- If something goes wrong, STOP and re-plan — never push through

### 2. Subagent Strategy

- Use subagents to keep main context clean

- One task per subagent

- Throw more compute at hard problems

### 3. Self-Improvement Loop

- After any correction: update `tasks/lessons.md`

- Format: [date] | what went wrong | rule to prevent it

- Review lessons at every session start

### 4. Verification Standard

- Never mark complete without proving it works

- Run tests, check logs, diff behavior

- Ask: "Would a staff engineer approve this?"

### 5. Demand Elegance

- For non-trivial changes: is there a more elegant solution?

- If a fix feels hacky: rebuild it properly

- Don't over-engineer simple things

### 6. Autonomous Bug Fixing

- When given a bug: just fix it

- Go to logs, find root cause, resolve it

- No hand-holding needed

## MODEL ARCHITECTURE

**Primary:** Sonnet — execution, implementation, all routine tasks

**On call:** Opus — planning, architecture decisions, any task where drift would be costly

### How to invoke Opus

Option A (turnkey): use the `opusplan` alias in Claude Code — Opus handles plan mode automatically, Sonnet handles execution, handoff is automatic.

Option B (explicit): run Sonnet as primary, wire Opus as an `/advisor` subagent. Call the advisor **before** substantive work — not during, not after.

### What to hand Opus when you call it

- Intent (what you're trying to accomplish and why)
- Constraints (what can't change, what's off-limits)
- Acceptance criteria (how you'll know it's done)
- Relevant file locations

### The mental model

Treat Claude more like a capable engineer you're delegating to than a pair programmer you're guiding line by line. Write a sharp spec, let the advisor think before any code is written, then hand off to the executor.

Slowing down at the start of a task feels slow. By the end, it's faster — because the executor isn't course-correcting three times on a misread spec.

### Rule of thumb

When launch marketing and engineering docs disagree, trust the docs. The `opusplan` architecture is the supported path — it's as close as a vendor gets to saying "this is how it's meant to be used."

---

## CORE PRINCIPLES

- Simplicity First — touch minimal code

- No Laziness — root causes only, no temp fixes

- Never Assume — verify paths, APIs, variables before using

- Ask Once — one question upfront if unclear, never interrupt mid-task

## TASK MANAGEMENT

1. Plan → `tasks/todo.md`

2. Verify → confirm before implementing

3. Track → mark complete as you go

4. Explain — high-level summary each step

5. Learn → `tasks/lessons.md` after corrections

## LEARNED

(Claude fills this in over time)
