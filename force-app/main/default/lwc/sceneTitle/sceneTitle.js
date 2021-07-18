import { LightningElement, api } from "lwc";
import PubSubParent from "c/pubSubParent";
import { EventNames } from "c/types";
import findPlayer from "@salesforce/apex/PlayerUtility.getPlayer";

export default class SceneTitle extends LightningElement {
  /** @type  PubSubParent */
  commHandler;

  /** @type any */
  gameIdVal;

  /** #@type string */
  get gameId() {
    return this.gameIdVal;
  }

  @api set gameId(val) {
    console.log("Setting gameID: " + val);
    this.gameIdVal = val;
    this.commHandler.subscribe(() => {
      this.getPlayer(val);
    }, EventNames.titleScene_playerDetail);
  }

  constructor() {
    super();
    this.commHandler = new PubSubParent();
    this.isRendered = false;
  }

  /**
   *  Get player from DB and publish the player data to phaser
   * @param {*} gameId
   */
  getPlayer(gameId) {
    findPlayer({ gameId: gameId })
      .then((result) => {
        if (result) {
          this.commHandler.publish(
            // @ts-ignore
            window.phaserIframeElement,
            {
              data: result,
              eventName: EventNames.titleScene_playerDetail
            }
          );
        }
      })
      .catch((error) => {
        console.log("ERROR executing findPlayer: ", error);
      });
  }
}
