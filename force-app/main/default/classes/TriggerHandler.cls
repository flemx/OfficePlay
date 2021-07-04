/*******************************************************************************************
 * @Name         TriggerHandler
 * @Author       Damien Fleminks
 * @Description  This interface contains all methods for trigger events used for all object trigger handlers
 *******************************************************************************************/
public interface TriggerHandler {
  void bulkBefore();
  void bulkAfter();
}
