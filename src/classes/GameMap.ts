import PathFinder from '../algorithms/PathFinder';
import { Coordinate, MapConfig, MapCoordinates, NodeKey } from '../models/types';
import Player from './Player';
import NPC from './NPC';

/**
 * Map Class
 * @ Damien Fleminks
 */

export default class GameMap {


  private scene: Phaser.Scene;
  private key: string;
  private config: Array<MapConfig>;
  private player: Player;
  private npc: NPC; 

  private tilemap: Phaser.Tilemaps.Tilemap;

  private mapCoord: MapCoordinates;
  private graph: PathFinder;




  // TODO:  Define better type



  constructor(
      scene: Phaser.Scene, // the scene this map will be added to
      key: string, 
      config: Array<MapConfig>, 
      player: Player, 
      npc: NPC
    ){
    console.log('Map class run');
    this.scene = scene; // the scene this map belongs to
    this.key = key; // Tiled JSON file key name
    this.config = config; // Map config with layers and images
    this.player = player;
    this.npc = npc;
    this.tilemap = this.createMap();
    this.mapCoord = this.createCoord();
    this.graph = new PathFinder(this.mapCoord);
    console.log(this.graph);
    // Set collision on NPC's
    // this.addCollisions(this.npc);
  }

  /**
   *  Generates a simple mock coordinate for testing purposes
   * @returns 3x3 2D array of coordinates
   */
  testCoord(): MapCoordinates{
    let coordinates: MapCoordinates = [];

    //Generate 2D coordinates array from mapo dimensions
    for (let y = 0; y < 3; y += 1) {
      coordinates.push([]);
      for (let x = 0; x < 3; x += 1) {
        // add the pixel coordinates
        coordinates[y].push({
          coord: {
            x: x+1,
            y: y+1,
          }, illigal: false
        });
        // Set illigal to false by default
        coordinates[y][x].illigal = false;
        // Look for collisions in the differenrt layers and set the coordinate illigal to false
       
      }
    }
    coordinates[1][1].illigal = true;
    return coordinates;
  }

  private createMap(): Phaser.Tilemaps.Tilemap {
    // create the tile map
   let tilemap = this.scene.make.tilemap({ key: this.key });

    // loop through map configruation to load all layers
    for (const item of this.config) {
      // add the tileset image
      const tiles = tilemap.addTilesetImage(item.tilesetImage);
      // add layer
      const layer = tilemap.createLayer(item.layer, tiles, 0, 0);
      // Increase scale
      layer.setScale(1.5);

      // Set collisions by proprty
      layer.setCollisionByProperty({ collides: true });
      // this.addCollisions(layer);

      if (item.layer.includes('above')) {
        layer.setDepth(11);
      }
    }
    // update the world bounds
    this.scene.physics.world.bounds.width = tilemap.widthInPixels * 2;
    this.scene.physics.world.bounds.height = tilemap.heightInPixels * 2;

    return tilemap;
  }

  /**
   *  Formats the Phaser tile map into usable data structure for the pathfinder algorithms 
   * @returns formatted coordinates
   */
   private createCoord(): MapCoordinates{
    let coordinates: MapCoordinates = [];
    const Tilemap = this.tilemap

    //Generate 2D coordinates array from mapo dimensions
    for (let y = 0; y < Tilemap.height; y += 1) {
      coordinates.push([]);
      for (let x = 0; x < Tilemap.width; x += 1) {
        // add the pixel coordinates
        coordinates[y].push({
          coord: {
            x: Tilemap.layers[0].data[y][x].getCenterX(),
            y: Tilemap.layers[0].data[y][x].getCenterY(),
          }, illigal: false
        });
        // Set illigal to false by default
        coordinates[y][x].illigal = false;
        // Look for collisions in the differenrt layers and set the coordinate illigal to false
        for (const layer of Tilemap.layers) {
          if (layer.data[y][x].collides) {
            coordinates[y][x].illigal = true;
          }
        }
      }
    }
    return coordinates;
  }

  /**
   * get world xy from pointer coordinates
   * @param {x, y} get x,y fro m pointer  
   * @returns Node key value
   */
  public getNodeKey(x: number, y: number): Coordinate{
    const tileMap = this.tilemap.getTileAtWorldXY(x, y,false, this.scene.cameras.main, 'background');
    return {x: tileMap.x, y: tileMap.y};
  }

  /**
   * Checks if a tile on the map is valid coordinate to move to
   * @param coord of the tile number coord
   * @returns boolean
   */
  public isValidPath(coord: Coordinate): boolean{
    if(!this.mapCoord[coord.y][coord.x].illigal){
        return true;
    }
    return false;
  }

  /**
   * Call the Dijkstra algorithm from PathFinder and return the optimal path from the map coordinates
   * @param startPoint  the coodindate of thhe player current location
   * @param destination  cooridnate of desires location to move to
   * @returns the optimal path to walk to desitnation 
   */
  public getPath(startPoint: Coordinate, destination: Coordinate): Coordinate[]{
    return  this.graph.findPath(startPoint, destination);
  }


  // generateGraph(): PathFinder{
  //   // const path = new PathFinder();
  //   const graphResult = PathFinder.generateGraph(this.tilemap);
  //   this.coordinates = graphResult.coor;
  //   this.graph = graphResult.graph;
  //   this.illigals = graphResult.illigals;
  // }

  // addCollisions(layer) {
  //   // check for collisions between player and the specified layer
  //   // this.scene.physics.add.collider(this.player, layer);

  // }
}
