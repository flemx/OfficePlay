
import * as Phaser from 'phaser';

/**
 * PubSubChild
 * Provides set of functions to communicate with Parent Window from Iframe
 * @Author Damien Fleminks
 */
export default class PubSubChild {

  private callbacks: Record<string, Set<Function>>;

  constructor(){
    //this.lexOrigin = new URLSearchParams(window.location.search).get('origin'); 
    this.callbacks = {};
    // Set event listener for received messages
    this.callbackHandler();
  }

  /**
   * Subscribe for message events and execute callback method
   * @param callback 
   * @param eventName 
   */
  public subscribe(callback: Function, eventName: string): void{
    if (!this.callbacks[eventName]) {
      this.callbacks[eventName] = new Set();
    }
    this.callbacks[eventName].add(callback);
  }

  /**
   * Send messages to the parent Lightning Web Component
   */
  public publish(): void{     
    let messageToLWC = {
        data : {name: 'Damien'},
        eventName  : 'event-test'
    }
    window.parent.postMessage( messageToLWC, '*' );
  }
  
  /**
   *  Handle message events
   */
  private callbackHandler(): void{
    window.addEventListener("message", (e)=>{
      if(this.callbacks[e.data.eventName]){
        this.callbacks[e.data.eventName].forEach(callback => {
          try {
            callback(e.data.data);
          } catch (error) {
            console.error('callbackHandler failed', error);
          }
        });
      }
    });
  }
  
}
