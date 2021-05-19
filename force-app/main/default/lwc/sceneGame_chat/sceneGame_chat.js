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

  /** @type Record<string, string> */
  botImages;

  /** @type string */
  get chatHeight() {
    let style = "height: 280px; bottom: -117px; left: 170px;";
    if (this.chatCollapsed) style = "height: 30px; bottom:8px; left: 170px;";
    return style;
  }

  constructor() {
    super();
    this.chatCollapsed = true;
    this.npcChat = ASSETS + "/assets/images/characters/ui/npc-chat.png";
    this.isRendered = false;
    this.commHandler = new PubSubParent();
    this.botImages = {
      npc: ASSETS + "/assets/images/characters/ui/npc-chat.png",
      cat: ASSETS + "/assets/images/characters/ui/cat-chat.png"
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
   * @param {{message:string,img:string}} data
   */
  botMessage(data) {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    let template = document.createElement("template");
    let botImg = this.botImages[data.img];
    template.innerHTML = `
      <div class="message new">
        <figure class="avatar"><img src=${botImg} /></figure>
            ${data.message} 
        <div class="timestamp">${time}</div>
       </div>`;
    if (this.chatCollapsed) this.toggleChat();
    this.template
      // @ts-ignore
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
