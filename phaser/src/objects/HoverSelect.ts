import * as Phaser from 'phaser';
import GameScene from '../scenes/GameScene';

/**
 * HoverSelect
 * @ Damien Fleminks
 */
export default class HoverSelect extends Phaser.Physics.Arcade.Sprite {

  // private targetCallback: (targetScene: boolean) => any;
  private targetScene: GameScene;

  constructor(
    scene: GameScene, // the scene this spritesheet will be added to
    x: number,  // the start x position 
    y: number,  // the start y position 
    key: string,  // Select spritesheet
    scale: number, // set scale
    // setMovementLock: (targetScene: boolean) => any
  ){
  super(scene, x, y, key);
  this.targetScene = scene; //set scene in seperate property to access custom methods
    // Enable physics
    this.scene.physics.world.enable(this);
    // Set animations
    this.scene.anims.create({
      key: 'hover',
      frameRate: 3,
      frames: this.scene.anims.generateFrameNumbers(key, { start: 0, end: 1 }),
      repeat: -1,
    });

    // Scale 
    this.setScale(scale);
    // Add to our existing scene
    this.scene.add.existing(this);
    // Make sure it is visible by putting layer on top
    this.setDepth(10);
    // Start animation
    this.play('hover');
    this.body.immovable = true;
    // this.targetCallback = setMovementLock;
    this.activateHover(false)
  }

  public activateHover(isActive: boolean): void{
    this.setVisible(isActive);
    this.targetScene.setMovementLock(isActive);
  }  

  
}
