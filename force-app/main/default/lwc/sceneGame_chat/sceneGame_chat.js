import { LightningElement } from "lwc";
import PubSubParent from "c/pubSubParent";
import { EventNames } from "c/types";
import ASSETS from "@salesforce/resourceUrl/remoteOfficeAssets";
export default class SceneGame_chat extends LightningElement {
  /** @type boolean */
  chatCollapsed;

  /** @type string */
  npcChat;

  /** @type boolean */
  isRendered;

  /** @type  PubSubParent */
  commHandler;

  /** @type string */
  get chatHeight() {
    let style = "height: 280px; bottom: -125px; left: 170px;";
    if (this.chatCollapsed) style = "height: 30px; bottom:0px; left: 170px;";
    return style;
  }

  constructor() {
    super();
    this.chatCollapsed = true;
    this.npcChat = ASSETS + "/assets/images/characters/ui/npc-chat.png";
    this.isRendered = false;
    this.commHandler = new PubSubParent();
  }

  renderedCallback() {
    if (!this.isRendered) {
      this.commHandler.subscribe(
        this.botMessage.bind(this),
        EventNames.gameScene_botMsg
      );
      this.isRendered = true;
    }
  }

  /**
   *  Toggle chat window collapse
   */
  toggleChat() {
    this.chatCollapsed = !this.chatCollapsed;
  }

  /**
   * Insert message from bot
   * @param {string} msg
   */
  botMessage(msg) {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    let template = document.createElement("template");
    let botImg = ASSETS + "/assets/images/characters/ui/npc-chat.png";
    template.innerHTML = `
      <div class="message new">
        <figure class="avatar"><img src=${botImg} /></figure>
            ${msg} 
        <div class="timestamp">${time}</div>
       </div>`;
    if (this.chatCollapsed) this.toggleChat();
    // @ts-ignore
    this.template
      .querySelector(".mCSB_container")
      .appendChild(template.content);
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
      this.template
        // @ts-ignore
        .querySelector(".mCSB_container")
        .appendChild(template.content);
      inputEl.value = "";
    }
  }

  // /**
  //  * @param {string} msg representing a single element
  //  * @return {ChildNode | null}
  //  */
  //  getMessageHtml(msg) {
  //   let template = document.createElement('template');
  //   html = html.trim(); // Never return a text node of whitespace as the result
  //   template.innerHTML = html;
  //   return template.content.firstChild;
  // }
}
