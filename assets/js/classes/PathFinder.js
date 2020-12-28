
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

