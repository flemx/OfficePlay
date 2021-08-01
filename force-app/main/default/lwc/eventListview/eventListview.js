import { LightningElement, track, wire } from "lwc";
import PubSubParent from "c/pubSubParent";
import gameList from "@salesforce/apex/OfficePlayUtility.getGames";

/**
 *  The EventListview component provides an overview of all the available game sessions which are activated
 */
export default class EventListview extends LightningElement {
  /** @type  PubSubParent */
  commHandler;

  /** @type boolean */
  startGame;

  /** @type string | null */
  activeGameId;

  @wire(gameList) data;
  activeSections = "A";
  activeSectionsMessage = "";

  constructor() {
    super();
    this.commHandler = new PubSubParent();
    this.startGame = false;
    this.activeGameId = null;
  }

  startGameSession(e) {
    console.log("Starting game:", e);

    this.activeGameId = e.detail;
    console.log("this.activeGameId: ", this.activeGameId);
    this.startGame = true;
  }

  stopGame() {
    location.reload();
  }

  unsubscribeAll() {
    this.commHandler.unsubscribeAll();
    console.log("Check calbacks from lwc: ", this.commHandler);
    this.startGame = false;
  }

  /**
   *
   * @param {*} event
   */
  handleSectionToggle(event) {
    const openSections = event.detail.openSections;

    if (openSections.length === 0) {
      this.activeSectionsMessage = "All sections are closed";
    } else {
      this.activeSectionsMessage = "Open sections: " + openSections.join(", ");
    }
  }

  addSIC() {
    console.log("clicked add sic");
    this.template.querySelector(".modalSIC").classList.remove("slds-hide");
  }

  closeModalSIC() {
    console.log("close sic");
    this.template.querySelector(".modalSIC").classList.add("slds-hide");
  }
}
