/*******************************************************************************************
 * @Name         PlayerUtility
 * @Author       Damien Fleminks
 * @Description  Utility class to execute logic related to the Player__c object
 *******************************************************************************************/

public with sharing class PlayerUtility {
  /**
   * Return player details or null if no player exists
   */
  @AuraEnabled(cacheable=true)
  public static Player__c getPlayer(String gameId) {
    String userId = UserInfo.getUserId();
    Player__c player = new Player__c();
    try {
      player = [
        SELECT Id, Name, Character__c, Office_Play_Config__c, User__c
        FROM Player__c
        WHERE User__c = :userId AND Office_Play_Config__c = :gameId
      ];
    } catch (Exception e) {
      System.debug('NO PLAYER FOUND, due to error: ' + e.getMessage());
      return null;
    }
    return player;
  }

  /**
   * Create new player or update if player exists
   */
  @AuraEnabled(cacheable=false)
  public static Player__c createPlayer(
    String Name,
    String character,
    String gameId
  ) {
    Player__c player = PlayerUtility.getPlayer(gameId);
    String userId = UserInfo.getUserId();
    if (player == null) {
      player = new Player__c(
        Name = name,
        Character__c = character,
        Office_Play_Config__c = gameId,
        User__c = userId
      );
      insert player;
    } else {
      player.Character__c = character;
      player.Name = name;
      update player;
    }
    return player;
  }
}
