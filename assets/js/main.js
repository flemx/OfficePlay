/**
 *  Setup configuration and start Game instance
 */

let phaserConfig = {
    type: Phaser.AUTO,
  width: 800,
    height: 600,
    scene: [
        BootScene,
        GameScene,
        TitleScene,
        UiScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y : 0
            }
        }
    },
    pixelArt: true,   // Fix blurry lines between tiles
    roundPixels: true,   // Fix blurry lines between tiles
};




const game = new Phaser.Game(phaserConfig);

  