/*******************************************************************************************
 * @Name         PlayerTriggerHandler
 * @Author       Damien Fleminks
 * @Description  Trigger Handler for the  Player__c object trigger, contains all trigger event methods
 *******************************************************************************************/
public with sharing class PlayerTriggerHandler implements triggerHandler {
  public void bulkBefore() {
    if (Trigger.isInsert) {
    } else if (Trigger.isUpdate) {
    } else if (Trigger.isDelete) {
    } else if (Trigger.isUndelete) {
    }
  }

  public void bulkAfter() {
    if (Trigger.isInsert) {
    } else if (Trigger.isUpdate) {
    } else if (Trigger.isDelete) {
    } else if (Trigger.isUndelete) {
    }
  }
}
