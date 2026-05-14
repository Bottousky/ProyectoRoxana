import * as Phaser from "phaser";
import { gameEvents } from "@/game/systems/eventBus";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.add
      .text(192, 108, "Cargando Hub...", {
        fontFamily: "monospace",
        fontSize: "10px",
        color: "#f5efe4",
      })
      .setOrigin(0.5);
  }

  create() {
    gameEvents.emit("scene:ready", { scene: "preload" });
    this.scene.start("HubScene");
  }
}
