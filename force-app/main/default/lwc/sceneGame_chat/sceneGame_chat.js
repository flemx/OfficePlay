import { LightningElement, api } from "lwc";
import PubSubParent from "c/pubSubParent";
import { EventNames } from "c/types";
import ASSETS from "@salesforce/resourceUrl/remoteOfficeAssets";
import { subscribe } from "lightning/empApi";
import pubChat from "@salesforce/apex/PlayerEvent.publishChat";

/**
 *  @typedef {{
 *      sobjectType: string,
 *      message__c: string,
 *      office_id__c: string,
 *      playerId__c: string,
 *      character__c: string,
 *      username__c: string}
 * } chatEvent
 *
 *  @typedef {{
 *      Id: string,
 *      Name: string,
 *      Office_Play_Config__c: string,
 *      User__c: string,
 *      Character__c: string }
 * } playerRecord
 */
export default class SceneGame_chat extends LightningElement {
  /** @type string */
  channelName;

  /** @type boolean */
  chatCollapsed;

  /** @type string */
  npcChat;

  /** @type boolean */
  isRendered;

  /** @type  PubSubParent */
  commHandler;

  /** @type Record<string, string> */
  botImages;

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

  /** @type string */
  get chatHeight() {
    let style = "height: 280px; bottom: -117px; left: 170px;";
    if (this.chatCollapsed) style = "height: 30px; bottom:8px; left: 170px;";
    return style;
  }

  constructor() {
    super();
    this.channelName = "/event/office_chat__e";
    this.chatCollapsed = true;
    this.npcChat = ASSETS + "/assets/images/characters/ui/npc-chat.png";
    this.isRendered = false;
    this.commHandler = new PubSubParent();
    this.botImages = {
      npc: ASSETS + "/assets/images/characters/ui/npc-chat.png",
      cat: ASSETS + "/assets/images/characters/ui/cat-chat.png",
      p1: ASSETS + "/assets/images/characters/ui/p1.png",
      p2: ASSETS + "/assets/images/characters/ui/p2.png",
      p3: ASSETS + "/assets/images/characters/ui/p3.png"
    };
    Object.freeze(this.botImages);
  }

  renderedCallback() {
    if (!this.isRendered) {
      this.commHandler.subscribe(
        this.botMessage.bind(this),
        EventNames.gameScene_botMsg
      );
      this.isRendered = true;

      // @ts-ignore
      this.template
        .querySelector(".message-input")
        .addEventListener("keyup", (event) => {
          if (event.keyCode === 13) {
            this.insertMessage();
            return false;
          }
        });
    }
  }

  subscribePlayer() {
    subscribe(this.channelName, -1, this.chatEventCallback.bind(this)).then(
      (response) => {
        // Response contains the subscription information on subscribe call
        console.log("Subscribed to: :", JSON.parse(JSON.stringify(response)));
      }
    );
  }

  /**
   *  Toggle chat window collapse
   */
  toggleChat() {
    this.chatCollapsed = !this.chatCollapsed;
  }

  /**
   * Insert message from bot
   * @param {chatEvent} data
   */
  botMessage(data) {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    let template = document.createElement("template");
    let botImg = this.botImages[data.character__c];
    template.innerHTML = `
      <div class="message new">
        <figure class="avatar"><img src=${botImg} /></figure>
            ${data.message__c} 
        <div class="timestamp">${time} , ${data.username__c}</div>
       </div>`;
    if (this.chatCollapsed) this.toggleChat();

    let pEl = this.template
      // @ts-ignore
      .querySelector(".mCSB_container");

    pEl.insertBefore(template.content, pEl.firstChild);
  }

  /**
   *
   * @param {*} response
   */
  chatEventCallback(response) {
    /** @type chatEvent */
    let event = response.data.payload;
    if (
      event.office_id__c === this.playerRecord.Office_Play_Config__c &&
      event.playerId__c !== this.playerRecord.Id
    ) {
      console.log(
        `Chat event received from player: ${event.username__c}, message: ${event.message__c}`
      );
      this.botMessage(event);
    }
  }

  /**
   * Insert personal message in chat
   */
  insertMessage() {
    // @ts-ignore
    let inputEl = this.template.querySelector(".message-input");
    if (inputEl.value !== "") {
      let template = document.createElement("template");
      template.innerHTML = `<div class="message message-personal new"> ${inputEl.value}</div>`;
      let pEl = this.template.querySelector(".mCSB_container");
      pEl.insertBefore(template.content, pEl.firstChild);

      /** @type chatEvent */
      let eventData = {
        sobjectType: "office_chat__e",
        message__c: inputEl.value,
        office_id__c: this.playerRecord.Office_Play_Config__c,
        playerId__c: this.playerRecord.Id,
        character__c: this.playerRecord.Character__c,
        username__c: this.playerRecord.Name
      };

      this.publishChatEvent(eventData);

      inputEl.value = "";
    }
  }

  /**
   *
   * @param {chatEvent} eventData
   */
  publishChatEvent(eventData) {
    pubChat({ chatEvent: eventData })
      .then((result) => {
        if (result) {
          console.log("Published chat message: ", eventData);
        }
      })
      .catch((error) => {
        console.log("ERROR executing publishChatEvent: ", error);
      });
  }
}
