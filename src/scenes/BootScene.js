import * as Phaser from 'phaser';
/**
 * BootScene
 * @ Damien Fleminks
 */

export default class BootScene extends Phaser.Scene {
  constructor() {
    console.log('Load BootScene');
    super('Boot');
  }

  preload() {
    // load images
    this.loadImages();
    // Load player animations
    this.loadPlayer();
    // load spritesheets
    this.loadSpriteSheets();
    // load audio
    this.loadAudio();
    // load tilemap
    this.loadTileMap(); // New code
  }

  loadImages() {
    // Key name and image location
    this.load.image('button1', 'assets/images/ui/blue_button01.png');
    this.load.image('button2', 'assets/images/ui/blue_button02.png');
    // load the map tileset image
    // Load office maps
    this.load.image('background', 'assets/level/Tileset_32x32_8.png');
    this.load.image('furniture', 'assets/level/Office_interiors_32x32.png');
    this.load.image('interiors', 'assets/level/Interiors_32x32.png');
  }

  loadPlayer() {
    this.load.spritesheet('player-walk', 'assets/images/characters/player1-run.png', { frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet('player-idle', 'assets/images/characters/player1-idle.png', { frameWidth: 32, frameHeight: 64 });
  }

  loadSpriteSheets() {
    // Load image as array of sprites devided by size
    this.load.spritesheet('office-help', 'assets/level/npc-conference.png', { frameWidth: 32, frameHeight: 48 }); // Load NPC
  }

  loadAudio() {
    // Relax background music
    this.load.audio('background1', ['assets/audio/background1.wav']);
  }

  create() {
    this.scene.start('Title');
  }

  loadTileMap() {
    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'assets/level/office.json');
  }
}
