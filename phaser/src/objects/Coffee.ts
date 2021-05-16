import * as Phaser from 'phaser';
import HoverSelect from './HoverSelect';

/**
 * Coffee
 * @ Damien Fleminks
 */
export default class Coffee extends Phaser.Physics.Arcade.Sprite {


  //private targetCallback: () => any;  // Add callback function for click event
  private hoverEffect: HoverSelect;
  private fixedHover: boolean;
  private charSprite: string;

  constructor(
    scene: Phaser.Scene, // the scene this NPC will be added to
    x: number,  // the start x position of the NPC
    y: number,  // the start y position of the NPC
    charSprite: string,  // NPC spritesheet
    //targetCallback: () => any
  ){
  super(scene, x, y, charSprite);
    // Enable physics
    this.scene.physics.world.enable(this);
    this.fixedHover = false;
    this.charSprite = charSprite;
    // Set animations 
    this.scene.anims.create({
      key: `anim-${charSprite}`,
      frameRate: 6,
      frames: this.scene.anims.generateFrameNumbers(charSprite, { start: 0, end: 5 }),
      repeat: -1,
    });

    // Scale our NPC
    this.setScale(1.5);
    // Collide with our world bounds
    this.setCollideWorldBounds(true);
    // Add the player to our existing scene
    this.scene.add.existing(this);
    // Make sure player is visible by putting layer on top
    this.setDepth(12);
    // Start animation
    this.play(`anim-${this.charSprite}`);
    this.body.immovable = true;
    this.hoverEffect = new HoverSelect(scene, x, y - 40, 'select', 1.5);
    //this.targetCallback = targetCallback;
    //this.setInteractive();
    //this.setEventListeners();
  }


  public getCharSpite(): string{
    return this.charSprite;
  }

  public setHoverEffect(enabled: boolean): void{
    this.hoverEffect.activateHover(enabled);
    this.fixedHover = enabled;
  }




//   private setEventListeners(): void{
//     this.on('pointerdown', () => {
//       this.targetCallback(); // trigger calback function
//     });
//     this.on('pointerover', () => {
//       if(!this.fixedHover) this.hoverEffect.activateHover(true);
//     });
//     this.on('pointerout', () => {
//       if(!this.fixedHover)  this.hoverEffect.activateHover(false);
//     });
//   }
  
}
