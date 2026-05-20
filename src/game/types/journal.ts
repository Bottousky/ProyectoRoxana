import type { JournalViewMode } from "@/game/types/events";

export type JournalResourceLink = {
  id: string;
  label: string;
  url: string;
};

export type JournalEntry = {
  id: string;
  title: string;
  scope: "central" | "world";
  worldId?: string;
  conceptIds?: string[];
  body?: string;
  simple?: string;
  technical?: string;
  videoLinks?: JournalResourceLink[];
  exerciseLinks?: JournalResourceLink[];
  defaultMode?: JournalViewMode;
};
