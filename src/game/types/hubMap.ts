export type InteractableKind =
  | "dialogue"
  | "journal"
  | "blocked_gate"
  | "inspect"
  | "puzzle";

export type BoundsRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type HubSolid = BoundsRect & {
  id: string;
  style?: "wall" | "shelf" | "furniture" | "gate";
};

export type HubDecoration = BoundsRect & {
  id: string;
  fill: string;
  stroke?: string;
};

export type HubInteractable = {
  id: string;
  kind: InteractableKind;
  bounds: BoundsRect;
  prompt: string;
  payload?: {
    dialogueId?: string;
    speakerId?: string;
    journalEntryId?: string;
    messageId?: string;
    puzzleId?: string;
    targetWorldId?: string;
  };
};

export type HubEntity = {
  id: string;
  x: number;
  y: number;
};

export type HubMapData = {
  id: string;
  tileSize: number;
  assetBundle?: {
    manifest: string;
    previewImage?: string;
    status: "placeholder_reference" | "normalized" | "runtime";
  };
  size: {
    width: number;
    height: number;
  };
  spawn: {
    x: number;
    y: number;
  };
  spawnPoints?: Record<
    string,
    {
      x: number;
      y: number;
    }
  >;
  entities: {
    roxana: HubEntity;
  };
  solids: HubSolid[];
  decorations: HubDecoration[];
  interactables: HubInteractable[];
};
