export const MVP_ANALYTICS_EVENTS = [
  "started_game",
  "entered_school",
  "observed_roxana_presence",
  "opened_roxana_office",
  "found_bitacora",
  "opened_bitacora",
  "entered_electronics_room",
  "started_puzzle_closed_circuit",
  "failed_puzzle_closed_circuit",
  "completed_puzzle_closed_circuit",
  "opened_light_entry",
  "opened_formal_entry",
  "clicked_video",
  "completed_optional_exercise",
  "finished_demo",
  "entered_electronics_classroom",
  "viewed_ohmdal_preview",
  "started_portrait_dialogue",
  "completed_portrait_dialogue",
  "started_memory_sequence",
  "completed_memory_sequence",
  "started_puzzle_after_narrative_bridge",
  "opened_flagship_journal",
  "journal_stage_revealed",
  "journal_page_turned",
  "journal_technical_opened",
] as const;

export type MvpAnalyticsEventName = (typeof MVP_ANALYTICS_EVENTS)[number];

export type AnalyticsEventPayload = {
  eventName: MvpAnalyticsEventName;
  sessionId?: string;
  roomId?: string;
  puzzleId?: string;
  entryId?: string;
  beatId?: string;
  dialogueId?: string;
  memoryId?: string;
  source?: string;
  metadata?: Record<string, string | number | boolean | null>;
};

export type AnalyticsEventRecord = AnalyticsEventPayload & {
  timestamp: string;
};
