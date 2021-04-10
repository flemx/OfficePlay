import { LightningElement } from "lwc";
import ASSETS from "@salesforce/resourceUrl/remoteOfficeAssets";
export default class PhaserWrap extends LightningElement {
  /** @type string */
  iframeUrl;

  /** @type number */
  windowHeight;

  /**  @type string */
  get canvasHeight() {
    return `height:${this.windowHeight * this.scale}px`;
  }

  /** @type string */
  get bannerHeight() {
    return `height:${this.windowHeight * (1 - this.scale)}px`;
  }

  get containerStyle() {
    return `height:${this.windowHeight}vh`;
  }

  /** @type boolean */

  isRendered = false;

  /** @type number */
  scale;

  constructor() {
    super();
    this.iframeUrl = ASSETS + "/index.html";
    this.scale = 0.8; // set scale of canvas relative to banner
    //this.windowHeight =
  }

  renderedCallback() {
    if (!this.isRendered) {
      // @ts-ignore
      this.querySelector(".container").addEventListener("resize", (e) => {
        console.log(e);
      });
      this.isRendered = true;
    }
  }

  // /**
  //  * Set windowHeight to innerHeight of window
  //  * @returns {string} window height in style parameter
  //  */
  //  innerHeight(){
  //     console.log('setHeight() run');
  //     return `height:${window.innerHeight * this.scale}px`;
  // }

  // /**
  //  * Set windowHeight to innerHeight of window
  //  * @returns {string} window height in style parameter
  //  */
  //  innerHeight(){
  //     console.log('setHeight() run');
  //     return `height:${window.innerHeight * this.scale}px`;
  // }
}
