import * as Phaser from 'phaser';
import NPC from '../objects/NPC';
//import HoverSelect from '../objects/HoverSelect';
import Player from '../objects/Player';
import GameMap from '../objects/GameMap';
import { Coordinate, NodeKey } from '../models/types';

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
  //private hoverEffect!: HoverSelect;

  constructor() {
    super('Game');
  }

  public init(): void {
    // Start Ui scene in parallel, placed on top
    // this.scene.launch('Ui');   // Not used for the moment
  }

  public create(): void {
    this.createPlayer();
    this.createNPC();
    this.createMap();
    this.createAudio();
    this.createInput();
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
    this.player = new Player(this, 216, 216, 'player-walk');
  }

  private createInput(): void {
    // On mouse press retrieve the shortest path to destination
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if(this.gamemap.isValidPath({x: pointer.worldX, y: pointer.worldY})){
        const destination: Coordinate = this.gamemap.getNodeKey({x: pointer.worldX, y: pointer.worldY});
        const startPoint: Coordinate = this.gamemap.getNodeKey({x: this.player.x, y: this.player.y});
        // get optimnal path 
        const path = this.gamemap.getPath(startPoint,destination);;
        console.log('The shortest path is: ', path);
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
      }
    });
  }

  private createNPC(): void {
    // Spawn NPC with idle standing animation
    this.officeHelpNpc = new NPC(this, 285, 75, 'office-help', ()=> console.log('NPC Clicked!'));
    //this.hoverEffect = new HoverSelect(this, 285, 25, 'select', 1.5);
    
  }

  private createMap(): void {
    // setup map configuration
    const config = [
      {
        tilesetImage: 'background',
        layer: 'background',
      },
      {
        tilesetImage: 'furniture',
        layer: 'furniture1',
      },
      {
        tilesetImage: 'furniture',
        layer: 'furniture2',
      },
      {
        tilesetImage: 'furniture',
        layer: 'above1',
      },
      {
        tilesetImage: 'furniture',
        layer: 'above2',
      },
      {
        tilesetImage: 'interiors',
        layer: 'interiors1',
      }
    ];

    // create map
    this.gamemap = new GameMap(this, 'map', config);
  }
}
