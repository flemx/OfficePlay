import { LightningElement, api } from "lwc";
import PubSubParent from "c/pubSubParent";
import { EventNames } from "c/types";
import findPlayer from "@salesforce/apex/PlayerUtility.getPlayer";

export default class SceneTitle extends LightningElement {
  /** @type  PubSubParent */
  commHandler;

  /** @type any */
  gameIdVal;

  @api set gameId(val) {
    console.log(val);
    this.gameIdVal = val;
    this.commHandler.subscribe(() => {
      this.getPlayer(val);
    }, EventNames.titleScene_playerDetail);
  }

  /** #@type string */
  get gameId() {
    return this.gameIdVal;
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
    console.log("execute getPlayer");
    findPlayer({ gameId: gameId })
      .then((result) => {
        console.log("getPlayer() result from lwc:", result);
        if (result) {
          console.log("publish titleScene_playerDetail");
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

    // this.commHandler.publish(
    //     // @ts-ignore
    //     window.phaserIframeElement,
    //     {
    //       data: this.gameId,
    //       eventName: EventNames.titleScene_playerDetail
    //     }
    //   );
  }
}
