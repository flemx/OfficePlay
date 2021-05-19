import { LightningElement, track } from "lwc";

export default class EventListview extends LightningElement {
  @track data = [
    {
      id: "1",
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

  connectedCallback() {}

  /* Damien Version
    //Obtains records based on parameters provided
    @wire(getRecords)
    wiredRecords(result) {
      this.wiredRecordsResult = result;
      if (result.error) {
        console.error(result.error);
      } else if (result.data) {
        this.records.data = [];
        this.sumOfEvents = this.records.data.length;
        //If results exist, they are mapped to fields selected in the designer before assigned to each tile
        result.data.forEach(element => {
          this.records.data.push({
            id: element.Id,
            name: element.Name,
            image: element.Image__c,
            dateField: element.Start__c
          });
        });
        this.isLoading = false;
      } else {
        //When there are no results, set the dataset to empty
        this.records.data = [];
      }
    }*/

  handleSectionToggle(event) {
    const openSections = event.detail.openSections;

    if (openSections.length === 0) {
      this.activeSectionsMessage = "All sections are closed";
    } else {
      this.activeSectionsMessage = "Open sections: " + openSections.join(", ");
    }
  }
}
