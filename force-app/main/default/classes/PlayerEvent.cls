/*******************************************************************************************
 * @Name         PlayerEvent
 * @Author       Damien Fleminks
 * @Description  Contanins methods to publish platform events from the player
 *******************************************************************************************/

public with sharing class PlayerEvent {
  @AuraEnabled(cacheable=false)
  public static boolean publishPlayer(office_player__e playerEvent) {
    EventBus.publish(playerEvent);
    return true;
  }

  @AuraEnabled(cacheable=false)
  public static boolean publishChat(office_chat__e chatEvent) {
    EventBus.publish(chatEvent);
    return true;
  }
}
