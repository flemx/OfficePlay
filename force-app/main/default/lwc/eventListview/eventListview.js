import { LightningElement, track } from "lwc";

export default class EventListview extends LightningElement {
  startGame = false;

  testId = "a013N000002ZR2VQAW";

  @track data = [
    {
      id: this.testId,
      Name: "Classic Office",
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
    }
  ];

  activeSections = "A";
  activeSectionsMessage = "";

  toggleGame() {
    this.startGame = !this.startGame;
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
