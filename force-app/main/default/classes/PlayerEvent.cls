public with sharing class PlayerEvent {
  @AuraEnabled(cacheable=false)
  public static void publishPlayer(office_player__e playerEvent) {
    EventBus.publish(playerEvent);
  }

  @AuraEnabled(cacheable=false)
  public static void publishChat(office_chat__e chatEvent) {
    EventBus.publish(chatEvent);
  }

  // @AuraEnabled(cacheable=false)
  // public static void publishPlayer(boolean isMove, string playerId, string gameId, string coord){

  //     office_player__e playerEvent = new office_player__e(

  //     );

  // }
}
