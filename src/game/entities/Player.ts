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

  get halfWidth() {
    return this.body.width / 2;
  }

  get halfHeight() {
    return this.body.height / 2;
  }

  move(
    directionX: number,
    directionY: number,
    delta: number,
    canOccupy?: (x: number, y: number) => boolean,
  ) {
    if (directionX === 0 && directionY === 0) {
      return;
    }

    const vector = new Phaser.Math.Vector2(directionX, directionY).normalize();
    const distance = this.speed * (delta / 1000);
    const deltaX = vector.x * distance;
    const deltaY = vector.y * distance;

    const candidateX = Phaser.Math.Clamp(this.body.x + deltaX, 8, GAME_WIDTH - 8);
    if (!canOccupy || canOccupy(candidateX, this.body.y)) {
      this.body.x = candidateX;
    }

    const candidateY = Phaser.Math.Clamp(
      this.body.y + deltaY,
      10,
      GAME_HEIGHT - 10,
    );
    if (!canOccupy || canOccupy(this.body.x, candidateY)) {
      this.body.y = candidateY;
    }
  }
}
