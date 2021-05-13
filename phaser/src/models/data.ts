
/**
 *  Sprite definitions
 */

const spritesDef = {
    players : {
        p1 : {
            idle: 'player1-idle',
            walk: 'player1-walk'
        },
        p2 : {
            idle: 'player2-idle',
            walk: 'player2-walk'
        },
        p3 : {
            idle: 'player3-idle',
            walk: 'player3-walk'
        }
    },
    npc : {
        officeHelp : {
          idle: 'office-help',
          walk: 'office-help'
      }
    },
    effects : {
        select : 'select'
    }
}
Object.freeze(spritesDef);


const imageDef  = {

    maps : {
        background : 'background',
        furniture : 'furniture',
        interiors : 'interiors'
    },
    buttons : {
        btn1 : 'button1',
        btn2 : 'button2'
    }
}


const mapDef = {
    office1 : {
        name : 'map',
        config : [
        {
          tilesetImage: imageDef.maps.background,
          layer: 'background',
        },
        {
          tilesetImage: imageDef.maps.furniture,
          layer: 'furniture1',
        },
        {
          tilesetImage: imageDef.maps.furniture,
          layer: 'furniture2',
        },
        {
          tilesetImage: imageDef.maps.furniture,
          layer: 'above1',
        },
        {
          tilesetImage: imageDef.maps.furniture,
          layer: 'above2',
        },
        {
          tilesetImage: imageDef.maps.interiors,
          layer: 'interiors1',
        }
      ]
    }
}


export {spritesDef, imageDef, mapDef};