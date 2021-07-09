import { LightningElement, api, track } from "lwc";
import { NavigationMixin } from "lightning/navigation";

export default class EventTile extends NavigationMixin(LightningElement) {
  @api recordId;
  @api name; //The Name displayed of each tile
  @api image; //The Rich Text content to display as image
  @track recordPageUrl;

  //Callback fires when component is added to DOM
  onClick() {
    // console.log(this.recordId);
    // // Generate a URL to the record page
    // this[NavigationMixin.Navigate]({
    //   type: "standard__recordPage",
    //   attributes: {
    //     recordId: this.recordId,
    //     objectApiName: "Office_Play_config__c",
    //     actionName: "view"
    //   }
    // });
  }

  get sessionpic() {
    return `background-image:url('${this.image}')`;
  }
}
