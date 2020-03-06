using {dcp, sap.common} from '../db/data-models';

service blockService  {
    entity Block 
        // { grant : ['READ', 'WRITE'], where: 'CODE = ''310000'''}
        // { grant : ['READ', 'WRITE'], to: 'admin'},
        // { grant : ['READ', 'WRITE'], where: 'CODE = $user.block'},
     as projection on dcp.BLOCK;
    entity BlockUnit as projection on dcp.BLOCK_UNIT;
    function test() returns Integer;
};

service facilityService  {
    entity Hospital as projection on dcp.HOSPITAL;
};

service dcpService {
    entity Person as projection on dcp.PERSON;
    entity Block as projection on dcp.BLOCK;
    entity HealthSelfStatement as projection on dcp.HEALTH_SELF_STATEMENT;

    entity Cases as projection on dcp.CASES;
    entity Event as projection on dcp.EVENT;
    entity Event2Case as projection on dcp.EVENT_RELATED_CASE;

    entity Task as projection on dcp.TASK;
    
    entity BlockCaseReport as projection on dcp.BLOCK_CASE_REPORT;
    // entity StatementPerson as projection on dcp.STATEMENT_PERSON;
    action newStatementPerson (s: HealthSelfStatement, p:Person) returns String;

};

