import PriorityQueue from './PriorityQueue';

/**
 * Pathfinder Class
 * This class can generate a graph from the tile map with all possible paths
 * by looping through all the map tile layers
 * and calculates the shortest path using Dijkstra algorithm and a binary heap priority queue
 * @ Damien Fleminks
 */

export default class PathFinder {

  // in TS dfine as:  {x:`${number}y${number}`}


  constructor() {
    this.graph = {};
    //  Keep track of the distances from vstarting vertex to goal vertex
    this.distances = {};
    // Keep track of the paths
    this.previous = {};
    // Make a priority queue of the distances
    this.prioQueue = new PriorityQueue();
  }

  /**
     *  Return a graph with all possible paths,
     *  all coordinates to easily look them up
     *  and a list of the illigal collision coordinates
     * @param {*} Tilemap
     */
  static generateGraph(Tilemap) {
    const graph = {};
    const coordinates = {};
    const illigals = {};

    // Generate vertexes from map dimensions
    for (let y = 0; y < Tilemap.height; y += 1) {
      for (let x = 0; x < Tilemap.width; x += 1) {
        // Create vertex name based on coordinates for easy lookup
        const vertexName = `x${x}y${y}`;
        coordinates[vertexName] = {
          x: Tilemap.layers[0].data[y][x].getCenterX(),
          y: Tilemap.layers[0].data[y][x].getCenterY(),
        };
        const edges = [];
        // Create all possible naughbours with associated cost
        const naughbours = [
          { [`x${x - 1}y${y}`]: { coor: { x: x - 1, y }, cost: 2 } }, // walk left
          { [`x${x}y${y + 1}`]: { coor: { x, y: y + 1 }, cost: 2 } }, // walk down
          { [`x${x + 1}y${y}`]: { coor: { x: x + 1, y }, cost: 2 } }, // walk  right
          { [`x${x}y${y - 1}`]: { coor: { x, y: y - 1 }, cost: 2 } }, // walk up
          { [`x${x - 1}y${y + 1}`]: { coor: { x: x - 1, y: y + 1 }, cost: 2.5 } }, // walk diagonally left-down
          { [`x${x + 1}y${y + 1}`]: { coor: { x: x + 1, y: y + 1 }, cost: 2.5 } }, // walk diagonally right-down
          { [`x${x - 1}y${y - 1}`]: { coor: { x: x - 1, y: y - 1 }, cost: 2.5 } }, // walk diagonally left-up
          { [`x${x + 1}y${y - 1}`]: { coor: { x: x + 1, y: y - 1 }, cost: 2.5 } }, // walk diagonally right-up
        ];
        // Loop through all possible naughbours and filter out paths with collisions
        // Keep track of valid paths
        const validPaths = [true, true, true, true, true, true, true, true];
        for (let i = 0; i < naughbours.length; i += 1) {
          const naughbour = naughbours[i];
          if (
            naughbour[Object.keys(naughbour)[0]].coor.y >= Tilemap.height
                         || naughbour[Object.keys(naughbour)[0]].coor.y <= 0
                         || naughbour[Object.keys(naughbour)[0]].coor.x >= Tilemap.width
                         || naughbour[Object.keys(naughbour)[0]].coor.x <= 0
          ) {
            validPaths[i] = false;
            // Add coordinate to illigals
            illigals[`x${naughbour[Object.keys(naughbour)[0]].coor.x}y${naughbour[Object.keys(naughbour)[0]].coor.y}`] = true;
          } else {
            // find all the collision coordinates within the multiple tile layers
            for (const layer of Tilemap.layers) {
              const collideTile = layer.data[
                naughbour[
                  Object.keys(naughbour)[0]].coor.y][naughbour[Object.keys(naughbour)[0]
              ].coor.x
              ];
              if (collideTile.collides) {
                // Add coordinate to illigals
                illigals[`x${collideTile.x}y${collideTile.y}`] = true;
                validPaths[i] = false;
                // Make sure diagonal paths are not blocked by side collides
                if (i === 2) {
                  validPaths[7] = false;
                  validPaths[5] = false;
                }
                if (i === 0) {
                  validPaths[6] = false;
                  validPaths[4] = false;
                }
                if (i === 1) {
                  validPaths[4] = false;
                  validPaths[5] = false;
                }
                if (i === 3) {
                  validPaths[6] = false;
                  validPaths[7] = false;
                }
              }
            }
          }
        }
        // Add all valid edges (paths) to the vertex
        for (let i = 0; i < validPaths.length; i += 1) {
          if (validPaths[i]) edges.push(naughbours[i]);
        }
        graph[vertexName] = edges;
      }
    }

    return { graph, coor: coordinates, illigals };
  }

  /**
     *  Initialise the data structures to use for the dijkstra pathfinder algorithm
     * @param {*} start
     */
  initDijkstra(start) {
    // Empty all data structures
    this.distances = {};
    this.previous = {};
    this.prioQueue = new PriorityQueue();
    // create array with vertexes
    const vertexes = Object.keys(this.graph);
    // prepare the data structures
    for (let i = 0; i < vertexes.length; i += 1) {
      const key = vertexes[i];
      if (key === start) {
        this.distances[key] = 0;
      } else {
        this.distances[key] = Infinity;
      }
      this.prioQueue.enqueue(key, this.distances[key]);
      this.previous[key] = null;
    }
  }

  /**
     *  Dijkstra algorithm that iterates through a graph
     *  and find the shortest path for a given start and destination vertex
     * @param {*} start
     * @param {*} goal
     * @param {*} graph
     */
  findPath(start, goal, graph) {
    // Initialise new data structures
    this.graph = graph;
    this.initDijkstra(start);
    let smallest;
    const path = [];

    while (this.prioQueue.values.length) {
      smallest = this.prioQueue.dequeue().value;
      // Stop algortihm when is has found the shortest path to the goal
      if (smallest === goal) {
        while (this.previous[smallest]) {
          path.push(smallest);
          smallest = this.previous[smallest];
        }
        break;
      }
      if (smallest || this.distances[smallest] !== Infinity) {
        for (const naughbour of this.graph[smallest]) {
          // Find naughboring node
          const nextNode = this.graph[smallest].filter(
            (v) => Object.keys(v)[0] === Object.keys(naughbour)[0],
          )[0];
          // Calculate new distance to neighboring node
          const candidate = this.distances[smallest] + nextNode[Object.keys(nextNode)[0]].cost;
          const nextNaughbor = Object.keys(nextNode)[0];

          if (candidate < this.distances[Object.keys(nextNode)[0]]) {
            // update new smallest distance to neighbor
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
  }
}
