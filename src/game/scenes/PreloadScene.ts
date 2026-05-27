import * as Phaser from "phaser";
import classroomMapRaw from "@/content/maps/electronics-classroom.map.json";
import ohmdalChapterMapRaw from "@/content/maps/ohmdal-chapter-01.map.json";
import ohmdalThresholdMapRaw from "@/content/maps/ohmdal-threshold.map.json";
import hubMapRaw from "@/content/maps/roxana-library-hub.map.json";
import officeMapRaw from "@/content/maps/roxana-office.map.json";
import { preloadMapArt } from "@/game/systems/mapArt";
import { gameEvents } from "@/game/systems/eventBus";
import type { HubMapData } from "@/game/types/hubMap";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    preloadMapArt(this, [
      hubMapRaw as HubMapData,
      officeMapRaw as HubMapData,
      classroomMapRaw as HubMapData,
      ohmdalThresholdMapRaw as HubMapData,
      ohmdalChapterMapRaw as HubMapData,
    ]);
  }

  create() {
    gameEvents.emit("scene:ready", { scene: "preload" });
    this.scene.start("HubScene");
  }
}
