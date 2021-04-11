import { LightningElement } from "lwc";
import ASSETS from "@salesforce/resourceUrl/remoteOfficeAssets";
export default class PhaserWrap extends LightningElement {
  //   /** @type string */
  //   iframeUrl;

  /** @type number */
  windowHeight;

  /** @type number */
  bannerHeightNumber;

  /** @type boolean */
  devMode;

  /** @type boolean */
  isRendered = false;

  /** @type number */
  scale;

  /**  @type string */
  get canvasHeight() {
    return `height:${this.windowHeight * this.scale}px`;
  }

  /** @type string */
  get bannerHeight() {
    //return `height:${this.windowHeight * (1 - this.scale)}px`;
    return `height:${this.bannerHeightNumber}px`;
  }

  /** @type string */
  get containerHeigh() {
    return `height:${this.windowHeight}vh`;
  }

  /**  @type string */
  get iframeUrl() {
    return this.devMode ? "http://localhost:3000" : ASSETS + "/index.html";
  }

  constructor() {
    super();
    //this.iframeUrl = ASSETS + "/index.html";
    this.scale = 0.8; // set scale of canvas relative to banner
    this.windowHeight = 0;
    this.bannerHeightNumber = 50;
    this.devMode = true;
  }

  renderedCallback() {
    if (!this.isRendered) {
      // @ts-ignore
      let el = this.template.querySelector(".container");
      new ResizeObserver(() => {
        let newHeight = parseInt(
          // @ts-ignore
          this.template.querySelector(".container").offsetHeight
        );
        this.windowHeight = newHeight;
      }).observe(el);
      this.isRendered = true;
    }
  }

  handleToggleChange() {
    this.devMode = !this.devMode;
    // // Query the DOM
    // const checked = Array.from(
    //   // @ts-ignore
    //   this.template.querySelectorAll("lightning-input")
    // )
    //   // Filter down to checked items
    //   .filter((element) => element.checked)
    //   // Map checked items to their labels
    //   .map((element) => element.label);
    // this.selection = checked.join(", ");
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
