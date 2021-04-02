import { NodeKey, Node, MapCoordinates, NodeNaughbour, Coordinate, QueItem  } from '../models/types';
import PriorityQueue from './PriorityQueue';

/**
 * Pathfinder Class
 * This class can generate a graph from the tile map with all possible paths
 * by looping through all the map tile layers
 * and calculates the shortest path using Dijkstra algorithm and a binary heap priority queue
 * @ Damien Fleminks
 */

export default class PathFinder {

  private prioQueue: PriorityQueue;
  private nodes: Node;
  private distances: Record<string, number>;
  private previous: Record<string, string | undefined>;

  constructor(coordinates: MapCoordinates){
    this.nodes = this.generateGraph(coordinates);
    //  Keep track of the distances from starting node to goal node
    this.distances = {};
    // // Keep track of the paths
    this.previous = {};
    // Make a priority queue of the distances
    this.prioQueue = new PriorityQueue();
  }

  /**
     *  Return a graph with all possible paths,
     *  all coordinates to easily look them up
     *  and a list of the illigal collision coordinates
     * @param {*} coordinates
     */
  private generateGraph(coordinates: MapCoordinates): Node {
    const graph: Node = {};
    // const coordinates = {};
    //const illigals = {};

    // Generate vertexes from map dimensions
    for (let y = 0; y < coordinates.length; y += 1) {
      for (let x = 0; x < coordinates[0].length; x += 1) {
        const edges = [];
        // Create all possible naughbours with associated cost
        const naughbours: Array<NodeNaughbour>= [
          { [`x${x - 1}y${y}`]: { coor: { x: x - 1, y }, cost: 2 } }, // walk left
          { [`x${x}y${y + 1}`]: { coor: { x, y: y + 1 }, cost: 2 } }, // walk down
          { [`x${x + 1}y${y}`]: { coor: { x: x + 1, y }, cost: 2 } }, // walk  right
          { [`x${x}y${y - 1}`]: { coor: { x, y: y - 1 }, cost: 2 } }, // walk up
          { [`x${x - 1}y${y + 1}`]: { coor: { x: x - 1, y: y + 1 }, cost: 2.5 } }, // walk diagonally left-down
          { [`x${x + 1}y${y + 1}`]: { coor: { x: x + 1, y: y + 1 }, cost: 2.5 } }, // walk diagonally right-down
          { [`x${x - 1}y${y - 1}`]: { coor: { x: x - 1, y: y - 1 }, cost: 2.5 } }, // walk diagonally left-up
          { [`x${x + 1}y${y - 1}`]: { coor: { x: x + 1, y: y - 1 }, cost: 2.5 } }, // walk diagonally right-up
        ];
        // const naughbours: Array<NodeNaughbour>= [
        //   { coor: { x: x - 1, y }, cost: 2 }, // walk left
        //   { coor: { x, y: y + 1 }, cost: 2 }, // walk down
        //   { coor: { x: x + 1, y }, cost: 2 }, // walk  right
        //   { coor: { x, y: y - 1 }, cost: 2 }, // walk up
        //   { coor: { x: x - 1, y: y + 1 }, cost: 2.5 }, // walk diagonally left-down
        //   { coor: { x: x + 1, y: y + 1 }, cost: 2.5 }, // walk diagonally right-down
        //   { coor: { x: x - 1, y: y - 1 }, cost: 2.5 }, // walk diagonally left-up
        //   { coor: { x: x + 1, y: y - 1 }, cost: 2.5 }, // walk diagonally right-up
        // ];
        // If tile coordinate is a valid move, add a node with edges to valid naughbouring nodes
        if(!coordinates[y][x].illigal){
          graph[`x${x}y${y}`] = naughbours.filter((naughbour: NodeNaughbour)=> {
            let naughboorY = naughbour[Object.keys(naughbour)[0]].coor.y;
            let naughboorX = naughbour[Object.keys(naughbour)[0]].coor.x;
            return !coordinates[naughboorY][naughboorX].illigal;
          });
        }

        // TODO: Add illigal diagonal paths 

        // // Loop through all possible naughbours and filter out paths with collisions
        // // Keep track of valid paths
        // const validPaths = [true, true, true, true, true, true, true, true];
        // for (let i = 0; i < naughbours.length; i += 1) {
        //   const naughbour = naughbours[i];
        //   if (
        //     naughbour[Object.keys(naughbour)[0]].coor.y >= coordinates.length
        //                  || naughbour[Object.keys(naughbour)[0]].coor.y <= 0
        //                  || naughbour[Object.keys(naughbour)[0]].coor.x >= coordinates[0].length
        //                  || naughbour[Object.keys(naughbour)[0]].coor.x <= 0
        //   ) {
        //     validPaths[i] = false;
        //     // Add coordinate to illigals

        //     illigals[`x${naughbour[Object.keys(naughbour)[0]].coor.x}y${naughbour[Object.keys(naughbour)[0]].coor.y}`] = true;
        //   } else {
        //     // find all the collision coordinates within the multiple tile layers
        //     for (const layer of coordinates.layers) {
        //       const collideTile = layer.data[
        //         naughbour[
        //           Object.keys(naughbour)[0]].coor.y][naughbour[Object.keys(naughbour)[0]
        //       ].coor.x
        //       ];
        //       if (collideTile.collides) {
        //         // Add coordinate to illigals
        //         illigals[`x${collideTile.x}y${collideTile.y}`] = true;
        //         validPaths[i] = false;
        //         // Make sure diagonal paths are not blocked by side collides
        //         if (i === 2) {
        //           validPaths[7] = false;
        //           validPaths[5] = false;
        //         }
        //         if (i === 0) {
        //           validPaths[6] = false;
        //           validPaths[4] = false;
        //         }
        //         if (i === 1) {
        //           validPaths[4] = false;
        //           validPaths[5] = false;
        //         }
        //         if (i === 3) {
        //           validPaths[6] = false;
        //           validPaths[7] = false;
        //         }
        //       }
        //     }
        //   }
        // }
        // // Add all valid edges (paths) to the vertex
        // for (let i = 0; i < validPaths.length; i += 1) {
        //   if (validPaths[i]) edges.push(naughbours[i]);
        // }
        // graph[`x${x}y${y}`] = edges;
      }
    }

    return graph;
  }

