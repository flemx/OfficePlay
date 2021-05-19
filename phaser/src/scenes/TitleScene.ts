import * as Phaser from 'phaser';
import UiButton from '../objects/UiButton';

/**
 * TitleScene
 * @ Damien Fleminks
 */

export default class TitleScene extends Phaser.Scene {


  constructor() {
    console.log('Load BootScene');
    super('Title');
  }

  public create(): void {
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
      'Start new game',
      this.startScene.bind(this, 'NewGame'),
    );
  }

  private startScene( targetScene: string): void {
    this.scene.start(targetScene);
  }
}
