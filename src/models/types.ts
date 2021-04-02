/**
 * @Author Damien Fleminks
 * Manage custom types that are used in multiple locations
 */


/**
 * Holds the coordinate on the game map
 */
export type Coordinate = {
    x: number,
    y: number
}

/**
 * A 2D array generated from the Phaser TileMap 
 * to hold all the coordinates of the map with valid tiles a player can walk on
 */
export type MapCoordinates = Array<Array<{coord: Coordinate, illigal: boolean}>>;

/**
 *  Used by the PriorityQueue to determine the priority of a value
 */
 export type QueItem = { value: string, priority: number };


/**
 * Used as key in a Graph object to define a coordiante 
 * and hold values for possible paths and explicit coordinates
 */
export type NodeKey = `x${number}y${number}`;

/**
 * Node / Vertex, used 
//  */
export type NodeNaughbour = {
    [key: string] : {
        coor: Coordinate, cost: number 
    }
}

// export type NodeNaughbour = {
//      coor: Coordinate, cost: number 
// }


export type Node = {
    [key: string] : Array<NodeNaughbour>
}
// export type NodeNaughbour = {
//     coor: Coordinate, cost: number 
// }




/**
 * Configuration object for the map to define multiple layers
 */
export type MapConfig = {
    tilesetImage: string,
    layer: string,
  };

