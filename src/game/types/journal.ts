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

export type JournalBlockType =
  | "title"
  | "paragraph"
  | "annotation"
  | "formula"
  | "diagram"
  | "graph"
  | "illustration"
  | "callout";

export type JournalBlock = {
  id: string;
  type: JournalBlockType;
  stageId: string;
  page: "left" | "right";
  x: number;
  y: number;
  width: number;
  layerMode?: JournalViewMode | "both";
  text?: string;
  latex?: string;
  title?: string;
  note?: string;
  points?: Array<{ x: number; y: number }>;
  labels?: string[];
};

export type JournalSpread = {
  id: string;
  title?: string;
  leftPageNumber: number;
  rightPageNumber: number;
};

export type JournalRevealStage = {
  id: string;
  title: string;
  summary: string;
};

export type FlagshipJournalEntry = Omit<
  JournalEntry,
  "body" | "simple" | "technical"
> & {
  spreads: JournalSpread[];
  revealStages: JournalRevealStage[];
  blocks: JournalBlock[];
};
