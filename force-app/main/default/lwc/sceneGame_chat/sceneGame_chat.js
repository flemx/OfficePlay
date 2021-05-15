import { LightningElement } from "lwc";
import ASSETS from "@salesforce/resourceUrl/remoteOfficeAssets";

export default class SceneGame_chat extends LightningElement {
  /** @type boolean */
  chatCollapsed;

  /** @type string */
  npcChat;

  /** @type string */
  get chatHeight() {
    let style = "height: 30px; bottom:0px; left: 170px;";
    if (this.chatCollapsed)
      style = "height: 280px; bottom: -125px; left: 170px;";
    return style;
  }

  constructor() {
    super();
    this.chatCollapsed = false;
    this.npcChat = ASSETS + "/assets/images/ui/npc-chat.png";
  }

  /**
   *  Toggle chat window collapse
   */
  toggleChat() {
    this.chatCollapsed = !this.chatCollapsed;
  }
}
