import { LightningElement } from "lwc";
import PubSubParent from "c/pubSubParent";
import { EventNames } from "c/types";

export default class SceneNewgame extends LightningElement {
  /** @type  PubSubParent */
  commHandler;

  /** @type HTMLElement */
  iframeElement;

  /** @type boolean */
  isRendered;

  constructor() {
    super();
    this.commHandler = new PubSubParent();
    this.iframeElement = document.createElement("iframe");
    this.isRendered = false;
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
    // this.commHandler
    console.log(e.detail.value);
    // @ts-ignore
    console.log("iframe", window.phaserIframeElement);
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
