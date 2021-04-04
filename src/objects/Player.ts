import * as Phaser from 'phaser';
import { Coordinate } from '../models/types';
/**
 * Player
 * @ Damien Fleminks
 */

export default class Player extends Phaser.Physics.Arcade.Sprite {


  private speed: number;
  private lastMove: 'back' | 'left' | 'right' | 'front';
  private _path: Array<Coordinate>; // Path the player should walk
  private _nextCoord: Coordinate | undefined; // Keep track of next coord to move to
  private _body: Phaser.Physics.Arcade.Body;

  constructor(
      scene: Phaser.Scene, // the scene this container will be added to
      x: number,  // the start x position of the player
      y: number,  // the start y position of the player
      key: string  // player spritesheet
    ){
    super(scene, x, y, key);

    // Enable physics
    this.scene.physics.world.enable(this);
    this.speed = 250; // Velocity when moving our player
    this.setSize(32, 32);
    this.setOffset(0, 32);
    this.lastMove = 'front';
    //this.playerPos = {};
    this._path = [];
    this._nextCoord = {x:x,y:y};
    this._body = this.body as Phaser.Physics.Arcade.Body;
    // Setup all player animations
    this.setPlayerAnims();

    // Scale our player
    this.setScale(1.5);
    // Collide with our world bounds
    this.setCollideWorldBounds(true);
    // Add the player to our existing scene
    this.scene.add.existing(this);
    // have the camera follow the player
    this.scene.cameras.main.startFollow(this);
    // Make sure player is visible by putting layer on top
    this.setDepth(5);
  }

  /**
   *  Add coordinates to define a path for player to walk
   * @param coord defines the coordinate on the map
   */
  public addCoord(coord: Coordinate): void{
    this._path.push(coord);
  }

  /**
   *  Empty the _path array
   */
  public resetPath(): void{
    this._path.length = 0;
  }


  /**
   *  Sets the next Coordinate the player will walk to to the first value in the walking path
   */
  public nextCoord(): void{
      this._nextCoord = this._path[0];
  }

  private setPlayerAnims(): void {
    // Set animations
    const anims = this.scene.anims;

    // Walk animation
    anims.create({
      key: 'player-left-walk',
      frames: this.scene.anims.generateFrameNumbers('player-walk', { start: 12, end: 17 }),
      frameRate: 6,
      repeat: -1,
    });
    anims.create({
      key: 'player-right-walk',
      frames: this.scene.anims.generateFrameNumbers('player-walk', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: 'player-front-walk',
      frames: this.scene.anims.generateFrameNumbers('player-walk', { start: 18, end: 23 }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: 'player-back-walk',
      frames: this.scene.anims.generateFrameNumbers('player-walk', { start: 6, end: 12 }),
      frameRate: 10,
      repeat: -1,
    });

    // Idle animation
    anims.create({
      key: 'player-left-idle',
      frames: this.scene.anims.generateFrameNumbers('player-idle', { start: 12, end: 17 }),
      frameRate: 8,
      repeat: -1,
    });
    anims.create({
      key: 'player-right-idle',
      frames: this.scene.anims.generateFrameNumbers('player-idle', { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1,
    });
    anims.create({
      key: 'player-front-idle',
      frames: this.scene.anims.generateFrameNumbers('player-idle', { start: 18, end: 23 }),
      frameRate: 8,
      repeat: -1,
    });
    anims.create({
      key: 'player-back-idle',
      frames: this.scene.anims.generateFrameNumbers('player-idle', { start: 6, end: 11 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.play('player-front-idle', true);
  }

  public update(): void {
    // Get the move coordinatess reletaive from the players position and next move
    let moveCoord = this.nextMoveCoord();
    // move player to next coordinate
    this.movePlayer(moveCoord);
  }

  /**
   *  Calculate coordinate used to determine direction of player for animations
   * @returns coordimnes with directions
   */
  private nextMoveCoord(): Coordinate{

    let moveCoord = {x:0,y:0};
    if (this._nextCoord) {
      // debugger;
      moveCoord.x = this._nextCoord.x - this.x;
      moveCoord.y = this._nextCoord.y - this.y;

      if (Math.abs(moveCoord.x) < 5) {
        moveCoord.x = 0;
      }
      if (Math.abs(moveCoord.y) < 5) {
        moveCoord.y = 0;
      }

      if (moveCoord.y === 0 && moveCoord.x === 0) {
        if (this._path.length > 0) {
          this._nextCoord = this._path.shift();
          return moveCoord;
        }
        this._nextCoord = undefined;
      }
    }
    return moveCoord;
  }

  /**
   * Based on next coordinate and players position move player with animation
   * @param coor coordinate used to determine direction of player for animations
   */
  private movePlayer(coor:  Coordinate): void{
    // Stop any previous movement from the last frame
    this._body.setVelocity(0);
    const moveState = {
      left: { isDown: coor.x < 0 },
      right: { isDown: coor.x > 0 },
      up: { isDown: coor.y < 0 },
      down: { isDown: coor.y > 0 },
    };
    // Horizontal movement
    if (moveState.left.isDown) {
      this._body.setVelocityX(-this.speed);
    } else if (moveState.right.isDown) {
      this._body.setVelocityX(this.speed);
      // this.scene.physics.moveTo(this, this.x + 10, this.y + 10, 200);
    }
    // Vertical movement
    if (moveState.up.isDown) {
      this._body.setVelocityY(-this.speed);
    } else if (moveState.down.isDown) {
      this._body.setVelocityY(this.speed);
    }
    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.body.velocity.normalize().scale(this.speed);
    // Update the animation last and give left/right animations precedence over up/down animations
    if (moveState.left.isDown) {
      this.anims.play('player-left-walk', true);
      this.lastMove = 'left';
    } else if (moveState.right.isDown) {
      this.anims.play('player-right-walk', true);
      this.lastMove = 'right';
    } else if (moveState.up.isDown) {
      this.anims.play('player-back-walk', true);
      this.lastMove = 'back';
    } else if (moveState.down.isDown) {
      this.anims.play('player-front-walk', true);
      this.lastMove = 'front';
    } else {
      // this.anims.stop();
      if (this.lastMove === 'left') {
        this.anims.play('player-left-idle', true);
      }
      if (this.lastMove === 'right') {
        this.anims.play('player-right-idle', true);
      }
      if (this.lastMove === 'front') {
        this.anims.play('player-front-idle', true);
      }
      if (this.lastMove === 'back') {
        this.anims.play('player-back-idle', true);
      }
    }
  }

}
