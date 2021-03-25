import * as Phaser from 'phaser';


function create() {
  this.add.text(0, 0, 'hello world 5');
}


const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: () => {
      console.log('this is the preload method');
    },
    create,
  },
};

const game = new Phaser.Game(config);
