using {dcp, sap.common} from '../db/data-models';

service testService  {
    entity Person as projection on dcp.PERSON;
    entity HealthSelfStatement as projection on dcp.HEALTH_SELF_STATEMENT;
    action new(p:Person) returns String;
};
