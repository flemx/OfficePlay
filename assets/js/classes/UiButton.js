/**
 * UiButton
 * @ Damien Fleminks
 */


/**
  * Extend  Phaser.GameObjects.Container as UI component is made of different
  * game object of different types, the container will allow to add the different
  * objects inside the container and they will be made children of the container,
  * when you move container all child objects will move along
 */



class UiButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, hoverKey, text, targetCallback){
        super(scene,x,y);
        this.scene = scene; // the scene this container will be added to
        this.x = x; // the x position of our container
        this.y = y; // the y position of our container
        this.key = key;  // Background image of button
        this.hoverKey = hoverKey;  // the image that will be displayed when the player hover over
        this.text = text; // the text that will be displayed on button
        this.targetCallback = targetCallback; // Callback function that will be called when player clicks button

        //create our ui button
        this.createButton();
        // add this container to our phaser scene
        this.scene.add.existing(this);
    }

    createButton(){

        // Start button
        this.button = this.scene.add.image(0,0,this.key);
        // Make it interactive so you can click and add text
        this.button.setInteractive();
        // scale the button
        this.button.setScale(1.4);

        //Create button text
        this.buttonText = this.scene.add.text(
            0,0,this.text,
            {fontSize: '26px', fill: '#fff'}
        );

        // Method to allign objects inside eacht other
        Phaser.Display.Align.In.Center(this.buttonText, this.button);

        // Add the two game objects to our container
        this.add(this.button);
        this.add(this.buttonText);

        // Event listeners for button, hover & click
        this.button.on('pointerdown', ()=>{
            this.targetCallback();
        });
        this.button.on('pointerover', ()=>{
            this.button.setTexture(this.hoverKey);
        });
        this.button.on('pointerout', ()=>{
            this.button.setTexture(this.key);
        });
    }





}