/*******************************************************************************************
 * @Name         OfficePlayUtilityTest
 * @Author       Damien Fleminks
 * @Description  Test class to evaluate the outcomes og the methods in the OfficePlayUtility class
 *******************************************************************************************/
@isTest
private class OfficePlayUtilityTest {
  @testSetup
  static void setup() {
    String userId = UserInfo.getUserId();
    Office_Play_Config__c office1 = new Office_Play_Config__c(
      Name = 'TestOffice1'
    );
    insert office1;
  }

  @isTest
  static void getGamesTest() {
    List<Office_Play_config__c> games = OfficePlayUtility.getGames();
    System.assertEquals(games[0].Name, 'TestOffice1');
  }
}
