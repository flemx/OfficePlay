/**
 * BootScene
 * @ Damien Fleminks
 */


class BootScene extends Phaser.Scene {
    constructor(){
        super('Boot');
    }

    preload(){
        // load images
        this.loadImages();
        // Load player animations
        this.loadPlayer();
        // load spritesheets
        this.loadSpriteSheets();
        // load audio
        this.loadAudio();
        // load tilemap
        this.loadTileMap();    // New code

    }

    loadImages(){
        // Key name and image location
        this.load.image('button1','images/ui/blue_button01.png');
        this.load.image('button2','images/ui/blue_button02.png');
        // load the map tileset image
        // Load office maps
        this.load.image('background', 'level/Tileset_32x32_8.png'); 
        this.load.image('furniture', 'level/Office_interiors_32x32.png');
        this.load.image('interiors', 'level/Interiors_32x32.png'); 
       
    }

    loadPlayer(){
        this.load.spritesheet('player-walk', 'images/characters/player1-run.png', {frameWidth: 32, frameHeight: 64});
        this.load.spritesheet('player-idle', 'images/characters/player1-idle.png', {frameWidth: 32, frameHeight: 64});
    }

    loadSpriteSheets(){
        // Load image as array of sprites devided by size
         this.load.spritesheet('office-help', 'level/npc-conference.png', {frameWidth: 32, frameHeight: 48}); // Load NPC
    }

    loadAudio(){
        //Relax background music
        this.load.audio('background1', ['audio/background1.wav']);
    }

    create(){
        this.scene.start('Title');

    }

    loadTileMap() {
        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('map', 'level/office.json');
      }




}