import * as Phaser from 'phaser';
import UiButton from '../objects/UiButton';
import PubSubChild from '../utils/PubSubChild';
import {EventName, scenes} from '../models/enums';
import {spritesDef} from '../models/data';
import { EventMessage, CharSprite } from '../models/types';
import NPC from '../objects/NPC';

/**
 * NewGameScene
 * @ Damien Fleminks
 */
export default class NewGameScene extends Phaser.Scene {

    private commHandler: PubSubChild;
    private playerName: string | undefined;
    private chosenCharacter: string;
    private characters!: Record<string, NPC>;


  constructor() {
    super('NewGame');
    this.playerName = undefined; 
    this.chosenCharacter = spritesDef.players.p1.idle;
    this.commHandler = new PubSubChild();
    this.characters = {};
    this.commHandler.subscribe((name: string)=>{
        this.playerName = name;
    }, EventName.startGame_playerName);
  }

  public create(): void {
    console.log('Load NewGame Scene');
    this.createButtons();
    this.createCharacters();
    this.publishScene();
  }

  private publishScene(): void{
    this.commHandler.publish({
      data: scenes.NewGame,
      eventName : EventName.startScene
    });
  }


  private createButtons(): void{
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
        // console.log(titleText);
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


  private createCharacters(): void {
    const message: EventMessage = {
      data: {
        origin: 'I AM FROM PHASER'
      },
      eventName: EventName.eventTest
  }

  // Create characters player can select
  this.characters[spritesDef.players.p1.idle] = new NPC((this as Phaser.Scene), this.scale.width / 3, this.scale.height * 0.42, spritesDef.players.p1, 6, ()=> {
    this.selectChar(spritesDef.players.p1.idle);
  });
  this.characters[spritesDef.players.p2.idle] = new NPC((this as Phaser.Scene), this.scale.width / 2, this.scale.height * 0.42, spritesDef.players.p2, 5, ()=> {
    this.selectChar(spritesDef.players.p2.idle);
  });
  this.characters[spritesDef.players.p3.idle] = new NPC((this as Phaser.Scene), this.scale.width / 1.5, this.scale.height * 0.42, spritesDef.players.p3, 7, ()=> {
    this.selectChar(spritesDef.players.p3.idle);
  });
  
  // Select First Characted by default
  this.characters[spritesDef.players.p1.idle].setHoverEffect(true);

  }
  

  private selectChar(select: string){
    if(select !== this.chosenCharacter){
      this.characters[this.chosenCharacter].setHoverEffect(false);
      this.chosenCharacter = select;
      this.characters[select].setHoverEffect(true);
    }
  }


  private startScene( targetScene: string): void {
    this.scene.start(targetScene, {name: this.playerName, playerSprite: JSON.stringify(this.characters[this.chosenCharacter].getCharSpite())});
  }
}
