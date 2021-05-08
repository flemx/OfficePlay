/**
 * CrossCommHandler
 * Provides set of functions to communicate with child Iframe
 * @Author Damien Fleminks
 *
 * @typedef {('TEST' | 'event-test')} types
 * @typedef {{data: {}, eventName : types}} messageObj
 */
const CrossCommHandler = class CrossCommHandler {
  // /** @type string */
  // iframeOrigin;

  /** @type  messageObj */
  receivedMessage;

  /** @type Object<string, Set<Function>> */
  callbacks;

  /**
   * Define the message types
   */
  get messageTypes() {
    /** @type  {{TEST: 'TEST'}} */
    const types = {
      TEST: "TEST"
    };
    Object.freeze(types);
    return types;
  }

  constructor() {
    //super();
    // this.iframeOrigin = iframeOrigin;
    this.receivedMessage = { data: "", eventName: this.messageTypes.TEST };
    //console.log("Resource URL IS: ", this.iframeOrigin);
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

  // /**
  //  *  Set origin domain url
  //  * @param {string} iframeOrigin
  //  */
  // setOrigin(iframeOrigin){
  //   this.iframeOrigin = iframeOrigin;
  // }

  /**
   *
   * @param {MessageEvent} message
   * @return {void}
   */
  handleResponse(message) {
    console.log("received: ", message);
    // check the origin match for both source and target
    // if (message.origin === this.iframeOrigin) {
    let dataObj = JSON.parse(message.data);
    console.log(dataObj);
    this.receivedMessage = dataObj;
    // }
  }

  // /**
  //  *
  //  * @param {string} message
  //  * @return {void}
  //  */
  // handleChange(message) {
  //   this.messageToSend = message;
  // }

  /**
   *
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
};

export { CrossCommHandler };
