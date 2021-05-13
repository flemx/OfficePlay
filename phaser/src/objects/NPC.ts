import * as Phaser from 'phaser';
import GameScene from '../scenes/GameScene';
import NewGameScene from '../scenes/NewGameScene';
import HoverSelect from './HoverSelect';
import {CharSprite} from '../models/types';

/**
 * NPC
 * @ Damien Fleminks
 */
export default class NPC extends Phaser.Physics.Arcade.Sprite {


  private targetCallback: () => any;  // Add callback function for click event
  private hoverEffect: HoverSelect;
  private fixedHover: boolean;
  private charSprite: CharSprite;

  constructor(
    scene: Phaser.Scene, // the scene this NPC will be added to
    x: number,  // the start x position of the NPC
    y: number,  // the start y position of the NPC
    charSprite: CharSprite,  // NPC spritesheet
    frameRate: number,
    targetCallback: () => any
  ){
  super(scene, x, y, charSprite.idle);
    // Enable physics
    this.scene.physics.world.enable(this);
    this.fixedHover = false;
    this.charSprite = charSprite;
    // Set animations 
    this.scene.anims.create({
      key: `anim-${charSprite.idle}`,
      frameRate: frameRate,
      frames: this.scene.anims.generateFrameNumbers(charSprite.idle, { start: 18, end: 23 }),
      repeat: -1,
    });

    // Scale our NPC
    this.setScale(1.5);
    // Collide with our world bounds
    this.setCollideWorldBounds(true);
    // Add the player to our existing scene
    this.scene.add.existing(this);
    // Make sure player is visible by putting layer on top
    this.setDepth(4);
    // Start animation
    this.play(`anim-${this.charSprite.idle}`);
    this.body.immovable = true;
    this.hoverEffect = new HoverSelect(scene, x, y - 40, 'select', 1.5);
    this.targetCallback = targetCallback;
    this.setInteractive();
    this.setEventListeners();
  }


  public getCharSpite(): CharSprite{
    return this.charSprite;
  }

  public setHoverEffect(enabled: boolean): void{
    this.hoverEffect.activateHover(enabled);
    this.fixedHover = enabled;
  }




  private setEventListeners(): void{
    this.on('pointerdown', () => {
      this.targetCallback(); // trigger calback function
    });
    this.on('pointerover', () => {
      if(!this.fixedHover) this.hoverEffect.activateHover(true);
    });
    this.on('pointerout', () => {
      if(!this.fixedHover)  this.hoverEffect.activateHover(false);
    });
  }
  
}
