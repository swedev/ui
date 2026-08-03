# Issue #4: Förenkla Select: Radix-semantik för value, ta bort clear-maskineriet

**Based on:** main

## Summary

Strip the `__empty__` sentinel mapping and the clear machinery (Backspace/Delete → `undefined`, remount hack, `undefined`-typed callback) from `Select`, letting `value`/`onValueChange` pass straight through to Radix so `""` shows the placeholder as documented. Add stories for the controlled-with-placeholder pattern and the consumer-sentinel "None" pattern, plus JSDoc and an AGENTS.md note. Breaking on paper, but a consumer audit (openvera, timla, ~35+ call sites) found zero users of the removed features.

## Triage Status

| Field | Value |
|-------|-------|
| **Ready to work** | Yes |
| **Risk** | Low |
| **Safe for junior** | Yes |

## Plan Review

**Status:** Reviewed
**Reviewed:** 2026-08-03
**Feedback:** Codex review confirmed scope and order; applied two semantic corrections (NoneOption story must map the sentinel in both directions, and JSDoc/docs must distinguish controlled `""` from uncontrolled `undefined` instead of treating them as equivalent) plus verification additions (`npm run lint`, `npm run build-storybook`, Backspace/onKeyDown/ref manual checks).

## Related Files

- [plan.md](plan.md) - Full implementation plan
- [progress.md](progress.md) - Implementation progress (if exists)
- [research.md](research.md) - Research findings (if exists)

## Related Issues

- swedev/openvera#59 - Placeholder suppression trap discovered in openvera (external repo)
