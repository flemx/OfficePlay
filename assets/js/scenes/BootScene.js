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
        // Load NPC
        this.load.spritesheet('office-help', 'level/npc-conference.png', {frameWidth: 32, frameHeight: 48});
    }

    loadPlayer(){
        this.load.atlas("atlas", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.png", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json");
    }

    loadSpriteSheets(){
        // Load image as array of sprites devided by size
        this.load.spritesheet('items','images/items.png',{frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('characters','images/characters.png',{frameWidth: 32, frameHeight: 32});
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