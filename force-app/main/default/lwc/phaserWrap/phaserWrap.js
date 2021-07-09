import { LightningElement, api } from "lwc";
import ASSETS from "@salesforce/resourceUrl/remoteOfficeAssets";
import PubSubParent from "c/pubSubParent";
import { EventNames } from "c/types";
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

  /** @type  PubSubParent */
  commHandler;

  /** @type boolean */
  rendered;

  /** @type string */
  @api gameId;

  /**  @type string */
  get canvasHeight() {
    return `height:${this.windowHeight - this.bannerHeightNumber}px`;
  }

  /** @type string */
  get bannerHeight() {
    //return `height:${this.windowHeight * (1 - this.scale)}px`;
    return `height:${this.bannerHeightNumber}px`;
  }

  /** @type string  */
  get containerHeigh() {
    return `height:${this.windowHeight - this.bannerHeightNumber + 32}px`;
  }

  /**  @type string */
  get iframeUrl() {
    let orignParam = `?id=${window.origin}`;
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
    this.windowHeight = 650;
    this.bannerHeightNumber = 0;
    this.devMode = false;
    this.mousedown = false;
    this.m_pos = 0;
    this.commHandler = new PubSubParent();
    this.rendered = false;
    //console.log(new CrossCommHandler().testFun());
  }

  /**
   *  Set all Event Listeners after elements are rendered
   */
  renderedCallback() {
    if (!this.rendered) {
      // @ts-ignore
      window.phaserIframeElement = this.template.querySelector("iframe");
      this.rendered = true;
      console.log("Id is: " + this.gameId);
    }
    //   // CrossCommHandler will listen for message events
    //   this.commHandler.subscribe(this.testEvent, "eventTest");

    // window.addEventListener(
    //   "mousemove",
    //   (e) => {
    //     if (this.mousedown) {
    //       // @ts-ignore
    //       let iframe = this.template.querySelector("iframe");
    //       this.resizeIframe(e, iframe);
    //     }
    //   },
    //   false
    // );

    // window.addEventListener(
    //   "mouseup",
    //   () => {
    //     this.mousedown = false;
    //   },
    //   false
    // );

    // // @ts-ignore
    // let el = this.template.querySelector(".container");
    // el.addEventListener("resize", () => {
    //   // Event listener to resize iframe height when browser height ius adjusted
    //   let newHeight = parseInt(
    //     // @ts-ignore
    //     this.template.querySelector(".container").offsetHeight
    //   );
    //   this.windowHeight = newHeight;
    // });
    // this.isRendered = true;
    // }
  }

  /**
   * Test callback function for Subsccribe function
   * @param {MessageEvent} e
   * @listens MessageEvent
   */
  testEvent(e) {
    console.log("EVENT TEST", e);
  }

  /**
   * Resize Iframe height based on dragging direction
   * @param {MouseEvent} e
   * @param {HTMLElement} iframe
   */
  resizeIframe(e, iframe) {
    const dx = e.y - this.m_pos;
    this.m_pos = e.y;
    iframe.style.height =
      parseInt(getComputedStyle(iframe, "").height) + dx + "px";
  }

  /**
   * Dev mode will use different source of iframe url
   * Used for WebPack developer hot reload local server
   * @return void
   */
  handleToggleChange() {
    this.devMode = !this.devMode;
    //this.commHandler.setOrigin(this.iframeOrigin);
  }

  sendEvent() {
    // @ts-ignorethis.iframeOrigin
    let ifameElement = this.template.querySelector("iframe");
    console.log("iframe from wrapper:", ifameElement);
    this.commHandler.publish(ifameElement, {
      data: { message: "I come from LWC" },
      eventName: "eventTest"
    });
  }
}
