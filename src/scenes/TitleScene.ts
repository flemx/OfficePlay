import * as Phaser from 'phaser';
import UiButton from '../classes/UiButton';

/**
 * TitleScene
 * @ Damien Fleminks
 */

export default class TitleScene extends Phaser.Scene {


  constructor() {
    console.log('Load BootScene');
    super('Title');
  }

  create() {
    // Create title text
    const titleText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      'Virtual Office',
      {
        fontSize: '64px',
        color: '#fff',
      },
    );
    titleText.setOrigin(0.5);

   
    const startGameButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.65,
      'button1',
      'button2',
      'Start',
      this.startScene('Game'),
    );
  }

  startScene( targetScene: string): any {
    this.scene.start(targetScene);
  }
}
