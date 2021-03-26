import PathFinder from '../algorithms/PathFinder';
/**
 * Map Class
 * @ Damien Fleminks
 */

export default class GameMap {
  constructor(scene, key, mapConfig, player, npc) {
    console.log('Map class run');
    this.scene = scene; // the scene this map belongs to
    this.key = key; // Tiled JSON file key name
    this.mapConfig = mapConfig; // Map config with layers and images
    this.player = player;
    this.npc = npc;
    this.graph = {};
    this.coordinates = {};
    this.illigals = {};
    this.createMap();
    this.generateGraph();
    // Set collision on NPC's
    // this.addCollisions(this.npc);
  }

  createMap() {
    // create the tile map
    this.tilemap = this.scene.make.tilemap({ key: this.key });

    // loop through map configruation to load all layers
    for (const item of this.mapConfig) {
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
