import * as Phaser from "phaser";

export class RoxanaNpc {
  private readonly body: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.body = scene.add.rectangle(x, y, 12, 16, 0xf0b25a);
    this.body.setStrokeStyle(1, 0x10141f, 0.9);

    scene.add
      .text(x, y - 18, "Roxana", {
        fontFamily: "monospace",
        fontSize: "7px",
        color: "#f5efe4",
      })
      .setOrigin(0.5);
  }

  get x() {
    return this.body.x;
  }

  get y() {
    return this.body.y;
  }
}
