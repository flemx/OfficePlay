/**
 * Map Class
 * @ Damien Fleminks
 */


class Map {
  constructor(scene, key, mapConfig, player) {
    this.scene = scene; // the scene this map belongs to
    this.key = key; // Tiled JSON file key name
    this.mapConfig = mapConfig; // Map config with layers and images
    this.player = player;
    this.createMap();
  }

createMap() {
    // create the tile map
    this.map = this.scene.make.tilemap({ key: this.key });    // New code
        
    // loop through map configruation to load all layers
    for(let item of this.mapConfig){
        // add the tileset image
        let tiles = this.map.addTilesetImage(item.tilesetImage); 
      
        // add layer
        let layer = this.map.createStaticLayer(item.layer, tiles, 0, 0);
        // Increase scale
        layer.setScale(1.5);
        // Set collisions by proprty 
        layer.setCollisionByProperty({ collides: true });
        this.addCollisions(layer);
    }

    // update the world bounds
    this.scene.physics.world.bounds.width = this.map.widthInPixels * 2;    // New code
    this.scene.physics.world.bounds.height = this.map.heightInPixels * 2;    // New code
  
    // limit the camera to the size of our map
    this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels * 2, this.map.heightInPixels * 2);    // New code
  }

  addCollisions(layer) {
    // check for collisions between player and the specified layer
    this.scene.physics.add.collider(this.player, layer);
  }
}