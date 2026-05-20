# Contract: Analytics Events

## Purpose

Track the smallest useful event set for MVP validation.

## Event Naming

Use lower snake case event names. Event payloads must avoid personal information.

## Required Events

- `started_game`
- `entered_school`
- `opened_roxana_office`
- `found_bitacora`
- `opened_bitacora`
- `entered_electronics_room`
- `started_puzzle_closed_circuit`
- `failed_puzzle_closed_circuit`
- `completed_puzzle_closed_circuit`
- `opened_light_entry`
- `opened_formal_entry`
- `clicked_video`
- `completed_optional_exercise`
- `finished_demo`

## Payload

Common optional fields:

- `sessionId`
- `roomId`
- `puzzleId`
- `entryId`
- `source`
- `metadata`

## MVP Sink

The MVP may record events to a local debug sink, browser storage, console table, or lightweight analytics adapter. The important requirement is that event names and trigger points are stable enough to replace the sink later.

## Validation

- Each required event must have exactly one intended trigger point.
- Puzzle attempt and completion events must be distinguishable.
- Opening simple and technical bitacora views must be distinguishable.
