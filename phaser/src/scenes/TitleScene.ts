import * as Phaser from 'phaser';
import UiButton from '../objects/UiButton';
import {imageDef} from '../models/data'
import PubSubChild from '../utils/PubSubChild';
import {EventName, scenes} from '../models/enums';

/**
 * TitleScene
 * @ Damien Fleminks
 */

export default class TitleScene extends Phaser.Scene {
  private commHandler: PubSubChild;


  constructor() {
    super('Title');
    this.commHandler = new PubSubChild();

    this.commHandler.subscribe((e: MessageEvent)=>{
      //this.testEvent
      console.log('TitleScene received titleScene_playerDetail event', e);
    }, EventName.titleScene_playerDetail);

  }

  testEvent(e: MessageEvent){
    console.log('ID Received from LWC: '+ e);
  }

  public create(): void {
    console.log('Load TitleScene');
    this.createNewGameButton();
    this.publishScene();

    this.commHandler.publish({
      data: '',
      eventName : EventName.titleScene_playerDetail
    });

  }

  private publishScene(): void{
    this.commHandler.publish({
      data: scenes.TitleScene,
      eventName : EventName.startScene
    });
  }

  private createNewGameButton(): void{
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

  private createContinueButton():void{
    // >>>> add code
  }




  private startScene( targetScene: string): void {
    this.scene.start(targetScene);
  }
}
