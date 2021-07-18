import { LightningElement, api, track } from "lwc";
import { NavigationMixin } from "lightning/navigation";

export default class EventTile extends NavigationMixin(LightningElement) {
  @api recordId;
  @api name; //The Name displayed of each tile
  @api image; //The Rich Text content to display as image
  @track recordPageUrl;

  /**
   * Bubble up Start_OfficePlay record ID and start the game session
   */
  onClick() {
    // @ts-ignore
    this.dispatchEvent(
      // Default values for bubbles and composed are false.
      new CustomEvent("startgamesession", { detail: this.recordId })
    );
  }

  get sessionpic() {
    return `background-image:url('${this.image}')`;
  }
}
