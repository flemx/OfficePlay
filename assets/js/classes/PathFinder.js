
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
     *  Return a graph from all the map tile layers with all possible movements
     * @param {*} Tilemap 
     */
    generateGraph(Tilemap){
        let graph = {};
        let coordinates = {};
        let illigals = {};
       // debugger;

        // Generate vertexes from map dimensions
        for(let y = 0; y < Tilemap.height; y++){
            for(let x = 0; x < Tilemap.width; x++){
                let vertexName = `x${x}y${y}`;
                coordinates[vertexName] = {x:Tilemap.layers[0].data[y][x].getCenterX(),y:Tilemap.layers[0].data[y][x].getCenterY()};
                let edges = [];
                
                //x=7, y=6
                // right-left = 8/5

                // Create all possible naughbours with associated cost
                let naughbours = [
                    {[`x${x-1}y${y}`]: { coor: {x: x - 1, y: y}, cost: 2}}, // walk left
                    {[`x${x}y${y+1}`]: { coor: {x: x, y: y + 1}, cost: 2}}, // walk down
                    {[`x${x+1}y${y}`]: { coor: {x: x + 1, y: y}, cost: 2}}, // walk  right
                    {[`x${x}y${y-1}`]: { coor: {x: x, y: y -1}, cost: 2}},  // walk up
                    {[`x${x-1}y${y+1}`]: { coor: {x: x - 1, y: y + 1}, cost: 2.5}},  // walk diagonally left-down
                    {[`x${x+1}y${y+1}`]: { coor: {x: x + 1, y: y + 1}, cost: 2.5}},  // walk diagonally right-down
                    {[`x${x-1}y${y-1}`]: { coor: {x: x - 1, y: y - 1}, cost: 2.5}},  // walk diagonally left-up
                    {[`x${x+1}y${y-1}`]: { coor: {x: x + 1, y: y - 1}, cost: 2.5}}  // walk diagonally right-up
                ]; 
                // Loop through all possible naughbours and filter out paths with collisions  
                let validPaths = [true,true,true,true,true,true,true,true];  // Keep track of valid paths
                for(let i = 0; i < naughbours.length; i++){
                //for(let naughbour of naughbours){
                    //let validPath = true;
                    let naughbour = naughbours[i];
                    //debugger;
                     if(
                         naughbour[Object.keys(naughbour)[0]].coor.y >= Tilemap.height ||
                         naughbour[Object.keys(naughbour)[0]].coor.y <= 0  ||
                         naughbour[Object.keys(naughbour)[0]].coor.x >= Tilemap.width || 
                         naughbour[Object.keys(naughbour)[0]].coor.x <= 0
                        ){
                        //validPath = false;
                        validPaths[i] = false;
                     }else{
                        // find all the collision coordinates within the multiple tile layers
                        for(let layer of Tilemap.layers){
                            //debugger;
                            let collideTile = layer.data[naughbour[Object.keys(naughbour)[0]].coor.y][naughbour[Object.keys(naughbour)[0]].coor.x];
                            if(collideTile.collides){
                                illigals[`x${collideTile.x}y${collideTile.y}`] = true;
                                //validPath = false;
                                validPaths[i] = false;
                                // Make sure diagnal paths are not blocked by side collides
                                if(i === 2){ 
                                    validPaths[7] = false;
                                    validPaths[5] = false;
                                }
                                if(i === 0) {
                                    validPaths[6] = false; 
                                    validPaths[4] = false;
                                }
                                if(i === 1) {
                                    validPaths[4] = false; 
                                    validPaths[5] = false;
                                }
                                if(i === 3) {
                                    validPaths[6] = false; 
                                    validPaths[7] = false;
                                }

                                //if(vertexName === 'x7y6' && i === 2) debugger;
                            }
                            
                        }
                        
                     }
                     
                   // if(validPath)  edges.push(naughbour);
                }
                
               // Add all valid edges (paths) to the vertex
               for(let i = 0; i < validPaths.length; i++){
                if(validPaths[i]) edges.push(naughbours[i]);
            }
            //debugger;
             graph[vertexName] = edges;
             //console.log(graph[vertexName]);
            }
        }
        
        return {graph: graph, coor: coordinates, illigals: illigals};
    }
    

}



class PriorityQueue{

    
    constructor(){
      this.values = [];
  }

  enqueue(value, priority){
      let newNode = {value, priority};
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


// class Node{
// constructor(value, priority){
//     this.value = value;
//     this.priority = priority;
// }
// }


class Dijkstra{

    constructor(graph){
        this.graph = graph;
        //  Keep track of the distances from vstarting vertex to goal vertex
        this.distances = {};
        // Keep track of the paths
        this.previous = {};
        // Make a priority queue of the distances
        this.prioQueue = new PriorityQueue();
        
    }
    
    // Construct the data structures to assist in the algorithm
    init(start){
        // Empty all data structures
        this.distances = {};
        this.previous = {};
        this.prioQueue = new PriorityQueue();
        // create array with vertexes
        let vertexes = Object.keys(this.graph);
        // prepare the data structures
        for(let i = 0; i < vertexes.length ; i++){
            let key = vertexes[i];
            if(key === start){
                this.distances[key] = 0;
            }else{
                this.distances[key] = Infinity;
            }
            this.prioQueue.enqueue(key,this.distances[key]);
            this.previous[key] = null;            
        }
    }

    findPath(start, goal){
        //Initialise with new start
        this.init(start); 
        let smallest;
        let path = [];

        while(this.prioQueue.values.length)
            {
                smallest = this.prioQueue.dequeue().value;
                if(smallest === goal){
                    // Done and build path to return
                    // console.log(this.distances);
                    // console.log(this.previous);
                    while(this.previous[smallest]){
                        path.push(smallest);
                        smallest = this.previous[smallest];
                    }
                    break;
                }
                if(smallest || this.distances[smallest] !== Infinity){
                    for(let naughbour of this.graph[smallest]){
                        // Find naughboring node
                        let nextNode = this.graph[smallest].filter(
                            v => Object.keys(v)[0] === Object.keys(naughbour)[0]
                        )[0];
                        // Calculate new distance to neighboring node
                        let candidate = this.distances[smallest] + nextNode[Object.keys(nextNode)[0]].cost;
                        let nextNaughbor = Object.keys(nextNode)[0];
                       
                        if(candidate < this.distances[Object.keys(nextNode)[0]]){
                            //update new smallest distance to neighbor
                            this.distances[nextNaughbor] = candidate;
                            // Updating previous - how we got to neighbor
                            this.previous[nextNaughbor] = smallest;
                            // Enqueue in prio queue 
                            this.prioQueue.enqueue(nextNaughbor, candidate);
                        }
                    }
                }

        }
  
    return path.concat(smallest).reverse();
    //return path.reverse();
     
    }

}