import * as Phaser from "phaser";
import type { HubMapData } from "@/game/types/hubMap";

export function getMapArtKey(mapId: string) {
  return `map-art:${mapId}`;
}

export function preloadMapArt(
  scene: Phaser.Scene,
  maps: HubMapData[],
) {
  for (const map of maps) {
    const previewImage = map.assetBundle?.previewImage;
    if (!previewImage) {
      continue;
    }

    const key = getMapArtKey(map.id);
    if (!scene.textures.exists(key)) {
      scene.load.image(key, previewImage);
    }
  }
}

export function drawMapArtBackground(
  scene: Phaser.Scene,
  map: HubMapData,
) {
  const key = getMapArtKey(map.id);
  if (!scene.textures.exists(key)) {
    return false;
  }

  scene.add
    .image(0, 0, key)
    .setOrigin(0, 0)
    .setDisplaySize(map.size.width, map.size.height)
    .setDepth(-100);

  return true;
}
