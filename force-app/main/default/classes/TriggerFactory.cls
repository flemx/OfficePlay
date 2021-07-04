/*******************************************************************************************
 * @Name         TriggerFactory
 * @Author       Damien Fleminks
 * @Description  Using Trigger Factory design pattern to manage all trigger handlers
 *******************************************************************************************/
public with sharing class TriggerFactory {
  public static void createTriggerHandler(Schema.sObjectType soType) {
    TriggerHandler triggerHandler = getTriggerHandler(soType);

    if (handler == null) {
      throw new TriggerException('Trigger handler invalid for type: ' + soType);
    }
    execute(handler);
  }

  private static void execute(TriggerHandler triggerHandler) {
    if (Trigger.isBefore) {
      triggerHandler.bulkBefore();
    } else {
      triggerHandler.bulkAfter();
    }
  }

  /**
   *  Based on Object type return appropriate trigger handler
   */
  private static TriggerHandler getTriggerHandler(Schema.sObjectType soType) {
    if (soType == Player__c.sObjectType) {
      return new PlayerTriggerHandler();
    }

    return null;
  }
}
