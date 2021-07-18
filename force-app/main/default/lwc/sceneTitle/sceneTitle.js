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
  @api gameId;
  // get gameId() {
  //   return this.gameIdVal;
  // }

  // @api set gameId(val) {
  //   console.log('this.playerRetrieved = ', this.playerRetrieved);
  //   if(!this.playerRetrieved){
  //     console.log("Setting gameID: " + val);
  //     this.gameIdVal = val;

  //   }
  // }

  constructor() {
    super();
    this.commHandler = new PubSubParent();
    this.isRendered = false;
    this.commHandler.subscribe(
      this.getPlayer.bind(this),
      EventNames.titleScene_playerDetail
    );
  }

  /**
   *  Get player from DB and publish the player data to phaser
   */
  getPlayer() {
    console.log("execute getPlayer with gameId:" + this.gameId);
    findPlayer({ gameId: this.gameId })
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
