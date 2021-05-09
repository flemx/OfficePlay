import { LightningElement } from "lwc";
import PubSubParent from "c/pubSubParent";
import { EventNames } from "c/types";

/**
 * SceneHandler
 * @description Handles the visibility of UI elements to render in a Phaser scene,
 * Subscribes to PubSub Class to handle visibility
 * @author Damien Fleminks
 *
 * @typedef {Record<string, boolean>} scenesEnabled
 * @typedef {Record<string,string>} scenes
 */
export default class SceneHandler extends LightningElement {
  /** @type  PubSubParent */
  commHandler;

  /** @type  {string} */
  enabledScene;

  /** @type scenes */
  scenes;

  /** @type scenesEnabled */
  get enabledScenes() {
    return this.formatScenes();
  }

  constructor() {
    super();
    this.commHandler = new PubSubParent();
    // Define object to restrict scenes to use
    this.scenes = {
      NewGame: "NewGame",
      None: "None"
    };
    Object.freeze(this.scenes);
    // Enable the first scene to render
    this.enabledScene = this.scenes.NewGame;
  }

  /**
   * Returns an object with keys from all scenes
   * with boolean based on enabledScene
   * @returns scenesEnabled
   */
  formatScenes() {
    /** @type  scenesEnabled */
    let scenes = {};
    for (let scene in this.scenes) {
      scenes[scene] = scene === this.enabledScene;
    }
    return scenes;
  }
}
