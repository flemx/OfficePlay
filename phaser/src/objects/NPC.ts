import * as Phaser from 'phaser';
import GameScene from '../scenes/GameScene';
import HoverSelect from './HoverSelect';

/**
 * NPC
 * @ Damien Fleminks
 */
export default class NPC extends Phaser.Physics.Arcade.Sprite {


  private targetCallback: () => any;  // Add callback function for click event
  private hoverEffect: HoverSelect;

  constructor(
    scene: GameScene, // the scene this NPC will be added to
    x: number,  // the start x position of the NPC
    y: number,  // the start y position of the NPC
    key: string,  // NPC spritesheet
    targetCallback: () => any
  ){
  super(scene, x, y, key);
    // Enable physics
    this.scene.physics.world.enable(this);
    // Set animations
    this.scene.anims.create({
      key: 'ideNpc',
      frameRate: 6,
      frames: this.scene.anims.generateFrameNumbers(key, { start: 0, end: 5 }),
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
    this.play('ideNpc');
    this.body.immovable = true;
    this.hoverEffect = new HoverSelect(scene, 285, 25, 'select', 1.5);
    this.targetCallback = targetCallback;
    this.setInteractive();
    this.setEventListeners();
  }


  setEventListeners(){
    this.on('pointerdown', () => {
      this.targetCallback(); // trigger calback function
    });
    this.on('pointerover', () => {
      this.hoverEffect.activateHover(true);
    });
    this.on('pointerout', () => {
      this.hoverEffect.activateHover(false);
    });
  }
  
}
