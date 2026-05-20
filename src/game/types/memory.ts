export type MemoryPanel = {
  id: string;
  imageId: string;
  caption: string;
  tone?: string;
};

export type MemorySequence = {
  id: string;
  title?: string;
  skippable?: boolean;
  onCompleteBeatId?: string;
  unlockedJournalEntryIds?: string[];
  panels: MemoryPanel[];
};
