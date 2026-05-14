export type DirectionVector = {
  x: number;
  y: number;
};

export type RoxanaGameEvents = {
  "dialogue:start": {
    dialogueId: string;
    speakerId: string;
  };
  "dialogue:complete": {
    dialogueId: string;
  };
  "hud:prompt": {
    message: string;
  } | null;
  "input:virtual-direction": DirectionVector;
  "input:interact": void;
  "input:back": void;
  "interaction:start": {
    id: string;
    kind: "dialogue" | "journal" | "blocked_gate" | "inspect";
  };
  "journal:open": {
    entryId?: string;
  };
  "message:show": {
    messageId: string;
  };
  "ui:controls-lock": {
    locked: boolean;
  };
  "scene:ready": {
    scene: "boot" | "preload" | "hub";
  };
};
