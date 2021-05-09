/**
 * CrossCommHandler
 * Provides set of functions to communicate with child Iframe
 * Uses Publish Subscibe Design Pattern
 * @Author Damien Fleminks
 * @typedef {{data: {}, eventName : string}} messageObj
 */
export default class CrossCommHandler {
  /** @type Object<string, Set<Function>> */
  callbacks;

  constructor() {
    this.callbacks = {};
    this.callbackHandler();
  }

  /**
   * Subscribe for message events and execute callback method
   * @param {Function} callback
   * @param {string} eventName
   */
  subscribe(callback, eventName) {
    if (!this.callbacks[eventName]) {
      this.callbacks[eventName] = new Set();
    }
    this.callbacks[eventName].add(callback);
  }

  /**
   *  Private function to handle message events
   */
  callbackHandler() {
    window.addEventListener("message", (e) => {
      if (this.callbacks[e.data.eventName]) {
        this.callbacks[e.data.eventName].forEach((callback) => {
          try {
            callback(e.data.data);
          } catch (error) {
            console.error("callbackHandler failed", error);
          }
        });
      }
    });
  }

  /**
   *
   * @param {MessageEvent} message
   * @return {void}
   */
  handleResponse(message) {
    console.log("received: ", message);
    // check the origin match for both source and target
    let dataObj = JSON.parse(message.data);
    console.log(dataObj);
    this.receivedMessage = dataObj;
  }

  /**
   *
   * Publish to Iframe from LWC
   * @param {HTMLIFrameElement} ifameElement
   * @param {messageObj} message
   * @return {void}
   */
  publish(ifameElement, message) {
    if (ifameElement) {
      /// @ts-ignore
      ifameElement.contentWindow.postMessage(message, "*");
    }
  }
}
