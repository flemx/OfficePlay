// import { LightningElement } from 'lwc';

const CrossCommHandler = class CrossCommHandler {
  /** @type string */
  iframeOrigin;

  /** @type  string*/
  receivedMessage;

  /**
   *
   * @param {string} iframeOrigin
   */
  constructor(iframeOrigin) {
    //super();
    this.iframeOrigin = iframeOrigin;
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

  testFun() {
    console.log("FUN WORKING!");
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
  sendMessgaeToPhaser(ifameElement, message) {
    if (ifameElement) {
      // @ts-ignore
      ifameElement.contentWindow.postMessage(message, this.iframeOrigin);
    }
  }
};

export { CrossCommHandler };
