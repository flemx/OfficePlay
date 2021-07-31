import { LightningElement, api } from "lwc";
import PubSubParent from "c/pubSubParent";
import { EventNames } from "c/types";
import uId from "@salesforce/user/Id";
import { subscribe } from "lightning/empApi";
import pubPlayer from "@salesforce/apex/PlayerEvent.publishPlayer";

/**
 *  @typedef {{
 *      sobjectType: string,
 *      moveSignal__c: boolean,
 *      move_coord__c: string,
 *      office_id__c: string,
 *      playerId__c: string,
 *      character__c: string,
 *      username__c: string}
 * } playerEvent
 *
 *  @typedef {{
 *      Id: string,
 *      Name: string,
 *      Office_Play_Config__c: string,
 *      User__c: string,
 *      Character__c: string }
 * } playerRecord
 */
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

  /** @type playerRecord */
  // @ts-ignore
  player;

  playerPublished = false;

  @api get playerRecord() {
    return this.player;
  }

  set playerRecord(val) {
    if (val.Id && !this.playerPublished) {
      //console.log("Player Record is: ", JSON.parse(JSON.stringify(val)));
      this.playerPublished = true;
      this.player = val;
      this.subscribePlayer();
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

    this.commHandler.subscribe((/** @type string **/ name) => {
      this.playerName = name;
    }, EventNames.gameScene_playerName);

    this.commHandler.subscribe(
      this.publishPlayer.bind(this),
      EventNames.gameScene_playerPing
    );
  }

  /**
   *
   * @param {*} response
   */
  playerEventCallback(response) {
    /** @type playerEvent */
    let player = response.data.payload;
    if (
      player.office_id__c === this.playerRecord.Office_Play_Config__c &&
      player.playerId__c !== this.playerRecord.Id
    ) {
      console.log(`Ping received from player: ${player.username__c}`);
      this.commHandler.publish(
        // @ts-ignore
        window.phaserIframeElement,
        {
          data: player,
          eventName: EventNames.gameScene_playerPing
        }
      );
    }

    //console.log('New platform event received: ', response);
  }

  subscribePlayer() {
    subscribe(this.channelName, -1, this.playerEventCallback.bind(this)).then(
      (response) => {
        // Response contains the subscription information on subscribe call
        this.subscription = response;
        console.log(
          "this.subscription:",
          JSON.parse(JSON.stringify(this.subscription))
        );
      }
    );
  }

  /**
   *
   * @param {playerEvent} event
   */
  publishPlayer(event) {
    pubPlayer({ playerEvent: event })
      .then((result) => {
        //console.log(`Published player: ${event.username__c}`);
      })
      .catch((error) => {
        console.log("ERROR executing pubPlayer: ", error);
      });
  }
}
