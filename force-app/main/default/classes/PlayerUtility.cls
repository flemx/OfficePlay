/*******************************************************************************************
 * @Name         PlayerUtility
 * @Author       Damien Fleminks
 * @Description  Utility class to execute logic relaated to the Player__c object
 *******************************************************************************************/

public with sharing class PlayerUtility {
  /**
   * Return player details if exists
   */
  @AuraEnabled(cacheable=true)
  public static Player getPlayer() {
    String userId = UserInfo.getUserId();
    Player__c player = new Player__c();
    Player playerReturn = new Player(false);
    try {
      player = [SELECT Id, Name FROM Player__c WHERE User__c = :userId];
      playerReturn.playerExist = true;
      playerReturn.player = player;
    } catch (QueryException e) {
      System.debug('NO PLAYER FOUND');
      return playerReturn;
    }
    return playerReturn;
  }

  /**
   * Create new player
   */
  @AuraEnabled(cacheable=true)
  public static Player createPlayer(
    String Name,
    String character,
    String gameId
  ) {
    String userId = UserInfo.getUserId();
    Player__c player = new Player__c(
      Name = name,
      Character__c = character,
      Office_Play_Config__c = gameId,
      User__c = userId
    );
    insert player;
    return new Player(playerExist = true, player = player);
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
