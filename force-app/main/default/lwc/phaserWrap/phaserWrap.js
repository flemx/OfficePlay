import { LightningElement, api } from "lwc";
import ASSETS from "@salesforce/resourceUrl/remoteOfficeAssets";
import PubSubParent from "c/pubSubParent";

/**
 *  The PhaserWrap component wraps the phaser game instance as iframe child
 *  It also contains the ScenesHandler class which manages all game scenes
 */
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
    this.devMode = false; // USE TO TOGGLE IFRAME TO LOCALHOST FOR LOCALSERVER TESTING
    this.mousedown = false;
    this.m_pos = 0;
    this.commHandler = new PubSubParent();
    this.rendered = false;
  }

  /**
   *  Set all Event Listeners after elements are rendered
   */
  renderedCallback() {
    // @ts-ignore
    window.phaserIframeElement = this.template.querySelector("iframe");
    if (!this.rendered) {
      this.rendered = true;
    }
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
