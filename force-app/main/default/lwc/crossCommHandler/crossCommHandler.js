// import { LightningElement } from 'lwc';

export default class CrossCommHandler {
  /** @type string */
  iframeOrigin;

  /** @type  string*/
  receivedMessage;

  /**
   *
   * @param {string} staticResource
   */
  constructor(staticResource) {
    //super();
    this.iframeOrigin = `${staticResource}/${staticResource}`;
    this.receivedMessage = "";

    console.log("Resource URL IS: ", this.iframeOrigin);
    window.addEventListener("message", this.handleResponse.bind(this), false);
  }

  /**
   *
   * @param {MessageEvent} message
   * @return {void}
   */
  handleResponse(message) {
    // check the origin match for both source and target
    if (message.origin === this.iframeOrigin) {
      this.receivedMessage = JSON.stringify(message.data);
    }
  }

  /**
   *
   * @param {string} message
   * @return {void}
   */
  handleChange(message) {
    this.messageToSend = message;
  }

  /**
   *
   * @param {HTMLIFrameElement} ifameElement
   * @param {string} message
   * @return {void}
   */
  sendMessgaeToVisualForce(ifameElement, message) {
    if (ifameElement) {
      // @ts-ignore
      ifameElement.contentWindow.postMessage(message, this.iframeOrigin);
    }
  }
}
