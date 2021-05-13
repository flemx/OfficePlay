import * as Phaser from 'phaser';
import NPC from '../objects/NPC';
//import HoverSelect from '../objects/HoverSelect';
import Player from '../objects/Player';
import GameMap from '../objects/GameMap';
import PubSubChild from '../utils/PubSubChild';
import { Coordinate, EventMessage, CharSprite } from '../models/types';
import {EventName, scenes} from '../models/enums';
import {spritesDef, mapDef} from '../models/data'
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
  }

  testEvent(e: MessageEvent){
    console.log(e);
  }

  public init(data: any): void {
    // Start Ui scene in parallel, placed on top
    let sprite = JSON.parse(data.playerSprite);
    this.playerName = data.name;
    this.playerSprite = sprite;
  }

  public create(): void {
    this.createPlayer();
    this.createNPC();
    this.createMap();
    this.createAudio();
    this.createInput();
    this.publishScene();
    this.publishPlayer();
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
    this.player = new Player(this, 216, 216, this.playerSprite);
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
        origin: 'I AM FROM PHASER'
      },
      eventName: EventName.eventTest
  }
    // Spawn NPC with idle standing animation
    this.officeHelpNpc = new NPC(this as Phaser.Scene, 285, 75, spritesDef.npc.officeHelp, 6, ()=> {
      this.commHandler.publish(message);
    });
    this.officeHelpNpc.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.lockMovement = true;
    });
  }

  private createMap(): void {
    // create map
    this.gamemap = new GameMap(this, mapDef.office1.name, mapDef.office1.config);
  }
}
