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
    return [SELECT Id, Name, map_image__c FROM Office_Play_config__c];
  }
}
