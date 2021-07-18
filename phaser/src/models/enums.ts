
/**
 * Identify events from the MessageEvent in the PubSubChild Class 
 */
export enum EventName { 
    eventTest = 'eventTest',
    startScene = 'startScene',
    titleScene_playerDetail = 'titleScene_playerDetail', // Get plater details in Title screen
    startGame_playerName = 'startGame_playerName',  // Player name in character creation sreen
    startGame_createPlayer = 'startGame_createPlayer', // Create or update player in New game scene
    gameScene_playerName = 'gameScene_playerName',  // Retrieve playername for Game Scene UI
    gameScene_botMsg = 'gameScene_botMsg',  // Trigger NPC chat in Game Scene
    phaserWrap_gameId =  'phaserWrap_gameId' // game record ID 
}


export enum scenes {
        TitleScene = "TitleScene",
        NewGame = "NewGame",
        GameScene = "GameScene",
        None = "None"
}