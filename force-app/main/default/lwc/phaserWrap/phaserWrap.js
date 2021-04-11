import { LightningElement } from "lwc";
import ASSETS from "@salesforce/resourceUrl/remoteOfficeAssets";
export default class PhaserWrap extends LightningElement {
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
    return `height:${this.windowHeight - this.bannerHeightNumber}px`;
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

  /**
   * Dev mode will use different source of iframne url
   * Used for WebPack developer hot reload local server
   * @return void
   */
  handleToggleChange() {
    this.devMode = !this.devMode;
  }
}
