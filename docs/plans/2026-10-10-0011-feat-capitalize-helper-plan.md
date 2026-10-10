---
title: Capitalize Helper - Plan
type: feat
date: 2026-10-10
artifact_contract: ce-unified-plan/v1
product_contract_source: ce-plan-bootstrap
execution: code
---

# Capitalize Helper - Plan

## Goal Capsule

- **Objective:** Code in this repo can turn a string's first character to uppercase by importing one standalone helper, with the rest of the string untouched.
- **Means:** A new single-export module beside `src/slugify.js` (KTD1, KTD2).
- **Authority:** GitHub issue #1 owns behavior and scope. This plan owns how it is built. Where they disagree, the issue wins.
- **Execution profile:** One unit, two new files, no existing file modified.
- **Stop conditions:** Stop and report if the change needs a third file, or if an acceptance example in R1-R3 cannot hold with the approach in KTD1.
- **Shipping:** The work ships as one pull request that closes #1.

## Product Contract

### Summary

Add a `capitalize(str)` helper in `src/capitalize.js` and its `node:test` cases in `test/capitalize.test.js`.

### Problem Frame

The repo has one string helper, `slugify`, and no way to uppercase only the first character of a string. Issue #1 asks for that helper as a second standalone module.

### Requirements

- R1. `capitalize('hello')` returns `'Hello'`.
- R2. `capitalize('hello world')` returns `'Hello world'`: only the first character changes, and every later character is returned as given.
- R3. `capitalize('')` returns `''`.
- R4. The change adds exactly `src/capitalize.js` and `test/capitalize.test.js` and modifies no other source or test file.
- R5. `npm test` passes with the new test file included.

### Scope Boundaries

- No index or barrel file. Each helper in this repo is imported from its own module.
- No change to `src/slugify.js`, `test/slugify.test.js`, `package.json`, or `.github/workflows/ci.yml`.
- No lowercasing of the remainder, no per-word capitalization, no locale-aware casing.

## Planning Contract

### Key Technical Decisions

- KTD1. **Uppercase the first character and append the unchanged remainder, with no empty-string branch.** Taking the first character of an empty string yields an empty string, so R3 holds without a guard and the helper stays a single expression.
- KTD2. **Export a named arrow-function constant.** This matches `src/slugify.js`, so both helpers are imported the same way under the repo's ES module setting in `package.json`.

### Assumptions

- Input is a string. The issue defines no behavior for other types, and `slugify` does not validate its input either, so `capitalize` adds no type check.
- A first character outside the Basic Multilingual Plane is not a requirement. The issue's examples are ASCII, and handling such characters is left out.

## Implementation Units

### U1. Add the capitalize helper and its tests

- **Goal:** Provide `capitalize` and prove R1-R3.
- **Requirements:** R1, R2, R3, R4, R5.
- **Dependencies:** None.
- **Files:**
  - Create `src/capitalize.js`
  - Create `test/capitalize.test.js`
- **Approach:** Build the helper per KTD1 and export it per KTD2. Write the test file with the same imports and single-`test` layout as `test/slugify.test.js`.
- **Patterns to follow:** `src/slugify.js` for the module and export form. `test/slugify.test.js` for `node:test` with `node:assert/strict` and a relative import from `../src/`.
- **Test scenarios:**
  - Covers R1. Input `'hello'` returns `'Hello'`.
  - Covers R2. Input `'hello world'` returns `'Hello world'`.
  - Covers R3. Input `''` returns `''`.
  - Covers R2. Input `'hELLO'` returns `'HELLO'`, showing the remainder is not lowercased.
  - Input `'Hello'`, already capitalized, returns `'Hello'`.
- **Verification:** The new test passes and the existing slugify test still passes.

## Verification Contract

| Gate | Command | Proves |
|---|---|---|
| Unit tests | `npm test` | R1, R2, R3, R5 |
| Changed-file check | `git diff --name-only main...HEAD` | R4, apart from this plan file |

CI runs `npm test` on Node 22 for every pull request through `.github/workflows/ci.yml`.

## Definition of Done

- U1's two files exist and every test scenario in U1 is an assertion in `test/capitalize.test.js`.
- `npm test` passes locally.
- The branch diff holds the two files from R4 plus this plan, and no leftover experimental code.
- The pull request closes #1.
