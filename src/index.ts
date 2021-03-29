import Phaser from 'phaser';

import HelloWorldScene from './scenes/HelloWorldScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [HelloWorldScene]
}

export default new Phaser.Game(config);


// import scenes from './scenes/scenes';

// /**
//  *  Setup configuration and start Game instance
//  */

// const phaserConfig = {
//   type: Phaser.AUTO,
//   width: 800,
//   height: 600,
//   scene: scenes,
//   physics: {
//     default: 'arcade',
//     arcade: {
//       debug: true,
//       gravity: {
//         y: 0,
//       },
//     },
//   },
//   pixelArt: true, // Fix blurry lines between tiles
//   roundPixels: true, // Fix blurry lines between tiles
// };

// class Game extends Phaser.Game {
//   constructor(config) {
//     super(config);
//     this.scene.start('Boot');
//   }
// }

// export default new Phaser.Game(config);
