import { LightningElement } from "lwc";
import PubSubParent from "c/pubSubParent";
import { EventNames } from "c/types";

export default class SceneTitle extends LightningElement {
  /** @type  PubSubParent */
  commHandler;

  constructor() {
    super();
    this.commHandler = new PubSubParent();
    this.commHandler.subscribe(
      this.getPlayer,
      EventNames.titleScene_playerDetail
    );
  }

  getPlayer() {
    // this.commHandler.publish(
    //     // @ts-ignore
    //     window.phaserIframeElement,
    //     {
    //       data: this.gameId,
    //       eventName: EventNames.titleScene_playerDetail
    //     }
    //   );
  }
}
