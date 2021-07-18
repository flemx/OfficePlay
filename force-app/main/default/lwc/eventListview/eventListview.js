import { LightningElement, track } from "lwc";

export default class EventListview extends LightningElement {
  startGame = false;

  /** @type string */
  activeGameId;

  @track data = [
    {
      id: "a013N000002bbeXQAQ",
      Name: "Classic Office2",
      Image__c: "https://i.imgur.com/FtmSkvc.jpg"
    },
    {
      id: "2",
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

  startGameSession(e) {
    console.log("Starting game:", e);

    this.activeGameId = e.detail;
    console.log("this.activeGameId: ", this.activeGameId);
    this.startGame = true;
  }

  stopGame() {
    this.startGame = false;
  }

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
