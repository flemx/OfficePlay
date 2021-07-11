import Phaser from 'phaser';

// import HelloWorldScene from './scenes/HelloWorldScene'

// const config: Phaser.Types.Core.GameConfig = {
// 	type: Phaser.AUTO,
// 	width: 800,
// 	height: 600,
// 	physics: {
// 		default: 'arcade',
// 		arcade: {
// 			gravity: { y: 200 }
// 		}
// 	},
// 	scene: [HelloWorldScene]
// }

// export default new Phaser.Game(config);


import scenes from './scenes/scenes';

var ZOOM_LEVEL = 1;

/**
 *  Setup configuration and start Game instance
 */

const phaserConfig = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.NONE,
  width:  window.innerWidth/ZOOM_LEVEL,
  height: window.innerHeight/ZOOM_LEVEL,
  scene: scenes,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 0,
      },
    },
  },
  pixelArt: true, // Fix blurry lines between tiles
  roundPixels: true, // Fix blurry lines between tiles
};



const game = new Phaser.Game(phaserConfig);

// // event listener to resize canvas wghen parent iframe resizes
// window.addEventListener("resize", () => {
//     game.scale.resize(window.innerWidth/ZOOM_LEVEL, window.innerHeight/ZOOM_LEVEL);
//   },false
// );


// class Game extends Phaser.Game {
//   constructor(config) {
//     super(config);
//     this.scene.start('Boot');
//   }
// }

export default game;
