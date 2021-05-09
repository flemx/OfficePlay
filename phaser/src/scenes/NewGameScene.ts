import * as Phaser from 'phaser';
import UiButton from '../objects/UiButton';

/**
 * NewGameScene
 * @ Damien Fleminks
 */

export default class NewGameScene extends Phaser.Scene {


  constructor() {
    console.log('Load BootScene');
    super('NewGame');
  }

  public create(): void {
    // Create title text
    const titleText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 5,
      'Create new avatar',
      {
        fontSize: '52px',
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
      'Submit',
      this.startScene.bind(this, 'Game'),
    );
  }

  private startScene( targetScene: string): void {
    this.scene.start(targetScene);
  }
}
