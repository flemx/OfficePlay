/*******************************************************************************************
 * @Name         PlayerTriggerHandler
 * @Author       Damien Fleminks
 * @Description  Trigger Handler for the  Player__c object trigger, contains all trigger event methods
 *******************************************************************************************/

public with sharing class PlayerTriggerHandler implements triggerHandler {
  public void bulkBefore() {
    /**
     * Add Email from User__r.Email upon insert
     */
    if (Trigger.isInsert) {
      List<Player__c> newPlayers = Trigger.new;
      Map<Id, String> userEmails = new Map<Id, String>();
      Set<Id> userIds = new Set<Id>();

      for (Player__c p : newPlayers) {
        userIds.add(p.User__c);
      }
      for (User u : [SELECT Id, Email FROM User WHERE Id IN :userIds]) {
        userEmails.put(u.Id, u.Email);
      }
      for (Player__c p : newPlayers) {
        System.debug('Add EMAIL: ' + userEmails.get(p.User__c));
        p.Player_ID__c = userEmails.get(p.User__c);
      }
    } else if (Trigger.isUpdate) {
      // Keep Player_ID__c in sync from User__r.Email after any updates
      List<Player__c> newPlayers = Trigger.new;
      Map<Id, String> userEmails = new Map<Id, String>();
      Set<Id> playerIds = new Set<Id>();
      for (Player__c p : newPlayers) {
        playerIds.add(p.Id);
      }
      for (Player__c p : [
        SELECT User__r.Email, Player_ID__c
        FROM Player__c
        WHERE Id IN :playerIds
      ]) {
        Player__c triggerPlayer = (Player__c) Trigger.newMap.get(p.Id);
        if (triggerPlayer.Player_ID__c != p.User__r.Email) {
          triggerPlayer.Player_ID__c = p.User__r.Email;
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
