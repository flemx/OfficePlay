/**
 * BootScene
 * @ Damien Fleminks
 */


class BootScene extends Phaser.Scene {
    constructor(){
        super('Boot');
    }

    preload(){

       this.loadImages();
       this.loadSpriteSheets();
       this.loadAudio();

    }

    loadImages(){
        // Key name and image location
        this.load.image('button1','images/ui/blue_button01.png');
        this.load.image('button2','images/ui/blue_button02.png');
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
        this.scene.start('Title');

    }





}