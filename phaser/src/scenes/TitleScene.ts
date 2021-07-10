import * as Phaser from 'phaser';
import UiButton from '../objects/UiButton';
import {imageDef} from '../models/data'
import PubSubChild from '../utils/PubSubChild';
import {EventName} from '../models/enums';

/**
 * TitleScene
 * @ Damien Fleminks
 */

export default class TitleScene extends Phaser.Scene {
  private commHandler: PubSubChild;


  constructor() {
    console.log('Load BootScene');
    super('Title');
    this.commHandler = new PubSubChild();

    this.commHandler.publish({
      data: '',
      eventName : EventName.phaserWrap_gameId
    });

    this.commHandler.subscribe((e: MessageEvent)=>{
      //this.testEvent
      console.log('TitleScene received event', e);
    }, EventName.phaserWrap_gameId);
  }

  testEvent(e: MessageEvent){
    console.log('ID Received from LWC: '+ e);
  }

  public create(): void {

    const titleImage = this.add.image(
      this.scale.width / 2,
      this.scale.height / 2.5,
      imageDef.branding.title_logo
    );

    // // Create title text
    // const titleText = this.add.text(
    //   this.scale.width / 2,
    //   this.scale.height / 2,
    //   'Virtual Office',
    //   {
    //     fontSize: '64px',
    //     color: '#fff',
    //   },
    // );
    // titleText.setOrigin(0.5);

    titleImage.setScale(1);

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
