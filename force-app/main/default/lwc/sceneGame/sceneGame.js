import { LightningElement, api } from "lwc";
import PubSubParent from "c/pubSubParent";
import { EventNames } from "c/types";
import uId from "@salesforce/user/Id";
import { subscribe } from "lightning/empApi";
import pubPlayer from "@salesforce/apex/PlayerEvent.publishPlayer";
export default class SceneGame extends LightningElement {
  /** @type string */
  channelName;

  /** @type  PubSubParent */
  commHandler;

  /** @type boolean */
  isRendered;

  /** @type string */
  playerName;

  /** @type string */
  userId;

  // // @ts-ignore
  // @api gameId;

  /** @type string */
  // @ts-ignore
  gameIdVal;

  /** @type Object */
  subscription;

  /** @type any */
  player;

  playerPublished = false;

  /** @type any */
  @api get playerRecord() {
    return this.player;
  }

  set playerRecord(val) {
    if (val.Id && !this.playerPublished) {
      this.playerPublished = true;
      this.player = val;
      this.subscribePlayer();
      this.publishPlayer(val.Id, false, "", val.Office_Play_Config__c);
    }
  }

  @api gameId;

  constructor() {
    super();
    this.channelName = "/event/office_player__e";
    this.commHandler = new PubSubParent();
    this.isRendered = false;
    this.playerName = "Player";
    this.userId = uId;
    this.subscription = {};
    this.playerRecord = {};
    this.commHandler.subscribe((/** @type string **/ name) => {
      this.playerName = name;
    }, EventNames.gameScene_playerName);
  }

  playerEventCallback(response) {
    let player = JSON.stringify(response.data.payload);
    // console.log("Event received: ", JSON.parse(player));
    // console.log("Event office_id__c: ", JSON.parse(player).office_id__c);
    // console.log("gameId: ", this.playerRecord.Office_Play_Config__c);
    if (
      JSON.parse(player).office_id__c ===
      this.playerRecord.Office_Play_Config__c
    ) {
      console.log("Event received: ", JSON.parse(player));
    }

    //console.log('New platform event received: ', response);
  }

  subscribePlayer() {
    subscribe(this.channelName, -1, this.playerEventCallback.bind(this)).then(
      (response) => {
        // Response contains the subscription information on subscribe call
        console.log(
          "Subscription request sent to: ",
          JSON.stringify(response.channel)
        );
        this.subscription = response;
        console.log("this.subscription:", this.subscription);
      }
    );
  }

  /**
   *
   * @param {string} playerId
   * @param {boolean} isMove
   * @param {string} coord
   * @param {string} gameId
   */
  publishPlayer(playerId, isMove, coord, gameId) {
    let player = {
      sobjectType: "office_player__e",
      moveSignal__c: isMove,
      move_coord__c: coord,
      office_id__c: gameId,
      playerId__c: playerId
    };

    pubPlayer({ playerEvent: player })
      .then((result) => {
        if (result) {
          console.log("Published player: ", player);
        }
      })
      .catch((error) => {
        console.log("ERROR executing pubPlayer: ", error);
      });
  }
}
