/**
 *  PriorityQueue Class
 *  Binary heap priority queue used by the dijstra algorithm in the PathFinder class
 * @ Damien Fleminks
 */


import {QueItem } from "../models/types";
export default class PriorityQueue {

  private values: Array<QueItem>;

  constructor() {
    this.values = [];
  }

  /**
   *  Add node to queue and set priority
   * @param {*} value
   * @param {*} priority
   */
  public enqueue(item: QueItem): void {
    this.values.push(item);
    this.bubbleUp();
  }

  /**
   * Returnss the number of queued items left 
   */
  public getValueNum(): number{
      return this.values.length
  }

  /**
   *  Remove and returns the highest priority node
   */
   public dequeue(): QueItem {
    // remove highest first value and replace with latest
    const min: QueItem = this.values[0];
    const end: QueItem = this.values[this.values.length-1];
    this.values.pop();
    if (this.values.length > 0) {
      // correct the nodes in the tree with bubbledown method
      this.values[0] = end;
      this.bubbleDown();
    }
    return min;
  }

  /**
   * When new node is added, reshuffle the queue to correct priorities
   */
   public bubbleUp(): void {
    // Keep track of index (last inserted item)
    let indx = this.values.length - 1;
    const element: QueItem = this.values[indx];
    // compare to all parents and swap if larger
    while (indx > 0) {
      // find parent with (n-1)/2 -> floor
      const parentindx = Math.floor((indx - 1) / 2);
      const parent = this.values[parentindx];
      if (element.priority >= parent.priority) {
        // break loop if parent is smaller or equal
        break;
      }
      // swap values if parent is greater
      this.values[parentindx] = element;
      this.values[indx] = parent;
      indx = parentindx;
    }
  }

  /**
   * When a node is removed, reshuffle the queue to correct priorities
   */
   public bubbleDown(): void {
    let indx = 0;
    const length: number  = this.values.length;
    const element: QueItem = this.values[0];
    while (true) {
      // Get both children based on current parent index
      const leftChildindx: number = 2 * indx + 1;
      const rightChildindx: number = 2 * indx + 2;
      let leftChild!: QueItem; 
      let rightChild!: QueItem;
      let swap: number | null = null;
      // Set children nodes if nto out of bounds and keep track of index to swap
      if (leftChildindx < length) {
        leftChild = this.values[leftChildindx];
        if (leftChild.priority < element.priority) {
          swap = leftChildindx;
        }
      }
      if (rightChildindx < length) {
        rightChild = this.values[rightChildindx];
        if (
          (swap === null && rightChild.priority < element.priority)
                  || (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildindx;
        }
      }
      // Check if no swaps were made
      if (swap === null) break;

      // Swap nodes and update parent index
      this.values[indx] = this.values[swap];
      this.values[swap] = element;
      indx = swap;
    }
  }
}
