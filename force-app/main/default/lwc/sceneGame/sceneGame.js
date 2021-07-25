import { LightningElement, api } from "lwc";
import PubSubParent from "c/pubSubParent";
import { EventNames } from "c/types";
import uId from "@salesforce/user/Id";
import {
  subscribe,
  unsubscribe,
  onError,
  setDebugFlag,
  isEmpEnabled
} from "lightning/empApi";
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
  @api playerRecord;

  // @ts-ignore
  get gameId() {
    return this.gameIdVal;
  }

  @api set gameId(val) {
    this.gameIdVal = val;
    subscribe(this.channelName, -1, this.playerEventCallback).then(
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
    console.log("Event received: ", JSON.parse(player));
    //console.log('New platform event received: ', response);
  }

  testEvent() {
    let player = {
      sobjectType: "office_player__e",
      moveSignal__c: false,
      move_coord__c: "",
      office_id__c: this.gameId,
      playerId__c: this.playerRecord.Id
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
