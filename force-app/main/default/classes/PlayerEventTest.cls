/*******************************************************************************************
 * @Name         PlayerEventTest
 * @Author       Damien Fleminks
 * @Description  Test class to evaluate the outcomes og the methods in the PlayerEvent class
 *******************************************************************************************/

@isTest
private class PlayerEventTest {
  @isTest
  static void publishPlayerTest() {
    office_player__e pEvent = new office_player__e(moveSignal__c = true);
    System.assert(PlayerEvent.publishPlayer(pEvent));
  }

  @isTest
  static void publishChatTest() {
    office_chat__e pEvent = new office_chat__e(
      message__c = 'This is a test message'
    );
    System.assert(PlayerEvent.publishChat(pEvent));
  }
}
