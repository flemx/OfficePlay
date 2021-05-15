
/**
 * Identify events from the MessageEvent in the PubSubChild Class 
 */
export enum EventName { 
    eventTest = 'eventTest',
    startScene = 'startScene',
    startGame_playerName = 'startGame_playerName',
    gameScene_playerName = 'gameScene_playerName',
    gameScene_botMsg = 'gameScene_botMsg'
}


export enum scenes {
        NewGame = "NewGame",
        GameScene = "GameScene",
        None = "None"
}