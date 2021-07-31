import { LightningElement, api } from "lwc";
import PubSubParent from "c/pubSubParent";
import { EventNames } from "c/types";
import findPlayer from "@salesforce/apex/PlayerUtility.getPlayer";
import insertPlayer from "@salesforce/apex/PlayerUtility.createPlayer";
import {
  subscribe,
  unsubscribe,
  onError,
  setDebugFlag,
  isEmpEnabled
} from "lightning/empApi";

/**
 * SceneHandler
 * @description Handles the visibility of UI elements to render in a Phaser scene,
 * Subscribes to PubSub Class to handle visibility
 * @author Damien Fleminks
 *
 * @typedef {Record<string, boolean>} scenesEnabled
 * @typedef {Record<string,string>} scenes
 * @typedef {{name: String, character: String}} player
 */
export default class ScenesHandler extends LightningElement {
  channelName = "/event/office_player__e";

  /** @type  PubSubParent */
  commHandler;

  /** @type  {string} */
  enabledScene;

  /** @type scenes */
  scenes;

  /** @type boolean*/
  isRendered;

  /** @type any */
  playerRecord;

  // @ts-ignore
  @api gameId;

  /** @type scenesEnabled */
  get enabledScenes() {
    let scenes = this.formatScenes();
    // console.log("scenes:", scenes);
    return scenes;
  }

  constructor() {
    super();
    this.commHandler = new PubSubParent();
    this.isRendered = false;
    // Define object to restrict scenes to use
    this.scenes = {
      TitleScene: "TitleScene",
      NewGame: "NewGame",
      GameScene: "GameScene",
      None: "None"
    };
    Object.freeze(this.scenes);
    // Enable the first scene to render
    this.enabledScene = this.scenes.None;
    this.playerRecord = null;

    // will display the scene component based on the scene the event send through
    this.commHandler.subscribe((/** @type string **/ scene) => {
      console.log("EVENT RECEIVED", scene);
      this.enabledScene = scene;
    }, EventNames.startScene);

    this.commHandler.subscribe((/** @type {player} */ player) => {
      this.createPlayer(player);
    }, EventNames.startGame_createPlayer);

    // this.commHandler.subscribe((/** @type {any} */ player) => {
    //   this.playerRecord = player;
    // }, EventNames.startGame_createPlayer);

    // subscribe and retrieve player data on event
    this.commHandler.subscribe(
      this.getPlayer.bind(this),
      EventNames.titleScene_playerDetail
    );

    console.log(JSON.stringify(isEmpEnabled));

    // // Callback invoked whenever a new event message is received
    // const messageCallback = function (response) {
    //   console.log("New PE received: ", JSON.stringify(response));
    //   // Response contains the payload of the new message received
    // };

    // // Invoke subscribe method of empApi. Pass reference to messageCallback
    // subscribe(this.channelName, -1, messageCallback).then((response) => {
    //   // Response contains the subscription information on subscribe call
    //   console.log(
    //     "Subscription request sent to: ",
    //     JSON.stringify(response.channel)
    //   );
    // });
  }

  /**
   *  Get player from DB and publish the player data to phaser
   */
  getPlayer() {
    console.log("execute getPlayer with gameId:" + this.gameId);
    findPlayer({ gameId: this.gameId })
      .then((result) => {
        if (result) {
          this.playerRecord = result;
          this.commHandler.publish(
            // @ts-ignore
            window.phaserIframeElement,
            {
              data: result,
              eventName: EventNames.titleScene_playerDetail
            }
          );
        }
      })
      .catch((error) => {
        console.log("ERROR executing findPlayer: ", error);
      });
  }

  /**
   *
   * @param {player} player
   */
  createPlayer(player) {
    this.isLoading = true;
    insertPlayer({
      Name: player.name,
      character: player.character,
      gameId: this.gameId
    })
      .then((result) => {
        console.log("insert result is: ", result);
        // console.log("createPlayer() result from lwc:", result);
        if (result) {
          this.playerRecord = result;
          this.commHandler.publish(
            // @ts-ignore
            window.phaserIframeElement,
            {
              data: result,
              eventName: EventNames.startGame_createPlayer
            }
          );
        }
        this.isLoading = false;
      })
      .catch((error) => {
        console.log("ERROR executing insertPlayer: ", error);
        this.isLoading = false;
      });
  }

  // renderedCallback(){
  //   if(!this.isRendered){
  //     this.commHandler.subscribe((/** @type string **/ scene)=>{
  //       console.log('EVENT RECEIVED', scene);
  //         this.enabledScene = scene;
  //     }, EventNames.scene_startGame);
  //   }
  // }

  /**
   * Returns an object with keys from all scenes
   * with boolean based on enabledScene
   * @returns scenesEnabled
   */
  formatScenes() {
    /** @type  scenesEnabled */
    let scenes = {};
    for (let scene in this.scenes) {
      scenes[scene] = scene === this.enabledScene;
    }
    //console.log(scenes);
    return scenes;
  }
}
