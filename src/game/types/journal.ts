export type JournalEntry = {
  id: string;
  title: string;
  scope: "central" | "world";
  body: string;
};
