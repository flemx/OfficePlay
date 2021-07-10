
/**
 * Identify events from the MessageEvent in the PubSubChild Class 
 */
export enum EventName { 
    eventTest = 'eventTest',
    startScene = 'startScene',
    startGame_playerName = 'startGame_playerName',
    gameScene_playerName = 'gameScene_playerName',
    gameScene_botMsg = 'gameScene_botMsg',
    phaserWrap_gameId =  'phaserWrap_gameId' // game record ID 
}


export enum scenes {
        NewGame = "NewGame",
        GameScene = "GameScene",
        None = "None"
}