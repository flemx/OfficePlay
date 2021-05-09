import { LightningElement } from "lwc";
import PubSubParent from "c/pubSubParent";
import { EventNames, Scenes, sceneName } from "c/types";

/**
 * @typedef {Record<string, boolean>} scenesEnabled
 */
export default class UiHandler extends LightningElement {
  /** @type  PubSubParent */
  commHandler;

  /** @type  {sceneName} */
  enabledScene;

  /** @type scenesEnabled */
  get enabledScenes() {
    return this.formatScenes();
  }

  constructor() {
    super();
    this.commHandler = new PubSubParent();
    this.enabledScene = Scenes.None;
  }

  /**
   * Returns an object with keys from all scenes
   * with boolean based on enabledScene
   * @returns scenesEnabled
   */
  formatScenes() {
    /** @type  scenesEnabled */
    let scenes = {};
    for (let scene in Scenes) {
      scenes[scene] = scene === this.enabledScene;
    }
    return scenes;
  }

  setScene() {
    this.enabledScene = Scenes.NewGame;
  }
}
