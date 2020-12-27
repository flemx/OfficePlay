
/**
 * Pathfinder Class
 * @ Damien Fleminks
 */


class PathFinder {
    //this.scene.physics.moveTo(this, this.x + 10, this.y, 200);

    constructor(){
        this.graph = {};
    }


    /**
     *  Return a graph from all the map tile layers
     * @param {*} tilesArray 
     */
    generateGraph(tileLayers){
        
        let graph = {};
        let collisions = [];
        // find all the collision coordinates
        for(let layer of tileLayers){
            
        }

        // Create vertexes for all the tiles
        


        return graph;
    }
    
    // Add a node to the graph
    addNode(node){
        if(!this.graph[node]){
            this.graph[node] = [];
        }
    }
    // Add connection between graph nodes with the cost of the path
    addEdge(start, destination, cost){
        if(this.graph[start]){
            this.graph[start].push({node: destination, cost});
        }
    }

}

