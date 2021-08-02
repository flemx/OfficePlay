/*******************************************************************************************
 * @Name         PlayerUtilityTest
 * @Author       Damien Fleminks
 * @Description  Test class to evaluate the outcomes og the methods in the PlayerUtility class
 *******************************************************************************************/

@isTest
private class PlayerUtilityTest {
  /**
   *  A testSetup method to setup test data that will be reused by multiple test methods
   *  We will test one Office_Play_Config__c record with and one without a player
   */
  @testSetup
  static void setup() {
    String userId = UserInfo.getUserId();
    Office_Play_Config__c office1 = new Office_Play_Config__c(
      Name = 'TestOffice1'
    );
    Office_Play_Config__c office2 = new Office_Play_Config__c(
      Name = 'TestOffice2'
    );
    insert office1;
    insert office2;
    Player__c player = new Player__c(
      Name = 'TestPlayer',
      User__c = userId,
      Office_Play_Config__c = office1.Id
    );
    insert player;
  }
  /**
   *  This method tests the different outcomes for the getPlayer() method
   */
  @isTest
  static void getPlayerTest() {
    String userId = UserInfo.getUserId();
    Office_Play_Config__c office = [
      SELECT Id
      FROM Office_Play_Config__c
      WHERE Name = 'TestOffice1'
      LIMIT 1
    ];
    Player__c player = PlayerUtility.getPlayer(office.Id);
    System.assertEquals(userId, player.User__c);
    Player__c player2 = PlayerUtility.getPlayer('dont exists');
    System.assertEquals(null, player2);
  }

  @isTest
  static void createPlayerTest() {
    String userId = UserInfo.getUserId();
    Office_Play_Config__c office = [
      SELECT Id
      FROM Office_Play_Config__c
      WHERE Name = 'TestOffice1'
      LIMIT 1
    ];
    Office_Play_Config__c office2 = [
      SELECT Id
      FROM Office_Play_Config__c
      WHERE Name = 'TestOffice2'
      LIMIT 1
    ];
    Player__c player = [
      SELECT Id
      FROM Player__c
      WHERE
        User__c = :userId
        AND Name = 'TestPlayer'
        AND Office_Play_Config__c = :office.Id
      LIMIT 1
    ];
    Player__c playerTest1 = PlayerUtility.createPlayer(
      'TestPlayer',
      'p1',
      office.Id
    );
    Player__c playerTest2 = PlayerUtility.createPlayer(
      'TestPlayer2',
      'p1',
      office2.Id
    );
    System.assertEquals(player.Id, playerTest1.Id);
    System.assert(player.Id != playerTest2.Id);
  }
}
