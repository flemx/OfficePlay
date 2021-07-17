/**
 * PubSubParent
 * Provides set of functions to communicate with child Iframe
 * Implementation of Publish Subscribe Design Pattern
 * @Author Damien Fleminks
 *
 * @typedef {{data: {}, eventName : string}} EventMessage
 * @typedef {Record<string, Set<Function>>} callbacks
 */
export default class PubSubParent {
  /** @type callbacks */
  callbacks;

  constructor() {
    this.callbacks = {};
    this.callbackHandler();
  }

  /**
   * Subscribe for message events and execute callback method
   * @param {Function} callback
   * @param {string} eventName
   * @return {void}
   */
  subscribe(callback, eventName) {
    //console.log('PubSubParent subscribing to: ',eventName);
    if (!this.callbacks[eventName]) {
      this.callbacks[eventName] = new Set();
    }
    this.callbacks[eventName].add(callback);
  }

  /**
   * Execute callback when an event matches eventName
   * @private
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
   * @param {EventMessage} message
   * @return {void}
   */
  publish(ifameElement, message) {
    //console.log('PubSubParent publishing to: ', message.eventName);
    if (ifameElement) {
      // @ts-ignore
      ifameElement.contentWindow.postMessage(message, "*");
    }
  }

  /**
   *
   * Publish internally inside LWC
   * @param {EventMessage} message
   * @return {void}
   */
  publishInternal(message) {
    console.log("message: ", message);
    /// @ts-ignore
    window.postMessage(message);
  }

  /**
   * Remove all callbacks
   * @returns {void}
   */
  unsubscribeAll() {
    this.callbacks = {};
  }

  /**
   * Unsubscribe a callback for an event
   * @param {string} eventName - Name of the event to unregister from.
   * @param {Function} callback - Function to unregister.
   * @returns {void}
   */
  unsubscribe(eventName, callback) {
    if (this.callbacks[eventName]) {
      this.callbacks[eventName].delete(callback);
    }
  }
}
