import * as Phaser from 'phaser';

/**
 * NPC
 * @ Damien Fleminks
 */
export default class NPC extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene, // the scene this NPC will be added to
    x: number,  // the start x position of the NPC
    y: number,  // the start y position of the NPC
    key: string  // NPC spritesheet
  ){
  super(scene, x, y, key);
    // Enable physics
    this.scene.physics.world.enable(this);
    // Set animations
    this.scene.anims.create({
      key: 'ideNpc',
      frameRate: 6,
      frames: this.scene.anims.generateFrameNumbers('office-help', { start: 0, end: 5 }),
      repeat: -1,
    });

    // Scale our player
    this.setScale(1.3);
    // Collide with our world bounds
    this.setCollideWorldBounds(true);
    // Add the player to our existing scene
    this.scene.add.existing(this);
    // Make sure player is visible by putting layer on top
    this.setDepth(4);
    // Start animation
    this.play('ideNpc');
    this.body.immovable = true;
  }
  
}
