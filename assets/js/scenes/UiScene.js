/**
 * UiScene
 * @ Damien Fleminks
 */


class UiScene extends Phaser.Scene {
    constructor(){
        super('Ui');
    }

    create(){
        this.setupUiElements();
        this.setupEvents();
    }

    init(){
        // Grab a reference to the game scene
        this.gameScene = this.scene.get('Game');
    }


    setupUiElements(){
        // Create the score text game object
        this.scoreText = this.add.text(
            35,8,
            'Coins: 0',
            {fontSize: '16px', fill: '#fff'}
        );
        // Create coin icon
        this.coinIcon = this.add.image(15,15,'items',3);
    }

    setupEvents(){
        // Listen for the updateScore event from the game scene
        this.gameScene.events.on('updateScore', (score)=>{
            this.scoreText.setText(`Coins: ${score}`);
        });
    }
}