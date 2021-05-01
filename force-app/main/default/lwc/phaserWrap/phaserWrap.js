import { LightningElement } from "lwc";
import ASSETS from "@salesforce/resourceUrl/remoteOfficeAssets";
import { CrossCommHandler } from "c/crossCommHandler";
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

  /** @type boolean */
  mousedown;

  /** @type number */
  m_pos;

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
    let orignParam = `?origin=${window.origin}`;
    return this.devMode
      ? `http://localhost:3000${orignParam}`
      : `${ASSETS}/index.html${orignParam}`;
  }

  get iframeOrigin() {
    return this.devMode ? `http://localhost:3000` : `${window.origin}`;
  }

  constructor() {
    super();
    //this.iframeUrl = ASSETS + "/index.html";
    this.scale = 0.8; // set scale of canvas relative to banner
    this.windowHeight = 500;
    this.bannerHeightNumber = 50;
    this.devMode = true;
    this.mousedown = false;
    this.m_pos = 0;
    //console.log(new CrossCommHandler().testFun());
  }

  /**
   *  Set all Event Listeners after all elements are rendered
   */
  renderedCallback() {
    if (!this.isRendered) {
      let panel = this.template.querySelector(".resize");
      // @ts-ignore
      panel.addEventListener(
        "mousedown",
        (e) => {
          // Used to track position of pointer for resizing iframe
          this.mousedown = true;
          this.m_pos = e.y;
        },
        false
      );

      window.addEventListener(
        "mousemove",
        (e) => {
          if (this.mousedown) {
            // @ts-ignore
            let iframe = this.template.querySelector("iframe");
            this.resizeIframe(e, iframe);
          }
        },
        false
      );

      window.addEventListener(
        "mouseup",
        () => {
          console.log("mouseup");
          this.mousedown = false;
        },
        false
      );

      // @ts-ignore
      let el = this.template.querySelector(".container");
      el.addEventListener("resize", () => {
        // Event listener to resize iframe height when browser height ius adjusted
        let newHeight = parseInt(
          // @ts-ignore
          this.template.querySelector(".container").offsetHeight
        );
        this.windowHeight = newHeight;
      });
      this.isRendered = true;
    }
  }

  /**
   * Resize Iframe height based on dragging direction
   * @param {MouseEvent} e
   * @param {HTMLElement} iframe
   */
  resizeIframe(e, iframe) {
    console.log("resize called", iframe.style.height);
    const dx = e.y - this.m_pos;
    this.m_pos = e.y;
    iframe.style.height =
      parseInt(getComputedStyle(iframe, "").height) + dx + "px";
  }

  /**
   * Dev mode will use different source of iframne url
   * Used for WebPack developer hot reload local server
   * @return void
   */
  handleToggleChange() {
    this.devMode = !this.devMode;
  }

  sendEvent() {
    // @ts-ignore
    let ifameElement = this.template.querySelector("iframe");
    new CrossCommHandler(this.iframeOrigin).sendMessgaeToPhaser(
      ifameElement,
      "Received!!!!"
    );
  }
}
