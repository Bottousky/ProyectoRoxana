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
  "scene:ready": {
    scene: "boot" | "preload" | "hub";
  };
};
