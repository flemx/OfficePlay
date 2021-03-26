/**
 *  PriorityQueue Class
 *  Binary heap priority queue used by the dijstra algorithm in the PathFinder class
 * @ Damien Fleminks
 */

export default class PriorityQueue {
  constructor() {
    this.values = [];
  }

  /**
   *  Add node to queue and set priority
   * @param {*} value
   * @param {*} priority
   */
  enqueue(value, priority) {
    const node = { value, priority };
    this.values.push(node);
    this.bubbleUp();
  }

  /**
   *  Remove and returns the highest priority node
   */
  dequeue() {
    // remove highest first value and replace with latest
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 1) {
      // correct the nodes in the tree with bubbledown method
      this.values[0] = end;
      this.bubbleDown();
    }
    return min;
  }

  /**
   * When new node is added, reshuffle the queue to correct priorities
   */
  bubbleUp() {
    // Keep track of index (last inserted item)
    let indx = this.values.length - 1;
    const element = this.values[indx];
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
  bubbleDown() {
    let indx = 0;
    const { length } = this.values;
    const element = this.values[0];
    while (true) {
      // Get both children based on current parent index
      const leftChildindx = 2 * indx + 1;
      const rightChildindx = 2 * indx + 2;
      let leftChild; let rightChild;
      let swap = null;
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
