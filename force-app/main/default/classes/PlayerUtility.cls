/*******************************************************************************************
 * @Name         PlayerUtility
 * @Author       Damien Fleminks
 * @Description  Utility class to execute logic relaated to the Player__c object
 *******************************************************************************************/

public with sharing class PlayerUtility {
  /**
   * Return player details if exists
   */
  @AuraEnabled(cacheable=false)
  public static Player__c getPlayer(String gameId) {
    String userId = UserInfo.getUserId();
    Player__c player = new Player__c();
    Player playerReturn = new Player(false);
    try {
      player = [
        SELECT Id, Name, Character__c
        FROM Player__c
        WHERE User__c = :userId AND Office_Play_Config__c = :gameId
      ];
      playerReturn.playerExist = true;
      playerReturn.player = player;
    } catch (QueryException e) {
      System.debug('NO PLAYER FOUND');
      //return playerReturn;
      return null;
    }
    // return playerReturn;
    return player;
  }

  /**
   * Create new player
   */
  @AuraEnabled(cacheable=false)
  public static Player__c createPlayer(
    String Name,
    String character,
    String gameId
  ) {
    String userId = UserInfo.getUserId();
    User user = [SELECT Email FROM User WHERE Id = :userId];
    Player__c player = new Player__c(
      Name = name,
      Character__c = character,
      Office_Play_Config__c = gameId,
      User__c = userId,
      Player_ID__c = user.Email
    );

    upsert player Player_ID__c;
    // Player newPlayer = new Player(true);
    // newPlayer.player = player;
    return player;
  }

  /**
   *  Internal class to return player
   */
  private class Player {
    public Boolean playerExist;
    public Player__c player;
    Player(Boolean playerExist) {
      this.playerExist = playerExist;
      this.player = new Player__c();
    }
  }
}
