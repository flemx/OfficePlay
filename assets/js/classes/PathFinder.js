
/**
 * Pathfinder Class
 * @ Damien Fleminks
 */


class PathFinder {
    //this.scene.physics.moveTo(this, this.x + 10, this.y, 200);

    constructor(){
       //this.graph = {};
    }


    /**
     *  Return a graph from all the map tile layers
     * @param {*} Tilemap 
     */
    generateGraph(Tilemap){
        let graph = {};
       // debugger;

        // Generate vertexes from map dimensions
        for(let y = 0; y < Tilemap.height; y++){
            for(let x = 0; x < Tilemap.width; x++){
                let vertexName = `x${x}y${y}`;
                let edges = [];
                

                // Create all possible naughbours with associated cost, where diagonally costs more
                let naughbours = [
                    {coordinates: {x: x - 1, y: y}, cost: 2}, // walk left
                    {coordinates: {x: x, y: y + 1}, cost: 2}, // walk up
                    {coordinates: {x: x + 1, y: y}, cost: 2}, // walk  right
                    {coordinates: {x: x, y: y -1}, cost: 2},   // walk down
                    {coordinates: {x: x - 1, y: y + 1}, cost: 2.5},  // walk diagonally left-up
                    {coordinates: {x: x + 1, y: y + 1}, cost: 2.5},  // walk diagonally right-up
                    {coordinates: {x: x - 1, y: y - 1}, cost: 2.5},  // walk diagonally left-down
                    {coordinates: {x: x + 1, y: y - 1}, cost: 2.5}  // walk diagonally right-down
                ]; 
                //if(vertexName === 'x8y6') debugger;
                // Loop through all possible naughbours and filter out paths with collisions  
                for(let naughbour of naughbours){
                    let validPath = true;
                     if(
                         naughbour.coordinates.y >= Tilemap.height ||
                         naughbour.coordinates.y <= 0  ||
                         naughbour.coordinates.x >= Tilemap.width || 
                         naughbour.coordinates.x <= 0
                        ){
                        validPath = false;
                     }else{
                        // find all the collision coordinates within the multiple tile layers
                        for(let layer of Tilemap.layers){
                            if(layer.data[naughbour.coordinates.y][naughbour.coordinates.x].collides){
                                validPath = false;
                            }
                        }
                     }
                     
                    if(validPath)  edges.push(naughbour);

                   
                }
                graph[vertexName] = edges;
            }
        }
        


        return graph;
    }
    

}



class PriorityQueue{

    
    constructor(){
      this.values = [];
  }

  enqueue(value, priority){
      let newNode = new Node(value, priority);
      //console.log('Queue:', newNode);
      this.values.push(newNode);
      this.bubbleUp();
  }

  dequeue(){
       //remove highest first value and replace with latest
      const min = this.values[0];
      const end =  this.values.pop();
      if(this.values.length > 1){
           // correct the nodes in the tree with bubbledown method
          this.values[0] = end;
          this.bubbleDown();
      } 
      return min;
  }
  
  
  bubbleUp(){
      // Keep track of index (last inserted item)
      let idx = this.values.length -1;
      const element = this.values[idx];
      //compare to all parents and swap if larger
       while(idx > 0){
          //find parent with (n-1)/2 -> floor
          let parentIdx = Math.floor((idx-1)/2);
          let parent = this.values[parentIdx];
          if(element.priority >= parent.priority){
              //break loop if parent is smaller or equal
              break;
           }
          // swap values if parent is greater
          this.values[parentIdx] = element;
          this.values[idx] = parent;
          idx = parentIdx;
      }

  }

  bubbleDown(){
      let idx = 0;
      const length = this.values.length;
      const element = this.values[0];
      while(true){
          // Get both children based on current parent index 
          let leftChildIdx = 2 * idx + 1;
          let rightChildIdx = 2 * idx + 2;
          let leftChild,rightChild;
          let swap = null;
          // Set children nodes if nto out of bounds and keep track of index to swap
          if(leftChildIdx < length){
              leftChild = this.values[leftChildIdx];
              if(leftChild.priority < element.priority){
                  swap = leftChildIdx;
              }
          }
          if(rightChildIdx < length){
              rightChild = this.values[rightChildIdx];
              if(
                  (swap === null && rightChild.priority < element.priority) ||
                  (swap !==  null && rightChild.priority < leftChild.priority)
               ){
                  swap = rightChildIdx;
              }
          }
          // Check if no swaps were made
          if(swap === null) break;

          // Swap nodes and update parent index 
          this.values[idx] = this.values[swap];
          this.values[swap] = element;
          idx = swap;

      }
  }


}


class Node{
  constructor(value, priority){
      this.value = value;
      this.priority = priority;
  }
}


