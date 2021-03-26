import * as Phaser from 'phaser';
import scenes from './scenes/scenes';

/**
 *  Setup configuration and start Game instance
 */

const phaserConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: scenes,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0,
      },
    },
  },
  pixelArt: true, // Fix blurry lines between tiles
  roundPixels: true, // Fix blurry lines between tiles
};

class Game extends Phaser.Game {
  constructor(config) {
    super(config);
    this.scene.start('Boot');
  }
}
window.onload = () => {
  window.game = new Game(phaserConfig);
};
