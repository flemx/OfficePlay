import * as Phaser from 'phaser';
import UiButton from '../objects/UiButton';
import {imageDef, spritesDef} from '../models/data'
import PubSubChild from '../utils/PubSubChild';
import {EventName, scenes} from '../models/enums';
import { CharSprite } from '../models/types';

/**
 * TitleScene
 * @ Damien Fleminks
 */

export default class TitleScene extends Phaser.Scene {
  private commHandler: PubSubChild;
  private playerSprite: CharSprite;
  private playerName: string | undefined;
  private playerId: string;
  private officeId: string;

  constructor() {
    super('Title');
    this.commHandler = new PubSubChild();
    this.playerSprite = spritesDef.players.p1;
    this.playerName = undefined;
    this.playerId = '';
    this.officeId = '';
    // console.log('TitleScene subscribes to', EventName.titleScene_playerDetail);
    this.commHandler.subscribe(this.existingPlayer.bind(this), EventName.titleScene_playerDetail);
  }

  private existingPlayer(e: any): void{
    e.Character__c === 'p2' ? this.playerSprite = spritesDef.players.p2 : null ;
    e.Character__c === 'p3' ? this.playerSprite = spritesDef.players.p3 : null ;
    this.playerName = e.Name;
    this.playerId = e.Id;
    this.officeId = e.Office_Play_Config__c;
    this.createContinueButton();
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
  console.log('Publish Title Scene start');
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
      this.startNewGame.bind(this, 'NewGame'),
    );
  }

  private createContinueButton(): void{
    const titleImage = this.add.image(
      this.scale.width / 2,
      this.scale.height / 2.5,
      imageDef.branding.title_logo
    );


    titleImage.setScale(1);

    const continueGameButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.80,
      'button1',
      'button2',
      'Continue Game',
      this.continueGame.bind(this, 'Game'),
    );
  }



  private startNewGame( targetScene: string): void {
    this.scene.start(targetScene);
  }

  private continueGame( targetScene: string): void {
    this.scene.start(targetScene, {
      name: this.playerName, 
      playerSprite: JSON.stringify(this.playerSprite),
      playerId : this.playerId,
      officeId : this.officeId
    });
  }
}
