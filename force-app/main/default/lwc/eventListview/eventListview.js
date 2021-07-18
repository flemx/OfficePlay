import { LightningElement, track } from "lwc";
import PubSubParent from "c/pubSubParent";
import { eventName, EventNames } from "c/types";

export default class EventListview extends LightningElement {
  /** @type  PubSubParent */
  commHandler;

  /** @type boolean */
  startGame;

  /** @type string | null */
  activeGameId;

  @track data = [
    {
      id: "a013N000002bbeXQAQ",
      Name: "Classic Office2",
      Image__c: "https://i.imgur.com/FtmSkvc.jpg"
    },
    {
      id: "a013N000002bbhbQAA",
      Name: "Beach Office",
      Image__c: "https://i.imgur.com/HGOR06S.png"
    },
    {
      id: "3",
      Name: "Farm Office",
      Image__c: "https://i.imgur.com/q3wwUF2.jpg"
    },
    {
      id: "4",
      Name: "Farm Office",
      Image__c: "https://i.imgur.com/q3wwUF2.jpg"
    }
  ];

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
