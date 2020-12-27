/**
 * Map Class
 * @ Damien Fleminks
 */


class Map {
  constructor(scene, key, mapConfig, player, npc) {
    this.scene = scene; // the scene this map belongs to
    this.key = key; // Tiled JSON file key name
    this.mapConfig = mapConfig; // Map config with layers and images
    this.player = player;
    this.npc = npc;
    this.graph = {};
    this.createMap();

    // Set collision on NPC's
    this.addCollisions(this.npc);
  }

createMap() {
    // create the tile map
    this.map = this.scene.make.tilemap({ key: this.key });   
        
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

        if(item.layer === 'above'){
          layer.setDepth(11);
        }
        console.log('this.map:', this.map);
        console.log('layer:', layer);
    }
    // update the world bounds
    this.scene.physics.world.bounds.width = this.map.widthInPixels * 2;   
    this.scene.physics.world.bounds.height = this.map.heightInPixels * 2;   
  
    // limit the camera to the size of our map
    //this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels * 2, this.map.heightInPixels * 2);   
  }

  generateGraph(){

  }

  addCollisions(layer) {
    // check for collisions between player and the specified layer
   this.scene.physics.add.collider(this.player, layer);

  }
}