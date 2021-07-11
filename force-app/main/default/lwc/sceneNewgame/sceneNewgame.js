import { LightningElement } from "lwc";
import PubSubParent from "c/pubSubParent";
import { EventNames } from "c/types";

export default class SceneNewgame extends LightningElement {
  // /** @type HTMLElement */
  // iframeElement;

  /** @type boolean */
  isRendered;

  /** @type  PubSubParent */
  commHandler;

  constructor() {
    super();
    // this.iframeElement = document.createElement("iframe");
    this.isRendered = false;
    this.commHandler = new PubSubParent();
  }

  renderedCallback() {
    if (!this.isRendered) {
      // this.commHandler.subscribe((/** @type {HTMLElement} */ iframe)=>{
      //         this.iframeElement = iframe;
      //         console.log('Receieved event',iframe);
      //     }, EventNames.iframeElSend);
    }
  }

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
