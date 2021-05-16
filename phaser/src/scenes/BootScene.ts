import * as Phaser from 'phaser';
import {spritesDef, imageDef} from '../models/data'

/**
 * BootScene
 * @ Damien Fleminks
 */

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  public preload(): void {
    // load images
    this.loadImages();
    // Load player animations
    this.loadPlayers();
    // load spritesheets
    this.loadSpriteSheets();
    // load audio
    this.loadAudio();
    // load tilemap
    this.loadTileMap(); // New code
  }

  public create(): void {
    this.scene.start('NewGame');
  }


  private loadImages(): void {
    // Key name and image location
    this.load.image(imageDef.buttons.btn1, 'assets/images/ui/blue_button01.png');
    this.load.image(imageDef.buttons.btn2, 'assets/images/ui/blue_button02.png');
    // load the map tileset image
    // Load office maps
    this.load.image(imageDef.maps.background, 'assets/level/Tileset_32x32_8.png');
    this.load.image(imageDef.maps.furniture, 'assets/level/Office_interiors_32x32.png');
    this.load.image(imageDef.maps.interiors, 'assets/level/Interiors_32x32.png');
  }

  private loadPlayers(): void {
    this.load.spritesheet(spritesDef.players.p1.walk, 'assets/images/characters/player1-run.png', { frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet(spritesDef.players.p1.idle, 'assets/images/characters/player1-idle.png', { frameWidth: 32, frameHeight: 64 });

    this.load.spritesheet(spritesDef.players.p2.walk, 'assets/images/characters/player2-run.png', { frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet(spritesDef.players.p2.idle, 'assets/images/characters/player2-idle.png', { frameWidth: 32, frameHeight: 64 });

    this.load.spritesheet(spritesDef.players.p3.walk, 'assets/images/characters/player3-run.png', { frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet(spritesDef.players.p3.idle, 'assets/images/characters/player3-idle.png', { frameWidth: 32, frameHeight: 64 });
  }

  private loadSpriteSheets(): void {
    // Load bot charactes
    this.load.spritesheet(spritesDef.npc.officeHelp.idle, 'assets/images/characters/npc-conference-idle.png', { frameWidth: 32, frameHeight: 64 }); // Load NPC
    this.load.spritesheet(spritesDef.npc.cat, 'assets/images/characters/cat.png', { frameWidth: 96, frameHeight: 32 }); // Load Cat
    
    // Load objects
    this.load.spritesheet(spritesDef.objects.coffee, 'assets/images/objects/coffee.png', { frameWidth: 32, frameHeight: 64 }); 

    // Load effects
     this.load.spritesheet(spritesDef.effects.select, 'assets/images/effects/hover_animation.png',  {frameWidth: 32, frameHeight: 32 }); // Load shover select 
  }

  private loadAudio(): void {
    // Relax background music
    //this.load.audio('background1', ['assets/audio/background1.wav']);
  }

  private loadTileMap(): void {
    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'assets/level/office.json');
  }
}
