
import * as Phaser from 'phaser';
import {EventName} from '../models/enums';
import {EventMessage} from '../models/types';

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
  public subscribe(callback: Function, nameEvent: EventName): void{
    const eventName: string = EventName[nameEvent];
    if (!this.callbacks[eventName]) {
      this.callbacks[eventName] = new Set();
    }
    this.callbacks[eventName].add(callback);
  }

  /**
   * Send messages to the parent Lightning Web Component
   */
  public publish(message: EventMessage): void{     
    window.parent.postMessage( message, '*' );
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