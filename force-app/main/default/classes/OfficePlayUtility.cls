/*******************************************************************************************
 * @Name         OfficePlayUtility
 * @Author       Damien Fleminks
 * @Description  Utility class to execute logic related to the Office_Play_config__c object
 *******************************************************************************************/

public with sharing class OfficePlayUtility {
  /**
   * Return the Office Play Games list
   */
  @AuraEnabled(cacheable=true)
  public static List<Office_Play_config__c> getGames() {
    // String userId = UserInfo.getUserId();
    // List<Office_Play_config__c> games = new List<Office_Play_config__c>();
    // Set<Id> gameIds = new Set<Id>();
    // for(Player__c player: [SELECT Office_Play_Config__c FROM Player__c WHERE User__c = :userId]){
    //     gameIds.add(player.Office_Play_Config__c);
    // }
    // return [
    //     SELECT Id, Name, map_image__c
    //     FROM Office_Play_config__c WHERE Id in :gameIds
    //   ];
    return [SELECT Id, Name, map_image__c FROM Office_Play_config__c];
  }
}
