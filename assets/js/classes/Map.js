/**
 * Map Class
 * @ Damien Fleminks
 */


class Map {
  constructor(scene, key, mapConfig) {
    this.scene = scene; // the scene this map belongs to
    this.key = key; // Tiled JSON file key name
    this.mapConfig = mapConfig; // Map config with layers and images
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
        this.map.createStaticLayer(item.layer, tiles, 0, 0).setScale(1.6);   
    }

    // update the world bounds
    this.scene.physics.world.bounds.width = this.map.widthInPixels * 2;    // New code
    this.scene.physics.world.bounds.height = this.map.heightInPixels * 2;    // New code
  
    // limit the camera to the size of our map
    this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels * 2, this.map.heightInPixels * 2);    // New code
  }
}