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

  get containerHeigh() {
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
    this.windowHeight = 0;
  }

  renderedCallback() {
    if (!this.isRendered) {
      // @ts-ignore
      let el = this.template.querySelector(".container");
      new ResizeObserver(() => {
        // @ts-ignore
        let newHeight = parseInt(
          this.template.querySelector(".container").offsetHeight
        );
        this.windowHeight = newHeight;
      }).observe(el);
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
