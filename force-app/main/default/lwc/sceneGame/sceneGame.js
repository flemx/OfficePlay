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
      console.log("Player Record is: ", JSON.parse(JSON.stringify(val)));
      this.playerPublished = true;
      this.player = val;
      this.subscribePlayer();
      /** @type playerEvent */
      let event = {
        sobjectType: "office_player__e",
        moveSignal__c: false,
        move_coord__c: "",
        office_id__c: val.Office_Play_Config__c,
        playerId__c: val.Id,
        character__c: val.Character__c,
        username__c: val.Name
      };
      this.publishPlayer(event);
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
      console.log("Event received: ", JSON.parse(JSON.stringify(player)));
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
        console.log(
          "Subscription request sent to: ",
          JSON.stringify(response.channel)
        );
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
        if (result) {
          console.log("Published player: ", event);
        }
      })
      .catch((error) => {
        console.log("ERROR executing pubPlayer: ", error);
      });
  }
}