  /**
     *  Initialise the data structures to use for the dijkstra pathfinder algorithm
     * @param {*} start
     */
  private initDijkstra(start: NodeKey): void {
    // Empty all data structures
    this.distances = {};
    this.previous = {};
    this.prioQueue = new PriorityQueue();
    // create array with vertexes
    const vertexes = Object.keys(this.nodes) as Array<NodeKey>;
    // prepare the data structures
    for (let i = 0; i < vertexes.length; i += 1) {
      const key: NodeKey = vertexes[i];
      if (key === start) {
        this.distances[key] = 0;
      } else {
        this.distances[key] = Infinity;
      }
      this.prioQueue.enqueue({value: key, priority: this.distances[key]});
      this.previous[key] = undefined;
    }
  }

  /**
     *  Dijkstra algorithm that iterates through a graph
     *  and find the shortest path for a given start and destination vertex
     * @param {*} start
     * @param {*} goal
     * @param {*} graph
     */
  public findPath(start: Coordinate, goal: Coordinate): Coordinate[] {
    // Initialise new data structures
    this.initDijkstra(`x${start.x}y${start.y}` as const);
    let smallest: NodeKey | undefined;
    const path: Coordinate[] = [];

    while (this.prioQueue.getValueNum()) {
      smallest = this.prioQueue.dequeue().value as NodeKey;
      // Stop algortihm when it has found the shortest path to the goal
      if (smallest === `x${goal.x}y$${goal.y}`) {
        while (this.previous[smallest]) {
          path.push(this.formatCoord(smallest));
          if(this.previous[smallest]){
            smallest = this.previous[smallest] as NodeKey;
          }
        }
        break;
      }
      if (smallest || this.distances[smallest] !== Infinity) {
        for (const naughbour of this.nodes[smallest]) {
          // Find naughboring node
          const nextNode = this.nodes[smallest].filter(
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
            this.prioQueue.enqueue({value: nextNaughbor, priority: candidate});
          }
        }
      }
    }
    return path.concat(this.formatCoord(smallest as NodeKey)).reverse();
  }

  /**
   *  Transforms a NodeKey type string into a Coordinate Type
   * @param nodeKey 
   * @returns Coordinate
   */
  private formatCoord(nodeKey: NodeKey): Coordinate{
    let numbers = nodeKey.match(/\d+/g)!.map(Number);
    return {x: numbers[0], y: numbers[1]};
  }
}
