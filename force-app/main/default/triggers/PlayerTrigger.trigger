trigger PlayerTrigger on Player__c(
  after delete,
  after insert,
  after update,
  before delete,
  before insert,
  before update
) {
  TriggerFactory.createTriggerHandler(Player__c.sObjectType);
}
