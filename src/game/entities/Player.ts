import * as Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "@/game/constants";

export class Player {
  private readonly body: Phaser.GameObjects.Rectangle;
  private readonly speed = 72;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.body = scene.add.rectangle(x, y, 10, 14, 0x69d2c8);
    this.body.setStrokeStyle(1, 0xf5efe4, 0.9);
  }

  get x() {
    return this.body.x;
  }

  get y() {
    return this.body.y;
  }

  move(directionX: number, directionY: number, delta: number) {
    if (directionX === 0 && directionY === 0) {
      return;
    }

    const vector = new Phaser.Math.Vector2(directionX, directionY).normalize();
    const distance = this.speed * (delta / 1000);

    this.body.x = Phaser.Math.Clamp(
      this.body.x + vector.x * distance,
      8,
      GAME_WIDTH - 8,
    );
    this.body.y = Phaser.Math.Clamp(
      this.body.y + vector.y * distance,
      10,
      GAME_HEIGHT - 10,
    );
  }
}
