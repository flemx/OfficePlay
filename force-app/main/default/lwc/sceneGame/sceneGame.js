import { LightningElement } from "lwc";
import PubSubParent from "c/pubSubParent";
import { EventNames } from "c/types";

export default class SceneGame extends LightningElement {
  /** @type  PubSubParent */
  commHandler;

  /** @type boolean */
  isRendered;

  /** @type string */
  playerName;

  constructor() {
    super();
    this.commHandler = new PubSubParent();
    this.isRendered = false;
    this.playerName = "Player";
    this.commHandler.subscribe((/** @type string **/ name) => {
      this.playerName = name;
    }, EventNames.gameScene_playerName);
  }
}
