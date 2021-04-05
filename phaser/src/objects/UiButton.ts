import * as Phaser from 'phaser';
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

export default class UiButton extends Phaser.GameObjects.Container {

  private targetCallback: (targetScene: String) => any;

  constructor(
    scene: Phaser.Scene, // the scene this container will be added to
    x: number,  // the x position of our container
    y: number,  // the y position of our container
    key: string,  // Background image of button
    hoverKey: string,  // the image that will be displayed when the player hover over
    text: string,  // the text that will be displayed on button
    startScene: (targetScene: String) => any
    ) {
    super(scene, x, y);
    this.scene = scene; 
    this.x = x; 
    this.y = y; 
    // Callback function that will be called when player clicks button
    this.targetCallback = startScene;
    // create our ui button
    this.createButton({key : key, hoverKey: hoverKey, text: text});
    // add this container to our phaser scene
    this.scene.add.existing(this);
  }

  /**
   * Create the button from the configuration and add to container 
   * @param config 
   */
  private createButton(config: {key: string, hoverKey: string, text: string}): void {
    // Start string
    const button = this.scene.add.image(0, 0, config.key);
    // Make it interactive so you can click and add text
    button.setInteractive();
    // scale the button
    button.setScale(1.4);
    // Create button text
    const buttonText = this.scene.add.text(
      0, 0, config.text,
      { fontSize: '26px', color: '#fff' },
    );
    // Method to allign objects inside eacht other
    Phaser.Display.Align.In.Center(buttonText, button);
    // Add the two game objects to our container
    this.add(button);
    this.add(buttonText);
    // Event listeners for button, hover & click
    button.on('pointerdown', () => {
      this.targetCallback('Game');
    });
    button.on('pointerover', () => {
      button.setTexture(config.hoverKey);
    });
    button.on('pointerout', () => {
      button.setTexture(config.key);
    });
  }
}
