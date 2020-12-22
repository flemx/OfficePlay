/**
 * Player
 * @ Chest Fleminks
 */


class Chest extends Phaser.Physics.Arcade.Image {

    constructor(scene, x, y, key, frame){
        super(scene, x, y, key, frame);
        this.scene = scene;  // the scene this gameobject will be added to
        this.coins = 10; // amount of coins this chest contains
        // Enable physics
        this.scene.physics.world.enable(this);

        // Add the sprite to our existing scene
        this.scene.add.existing(this)

    }

    makeActive(){
        this.setActive(true);
        this.setVisible(true);
        this.body.checkCollision.none = false;
    }


    makeInactive(){
        this.setActive(false);
        this.setVisible(false);
        this.body.checkCollision.none = true;
    }



}