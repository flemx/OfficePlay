import * as Phaser from 'phaser';
import NPC from '../objects/NPC';
//import HoverSelect from '../objects/HoverSelect';
import Player from '../objects/Player';
import GameMap from '../objects/GameMap';
import PubSubChild from '../utils/PubSubChild';
import { Coordinate, EventMessage, CharSprite, playerEvent } from '../models/types';
import {EventName, scenes} from '../models/enums';
import {spritesDef, mapDef} from '../models/data'
import Cat from '../objects/Cat';
import Coffee from '../objects/Coffee';
import Fridge from '../objects/Fridge';
/**
 * GameScene
 * @ Damien Fleminks
 */

export default class GameScene extends Phaser.Scene {

  // Defining properties with non-null assertion operator because they cannot be set in constructor
  private player!: Player;
  private backgroundAudio!: Phaser.Sound.BaseSound;
  private gamemap!: GameMap;
  private officeHelpNpc!: NPC;
  public lockMovement: boolean;
  private commHandler: PubSubChild;
  private playerName: string;
  private playerSprite: CharSprite;
  private playerId: string;
  private officeId: string;
  private cat!: Cat;
  private coffee!: Coffee;

  private playerTest!: Player;

  private players: Array<Player>;

  constructor() {
    super('Game');
    this.lockMovement = false;
    // this.commHandler = new CrossCommHandler();
    // this.commHandler.subscribe(this.testEvent, 'event-test');
    this.commHandler = new PubSubChild();

    // subscribe to test event
    this.commHandler.subscribe(this.testEvent, EventName.eventTest);
    this.playerName = 'Player';
    this.playerSprite = spritesDef.players.p1;
    this.playerId = '';
    this.officeId = '';
    this.players = new Array<Player>();

    // Subsribe to player ping 
    this.commHandler.subscribe(this.updatePlayerStatus.bind(this), EventName.gameScene_playerPing);
  }

  testEvent(e: MessageEvent){
    console.log(e);
  }

  public init(data: any): void {
    // Start Ui scene in parallel, placed on top
    let sprite = JSON.parse(data.playerSprite);
    this.playerName = data.name;
    this.playerSprite = sprite;
    this.playerId = data.playerId;
    this.officeId = data.officeId;
  }

  public create(): void {
    console.log('Load Game Scene');
    this.createPlayer();
    this.createNPC();
    this.createCat();
    this.createCoffee();
    this.createFridges();
    this.createMap();
    this.createAudio();
    this.createInput();
    this.publishScene();
    this.publishPlayer();
    this.checkPlayers();
  }

  private publishScene(): void{
    this.commHandler.publish({
      data: scenes.GameScene,
      eventName : EventName.startScene
    });
  }

  private publishPlayer(): void{
    this.commHandler.publish({
      data: this.playerName,
      eventName : EventName.gameScene_playerName
    });
  }

  public update(): void {
    // this.player.update(this.cursors,this.walkTest);
    this.player.update();
  }



  private createAudio(): void {
    // this.backgroundAudio = this.sound.add('background1', { loop: true });
    // this.backgroundAudio.play();
  }

  private createPlayer(): void {
    // Spawn player at location 216,216
    // this.player = new Player(this,216,216,"atlas", "misa-front");
    this.player = new Player(this, 216, 216, this.playerSprite, this.playerId, this.playerName, this.officeId, true);
  }

