/*--------------------  EVENT TYPES    ------------------------------ */
/**
 * Define event types used by the PubSub Class for handling MessageEvents
 * @typedef {'eventTest'} EventName
 */
/**
 * @type {EventName}
 */
let eventName;

/**
 * Export the eventNames as Object to simulate an enum used
 * to select an even when publishing or subscribing to PuSub Class
 * @type {Record<string,eventName>}
 */
const EventNames = {
  eventTest: "eventTest" // Used for testing
};
Object.freeze(EventNames);

/**
 * EventMessage type used to publish a message with the MessageEvent in the PubSub Class
 * @type {{data: {}, eventName : EventName}}
 */
let EventMessage;

/*--------------------  SCENE TYPES  ------------------------------ */

/**
 * Define Scene Names used to group UI elements to a Phaser Scene
 * @typedef {'NewGame' | 'None'} sceneName
 */
/**
 * @type {sceneName}
 */
let sceneName;

/**
 * @type {Record<string,sceneName>}
 */
const Scenes = {
  NewGame: "NewGame",
  None: "None"
};
Object.freeze(Scenes);

/*--------------------  EXPORT  ------------------------------ */

export { EventNames, EventMessage, eventName, Scenes, sceneName };
