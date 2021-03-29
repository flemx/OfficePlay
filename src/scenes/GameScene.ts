import * as Phaser from 'phaser';
import PathFinder from '../algorithms/PathFinder';
import NPC from '../classes/NPC';
import Player from '../classes/Player';
import GameMap from '../classes/GameMap';

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

  constructor() {
    super('Game');
  }

  init() {
    // Start Ui scene in parallel, placed on top
    // this.scene.launch('Ui');   // Not used for the moment
  }

  create() {
    this.createPlayer();
    this.createNPC();
    this.createMap();
    this.createAudio();
    this.createInput();
  }

  update() {
    // this.player.update(this.cursors,this.walkTest);
    this.player.update();
  }

  createAudio() {
    this.backgroundAudio = this.sound.add('background1', { loop: true });
    this.backgroundAudio.play();
  }

  createPlayer() {
    // Spawn player at location 216,216
    // this.player = new Player(this,216,216,"atlas", "misa-front");
    this.player = new Player(this, 216, 216, 'player-walk');
  }

  createInput() {
    // On mouse press retrieve the shortest path to destination
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const destination = this.gamemap.tilemap.getTileAtWorldXY(pointer.worldX, pointer.worldY, 'background');
      const startPoint = this.gamemap.tilemap.getTileAtWorldXY(this.player.x, this.player.y, 'background');
      const desVertex = `x${destination.x}y${destination.y}`;
      if (this.gamemap.illigals[desVertex]) {
        console.log(`Coordinate ${desVertex} is an illigal destination!`);
      } else {
        // Call pathfinder algorithm
        const dk = new PathFinder();
        const path = dk.findPath(`x${startPoint.x}y${startPoint.y}`, `x${destination.x}y${destination.y}`, this.gamemap.graph);
        console.log('The shortest path is: ', path);
        this.player.resetPath();
        for (const coord of path) {
          this.player.addCoord(
            {
              x: this.gamemap.coordinates[coord].x,
              y: this.gamemap.coordinates[coord].y,
            },
          );
        }
        this.player.nextCoord();
      }
    });
  }

  createNPC() {
    // Spawn NPC with idle standing animation
    this.officeHelpNpc = new NPC(this, 285, 75, 'office-help');
  }

  createMap() {
    // setup map configuration
    const mapConfig = [
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
      },
    ];

    // create map
    this.gamemap = new GameMap(this, 'map', mapConfig, this.player, this.officeHelpNpc);
  }
}
