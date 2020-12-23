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
        this.load.image('background', 'level/background-extruded.png');  
    }

    loadSpriteSheets(){
        // Load image as array of sprites devided by size
        this.load.spritesheet('items','images/items.png',{frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('characters','images/characters.png',{frameWidth: 32, frameHeight: 32});
    }

    loadAudio(){
        //pick most appropriate audio format supported by browser
        this.load.audio('goldSound', ['audio/Pickup.wav']);
    }

    create(){
        this.scene.start('Game');

    }

    loadTileMap() {
        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('map', 'level/large_level.json');
      }




}