import { LightningElement } from 'lwc';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import {
//     loadScript,
//     loadStyle
// } from 'lightning/platformResourceLoader';
// import PHASER from '@salesforce/resourceUrl/phaser';

export default class PhaserTest extends LightningElement {


    // d3Initialized = false;

    // renderedCallback() {
    //     if (this.d3Initialized) {
    //         return;
    //     }
    //     this.d3Initialized = true;

    //     Promise.all([
    //         loadScript(this, PHASER)
    //     ])
    //         .then(() => {
    //             this.loadGame();
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }


    loadGame(){
        //var canvas = this.template.querySelector('[data-id=mycanvas');
        // var context = canvas.getContext('2d');
           
        // context.font = '20pt Calibri';
        // context.fillStyle = 'green';
        // context.fillText('Welcome to Tutorialspoint', 70, 70);
        // var config = {
        //     type: Phaser.AUTO,
        //     width: 800,
        //     height: 600,
        //     physics: {
        //         default: 'arcade',
        //         arcade: {
        //             gravity: { y: 200 }
        //         }
        //     },
        //     scene: {
        //         preload: preload,
        //         create: create
        //     }
        // };
    
        // var game = new Phaser.Game(config);
    
        // function preload ()
        // {
        //     this.load.setBaseURL('http://labs.phaser.io');
    
        //     this.load.image('sky', 'assets/skies/space3.png');
        //     this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        //     this.load.image('red', 'assets/particles/red.png');
        // }
    
        // function create ()
        // {
        //     this.add.image(400, 300, 'sky');
    
        //     var particles = this.add.particles('red');
    
        //     var emitter = particles.createEmitter({
        //         speed: 100,
        //         scale: { start: 1, end: 0 },
        //         blendMode: 'ADD'
        //     });
    
        //     var logo = this.physics.add.image(400, 100, 'logo');
    
        //     logo.setVelocity(100, 200);
        //     logo.setBounce(1, 1);
        //     logo.setCollideWorldBounds(true);
    
        //     emitter.startFollow(logo);
        // }
    }
}