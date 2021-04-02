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
  private config: MapConfig;
  private player: Player;
  private npc: NPC; 

  private tilemap: Phaser.Tilemaps.Tilemap;

  private mapCoord: MapCoordinates;
  private coordinates;
  private illigals: Record<string,boolean>
  private grap: PathFinder;


  // TODO:  Define better type



  constructor(
      scene: Phaser.Scene, // the scene this map will be added to
      key: string, 
      config: MapConfig, 
      player: Player, 
      npc: NPC
    ){
    console.log('Map class run');
    this.scene = scene; // the scene this map belongs to
    this.key = key; // Tiled JSON file key name
    this.config = config; // Map config with layers and images
    this.player = player;
    this.npc = npc;
    // this.graph = {};

    this.tilemap = this.scene.make.tilemap({ key: this.key });

    this.coordinates = {};
    this.illigals = {};
    this.createMap();
    this.generateGraph();
    // Set collision on NPC's
    // this.addCollisions(this.npc);
  }

  createMap() {
    // create the tile map
   // this.tilemap = this.scene.make.tilemap({ key: this.key });

    // loop through map configruation to load all layers
    for (const item of this.config) {
      // add the tileset image
      const tiles = this.tilemap.addTilesetImage(item.tilesetImage);
      // add layer
      const layer = this.tilemap.createStaticLayer(item.layer, tiles, 0, 0);
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
    this.scene.physics.world.bounds.width = this.tilemap.widthInPixels * 2;
    this.scene.physics.world.bounds.height = this.tilemap.heightInPixels * 2;
  }

  /**
   *  Formats the Phaser tile map into usable data structure for the pathfinder algorithms 
   * @returns formatted coordinates
   */
  createCoord(): MapCoordinates{
    let coordinates: MapCoordinates = [];
    const Tilemap = this.tilemap

    //Generate 2D coordinates array from mapo dimensions
    for (let y = 0; y < Tilemap.height; y += 1) {
      for (let x = 0; x < Tilemap.width; x += 1) {
        // add the pixel coordinates
        coordinates[y][x].coord = {
          x: Tilemap.layers[0].data[y][x].getCenterX(),
          y: Tilemap.layers[0].data[y][x].getCenterY(),
        };
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


  generateGraph() {
    // const path = new PathFinder();
    const graphResult = PathFinder.generateGraph(this.tilemap);
    this.coordinates = graphResult.coor;
    this.graph = graphResult.graph;
    this.illigals = graphResult.illigals;
  }

  // addCollisions(layer) {
  //   // check for collisions between player and the specified layer
  //   // this.scene.physics.add.collider(this.player, layer);

  // }
}
