import { LightningElement, api } from "lwc";
import PubSubParent from "c/pubSubParent";
import { EventNames } from "c/types";
import insertPlayer from "@salesforce/apex/PlayerUtility.createPlayer";

/**
 *  The SceneNewgame component handles creating new players ion the new game title scene
 *
 * @typedef {{name: String, character: String}} player
 */
export default class SceneNewgame extends LightningElement {
  /** @type  PubSubParent */
  commHandler;

  /** @type boolean */
  isLoading;

  /** @type string | null */
  @api gameId;

  constructor() {
    super();
    this.commHandler = new PubSubParent();
    this.gameId = null;
    this.isLoading = false;
  }

  /**
   *
   * @param {player} player
   */
  createPlayer(player) {
    this.isLoading = true;
    insertPlayer({
      Name: player.name,
      character: player.character,
      gameId: this.gameId
    })
      .then((result) => {
        // console.log("createPlayer() result from lwc:", result);
        if (result) {
          this.commHandler.publish(
            // @ts-ignore
            window.phaserIframeElement,
            {
              data: result,
              eventName: EventNames.startGame_createPlayer
            }
          );
        }
        this.isLoading = false;
      })
      .catch((error) => {
        console.log("ERROR executing insertPlayer: ", error);
        this.isLoading = false;
      });
  }

  /**
   *
   * @param {CustomEvent} e
   */
  updateValue(e) {
    // @ts-ignore
    // console.log("iframe", window.phaserIframeElement);
    this.commHandler.publish(
      // @ts-ignore
      window.phaserIframeElement,
      {
        data: e.detail.value,
        eventName: EventNames.startGame_playerName
      }
    );
  }
}
