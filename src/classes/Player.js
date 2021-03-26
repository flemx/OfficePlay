import * as Phaser from 'phaser';
/**
 * Player
 * @ Damien Fleminks
 */

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    // Enable physics
    this.scene.physics.world.enable(this);

    this.scene = scene;
    this.speed = 250; // Velocity when moving our player
    this.setSize(32, 32);
    this.setOffset(0, 32);
    this.lastMove = 'down';
    this.path = [];
    this.playerPos = {};

    // Keep track of next coord to move to
    this.moveToCoord = {};

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

  setPlayerAnims() {
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

  update() {
    const speed = this.speed;

    // Stop any previous movement from the last frame
    this.body.setVelocity(0);

    let moveX = 0;
    let moveY = 0;
    // console.log('this.moveToCoord', this.moveToCoord);
    if (this.moveToCoord) {
      // debugger;
      moveX = this.moveToCoord.x - this.x;
      moveY = this.moveToCoord.y - this.y;

      if (Math.abs(moveX) < 5) {
        moveX = 0;
      }
      if (Math.abs(moveY) < 5) {
        moveY = 0;
      }

      if (moveY === 0 && moveX === 0) {
        if (this.path.length > 0) {
          this.moveToCoord = this.path.shift();
          return;
        }
        this.moveToCoord = undefined;
      }
    }

    const moveState = {
      left: { isDown: moveX < 0 },
      right: { isDown: moveX > 0 },
      up: { isDown: moveY < 0 },
      down: { isDown: moveY > 0 },
    };

    // Horizontal movement
    if (moveState.left.isDown) {
      this.body.setVelocityX(-speed);
    } else if (moveState.right.isDown) {
      this.body.setVelocityX(speed);
      // this.scene.physics.moveTo(this, this.x + 10, this.y + 10, 200);
    }

    // Vertical movement
    if (moveState.up.isDown) {
      this.body.setVelocityY(-speed);
    } else if (moveState.down.isDown) {
      this.body.setVelocityY(speed);
    }
    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.body.velocity.normalize().scale(speed);

    // debugger;
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
        console.log('move left');
      }
      if (this.lastMove === 'right') {
        this.anims.play('player-right-idle', true);
      }
      if (this.lastMove === 'front') {
        this.anims.play('player-front-idle', true);
      }
      if (this.lastMove === 'back') {
        this.anims.play('player-back-idle', true);
        console.log('move up');
      }
    }
  }
}
