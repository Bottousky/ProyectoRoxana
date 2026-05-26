import * as Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "./constants";
import { BootScene } from "./scenes/BootScene";
import { ElectronicsClassroomScene } from "./scenes/ElectronicsClassroomScene";
import { OhmdalChapter01Scene } from "./scenes/OhmdalChapter01Scene";
import { ElectronicsThresholdScene } from "./scenes/ElectronicsThresholdScene";
import { HubScene } from "./scenes/HubScene";
import { PreloadScene } from "./scenes/PreloadScene";
import { RoxanaOfficeScene } from "./scenes/RoxanaOfficeScene";

export function createRoxanaGame(parent: HTMLElement) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: "#10141f",
    pixelArt: true,
    roundPixels: true,
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
    },
    scene: [
      BootScene,
      PreloadScene,
      HubScene,
      RoxanaOfficeScene,
      ElectronicsClassroomScene,
      OhmdalChapter01Scene,
      ElectronicsThresholdScene,
    ],
  });
}
