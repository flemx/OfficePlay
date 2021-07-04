/*******************************************************************************************
 * @Name         PlayerTriggerHandler
 * @Author       Damien Fleminks
 * @Description  Trigger Handler for the  Player__c object trigger, contains all trigger event methods
 *******************************************************************************************/
public with sharing class PlayerTriggerHandler implements triggerHandler {
  public void bulkBefore() {
    if (Trigger.isInsert) {
      System.debug('Inserted new Player!');
    } else if (Trigger.isUpdate) {
      // Keep User_Email__c in sync after any updates
      List<Player__c> newPlayers = Trigger.new;
      Map<Id, String> userEmails = new Map<Id, String>();
      Set<Id> playerIds = new Set<Id>();
      for (Player__c p : newPlayers) {
        playerIds.add(p.Id);
      }
      for (Player__c p : [
        SELECT User__r.Email, User_Email__c
        FROM Player__c
        WHERE Id IN :playerIds
      ]) {
        Player__c triggerPlayer = (Player__c) Trigger.newMap.get(p.Id);
        if (triggerPlayer.User_Email__c != p.User__r.Email) {
          triggerPlayer.User_Email__c = p.User__r.Email;
        }
      }
    }
    // if (Trigger.isDelete) {
    // }
    // if (Trigger.isUndelete) {
    // }
  }

  public void bulkAfter() {
    if (Trigger.isInsert) {
    } else if (Trigger.isUpdate) {
    } else if (Trigger.isDelete) {
    } else if (Trigger.isUndelete) {
    }
  }
}
