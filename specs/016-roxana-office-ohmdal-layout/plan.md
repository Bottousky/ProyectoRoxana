# Roxana Office And Ohmdal Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a real Roxana office and improve the Ohmdal opening so the first puzzle feels narratively earned.

**Architecture:** Reuse the current map-driven Phaser scene pattern. Add one focused scene for the office, keep narrative copy in JSON, and update existing Ohmdal content without moving educational explanations into gameplay dialogue.

**Tech Stack:** Next.js, React, TypeScript, Phaser, Zustand, JSON content, typed event bus.

---

### Task 1: Spec Activation

**Files:**
- Modify: `.specify/feature.json`
- Modify: `agents.md`

- [x] Point the active Spec Kit feature to `specs/016-roxana-office-ohmdal-layout`.
- [x] Update the local AGENTS speckit pointer to the new plan.

### Task 2: Roxana Office Scene

**Files:**
- Create: `src/content/maps/roxana-office.map.json`
- Create: `src/content/messages/roxana-office.json`
- Create: `src/game/scenes/RoxanaOfficeScene.ts`
- Modify: `src/game/createRoxanaGame.ts`
- Modify: `src/components/hud/MessagePanel.tsx`
- Modify: `src/components/game/GameShell.tsx`
- Modify: `src/game/types/events.ts`

- [x] Add an office map with desk, journal, notes, map wall, archive shelf and exit.
- [x] Add office messages for notes and desk interactions.
- [x] Add a Phaser scene that draws the office, supports movement, inspect, journal unlock and return to hub.
- [x] Register the scene and room label.
- [x] Include office message content in the React message library.

### Task 3: Hub Door And Statue Pacing

**Files:**
- Modify: `src/game/scenes/HubScene.ts`
- Modify: `src/content/maps/roxana-library-hub.map.json`
- Modify: `src/content/dialogues/roxana-intro.json`

- [x] Change the office door from auto-memory/journal behavior to a room transition.
- [x] Keep the statue as a short atmospheric inscription.
- [x] Preserve the existing bitacora gate requirement before Ohmdal.

### Task 4: Ohmdal Narrative Refresh

**Files:**
- Modify: `src/content/memories/ohmdal-preview.json`
- Modify: `src/content/dialogues/ohmdal-intro.json`
- Modify: `src/content/dialogues/ohmdal-preview-response.json`
- Modify: `src/content/messages/electronics-classroom.json`
- Modify: `src/content/messages/ohmdal.json`
- Modify: `src/content/maps/ohmdal-threshold.map.json`

- [x] Rewrite preview panels around humans, automatas, inherited magic and visible breakdown.
- [x] Rewrite OHM as old automaton guide with fragments, not a direct tutorial.
- [x] Add pre-puzzle inspectables to Ohmdal threshold.
- [x] Adjust first puzzle messages so they read as consequences of local systems.

### Task 5: Verification

**Files:**
- Package scripts only

- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Summarize remaining narrative refinements.