  private createInput(): void {
    // On mouse press retrieve the shortest path to destination
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if(!this.lockMovement && this.gamemap.isValidPath({x: pointer.worldX, y: pointer.worldY})){
        const destination: Coordinate = this.gamemap.getNodeKey({x: pointer.worldX, y: pointer.worldY});
        const startPoint: Coordinate = this.gamemap.getNodeKey({x: this.player.x, y: this.player.y});
        // get optimnal path 
        const path = this.gamemap.getPath(startPoint,destination);;
        //console.log('The shortest path is: ', path);
        // Make sure the current path of the player is reset 
        this.player.resetPath();
        // Add the new coordinates to the players path
        for (const coord of path) {
          this.player.addCoord(this.gamemap.getPixelCoord(coord));
        }
        // Set the first coordinate of player to trigger the player movement
        this.player.nextCoord();
      }else{
        console.log(`You are not allowed to go there!`);
        this.lockMovement = false;
      }
    });
  }

  private createNPC(): void {
    const message: EventMessage = {
      data: {
        message:  `Welcome ${this.playerName} to OfficePlay!`,
        img : 'npc'
      },
      eventName: EventName.gameScene_botMsg
  }
    // Spawn NPC with idle standing animation
    this.officeHelpNpc = new NPC(this as Phaser.Scene, 285, 75, spritesDef.npc.officeHelp, 6, ()=> {
      this.commHandler.publish(message);
    });
    this.officeHelpNpc.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.lockMovement = true;
    });
  }

  private createCat(): void {
    const message: EventMessage = {
      data: {
        message:  `meow meow!`,
        img : 'cat'
      },
      eventName: EventName.gameScene_botMsg
    }
    // Spawn NPC with idle standing animation
    this.cat = new Cat(this as Phaser.Scene, 264, 650, spritesDef.npc.cat, 6, ()=> {
      this.commHandler.publish(message);
    });
    this.cat.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.lockMovement = true;
    });   
  }

  private createCoffee(): void {
    // Spawn NPC with idle standing animation
    this.coffee = new Coffee(this as Phaser.Scene, 888, 200, spritesDef.objects.coffee);
    // this.cat.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
    //   this.lockMovement = true;
    // });   
  }

  private createFridges(): void {
    // Spawn NPC with idle standing animation
    let fridge1 = new Fridge(this as Phaser.Scene, 1128, 100, spritesDef.objects.fridge1);
    fridge1.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.lockMovement = true;
    }); 
    let fridge2 = new Fridge(this as Phaser.Scene, 1078, 100, spritesDef.objects.fridge2);
    fridge2.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.lockMovement = true;
    });  
    // let fridge1 = new Cat(this as Phaser.Scene, 1128, 100, spritesDef.npc.cat, 6, ()=> {
    //   console.log('MEOW');
    // });
    // this.cat.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
    //   this.lockMovement = true;
    // });   
  }

  

  

  private createMap(): void {
    // create map
    this.gamemap = new GameMap(this, mapDef.office1.name, mapDef.office1.config);
  }


  private updatePlayerStatus(playerDetail: playerEvent){
    //playerId: string, sprite: string, name: string, office: string)
    console.log('Phaser Game received new event:', playerDetail);
    let newPlayer = true;
    for(let player of this.players){
      if(player.Id === playerDetail.playerId__c){
          console.log('Update player ping time...');
          newPlayer = false;
      }
    }
    if(newPlayer){
      let charsprite: CharSprite = spritesDef.players.p1;
      playerDetail.character__c === 'p2' ? charsprite = spritesDef.players.p2 : null;
      playerDetail.character__c === 'p3' ? charsprite = spritesDef.players.p3 : null;

      //playerTest

      // Spawn NPC with idle standing animation
      //this.playerTest = new Player(this, 216, 216, charsprite, playerDetail.playerId__c, playerDetail.username__c, playerDetail.office_id__c, false);
      let addPlayer =  new Player(this, 216, 216, charsprite, playerDetail.playerId__c, playerDetail.username__c, playerDetail.office_id__c, false);
      addPlayer.setTexture(charsprite.idle);
      this.players.push(addPlayer);
      console.log('All other player: ', this.players);


    }
  } 


  /**
   * Recursive function to check if all players are online every 5 seconds
   */
  private checkPlayers(): void{
    //players
    setTimeout( ()=> {
      console.log('Checking players...', this.players);
      for(let i = 0; i < this.players.length; i++){
        console.log(`Time difference: ${(new Date().getTime() -  this.players[i].sessionTime.getTime()) / 1000}`);
        if(((new Date().getTime() -  this.players[i].sessionTime.getTime()) / 1000) > 4.5 ){
            console.log(`Player ${this.players[i].Id} is inactive, logging out player..`);
            this.players[i].destroy();
            this.players.splice(i, 1);
        }
      }
      this.checkPlayers();
    }, 5000);
  }


}
