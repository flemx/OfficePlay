import * as Phaser from 'phaser';
import UiButton from '../objects/UiButton';
import PubSubChild from '../utils/PubSubChild';
import {EventName} from '../models/enums';

/**
 * NewGameScene
 * @ Damien Fleminks
 */

export default class NewGameScene extends Phaser.Scene {

    private commHandler: PubSubChild;
    private playerName: string | undefined;

  constructor() {
    console.log('Load BootScene');
    super('NewGame');
    this.playerName = undefined; 
    this.commHandler = new PubSubChild();
    this.commHandler.subscribe((name: string)=>{
        this.playerName = name;
    }, EventName.startGame_playerName);
  }

  public create(): void {
    // Create title text
    const titleText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 8,
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
      this.scale.height * 0.80,
      'button1',
      'button2',
      'Submit',
      this.startScene.bind(this, 'Game'),
    );
  }

  private startScene( targetScene: string): void {
    this.scene.start(targetScene, {name: this.playerName});
  }
}
