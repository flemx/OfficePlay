/*******************************************************************************************
 * @Name         PlayerEvent
 * @Author       Damien Fleminks
 * @Description  Contanins methods to publish platform events from the player
 *******************************************************************************************/

public with sharing class PlayerEvent {
  @AuraEnabled(cacheable=false)
  public static void publishPlayer(office_player__e playerEvent) {
    EventBus.publish(playerEvent);
  }

  @AuraEnabled(cacheable=false)
  public static void publishChat(office_chat__e chatEvent) {
    EventBus.publish(chatEvent);
  }
}
