export type DialogueContent = {
  id: string;
  speaker: string;
  title: string;
  presentation?: "standard" | "portrait";
  portraitId?: string;
  beatId?: string;
  lines: string[];
};
