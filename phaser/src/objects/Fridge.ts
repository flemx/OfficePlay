import * as Phaser from 'phaser';
import HoverSelect from './HoverSelect';

/**
 * Fridge
 * @ Damien Fleminks
 */
export default class Fridge extends Phaser.Physics.Arcade.Sprite {

    

    private hoverEffect: HoverSelect;
    private fixedHover: boolean;
    private charSprite: string;
    private isOpen: boolean;

    constructor(
      scene: Phaser.Scene, // the scene this NPC will be added to
      x: number,  // the start x position of the NPC
      y: number,  // the start y position of the NPC
      charSprite: string,  // NPC spritesheet
    ){
    super(scene, x, y, charSprite);
      // Enable physics
      this.scene.physics.world.enable(this);
      this.fixedHover = false;
      this.charSprite = charSprite;
      // Set animations 
      this.scene.anims.create({
        key: `open-${charSprite}`,
        frameRate: 6,
        frames: this.scene.anims.generateFrameNumbers(charSprite, { start: 0, end: 6 }),
        repeat: 0,
      });
      this.scene.anims.create({
        key: `close-${charSprite}`,
        frameRate: 6,
        frames: this.scene.anims.generateFrameNumbers(charSprite, { start: 6, end: 12 }),
        repeat: 0,
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
      //this.play(`open-${this.charSprite}`);
      this.body.immovable = true;
      this.hoverEffect = new HoverSelect(scene, x, y - 40, 'select', 1.5);
      this.isOpen = false;
      this.setInteractive();
      this.setEventListeners();  // Configure interaction later
    }
  
  
    public getCharSpite(): string{
      return this.charSprite;
    }
  
    public setHoverEffect(enabled: boolean): void{
      this.hoverEffect.activateHover(enabled);
      this.fixedHover = enabled;
    }
  
  
  
  
    private setEventListeners(): void{
      this.on('pointerdown', () => {
        if(this.isOpen){
            this.play(`close-${this.charSprite}`);
            this.isOpen = false;
        }else{
            this.play(`open-${this.charSprite}`);
            this.isOpen = true;
        }
      });
      this.on('pointerover', () => {
        if(!this.fixedHover) this.hoverEffect.activateHover(true);
      });
      this.on('pointerout', () => {
        if(!this.fixedHover)  this.hoverEffect.activateHover(false);
      });
    }
    
  }
  