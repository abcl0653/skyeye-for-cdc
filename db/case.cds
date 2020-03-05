namespace dcp;

using {managed, cuid, User} from '@sap/cds/common';
using {dcp.BLOCK, dcp.BLOCK_UNIT, dcp.PERSON, dcp.HOSPITAL} from './block';
using {
        dcp.CASE_TYPE, 
        dcp.PATIENT_STATUS, 
        dcp.EVENT_TYPE, 
        dcp.EVENT_SUB_TYPE, 
        dcp.TASK_TYPE,
        dcp.TASK_PRIORITY,
        dcp.TASK_STATUS,
    } from './common';

entity CASES : managed {
    key ID: UUID;
    NUMBER: Integer;
    NAME: String; // Or title?
    START_DATE: Date ; //default $now; 
    CONFIRMED_DATE: Date;
    BLOCK_UNIT: Association to BLOCK_UNIT;
    RELATED_PERSON: Association to PERSON;
    RESPONSIBLE: Association to PERSON;
    HOSPITAL: Association to HOSPITAL;
    CASE_TYPE: CASE_TYPE;
    STATUS: PATIENT_STATUS;
    REMARK: String;
    CASE_CHANGE_HIS: Composition of many CASE_CHANGE_HISTORY on CASE_CHANGE_HIS.CASES = $self;
}

entity EVENT : managed {
    key ID: UUID;
    TITLE: String(100);
    DESCRIPTION: String;
    START_DATETIME: DateTime;
    END_DATETIME: DateTime;
    ADDRESS: Association to BLOCK_UNIT;
    LAT_LNG: LargeString;
    INFLUENCE: TASK_PRIORITY; // String(10) enum {High; Medium; Low};
    EVENT_TYPE: EVENT_TYPE;
    EVENT_SUB_TYPE: EVENT_SUB_TYPE;
    RESPONSIBLE: Association to PERSON;
}

entity TASK : cuid{
    NUMBER: Integer; // Readable ID
    TITLE: String(100);
    DESCRIPTION: String;
    DUE_DATETIME: DateTime;
    START_DATETIME: DateTime;
    END_DATETIME: DateTime;
    TASK_TYPE: TASK_TYPE;
    TASK_PRIORITY: TASK_PRIORITY;
    TASK_STATUS: TASK_STATUS;
    BLOCK : Association to BLOCK;
    // BLOCK_UNIT : Association to BLOCK_UNIT;

    TASK_ITEMS: Composition of many TASK_ITEMS on TASK_ITEMS.TASK = $self;
}

entity TASK_ITEMS : cuid{
    ITEM_NUMBER: Integer;
    TASK: Association to TASK;
    BLOCK_UNIT: Association to BLOCK_UNIT;
    TASK_ITEM_TYPE: String(10);
    START_DATETIME: DateTime;
    END_DATETIME: DateTime;
    RESULT: String;
    RESPONSIBLE: Association to PERSON;
    REMARK: String; 
}

entity EVENT_RELATED_CASE : cuid {
    EVENT: Association to EVENT;
    CASES: Association to CASES;
    IS_SOURCE_CASE: Boolean; // True means this case is the source of infection net
    REMARK: String;
}

entity CASE_CHANGE_HISTORY: cuid {
    CASES: Association to CASES;
    CHANGE_TYPE: String(10); // CaseStatus change or CaseType change
    CHANGED_AT: DateTime;
    CHANGED_BY: User;
    STATUS: PATIENT_STATUS; // inserted when the status is changed from the cases table
    CASE_TYPE: CASE_TYPE; // inserted when the case type is changed from the cases table
    DESCRIPTION: String;
}

entity EVENT_RELATED_PERSON : cuid {
    EVENT: Association to EVENT;
    PERSON: Association to PERSON;
    REMARK: String;
}


// Aggregation data for cases and prediction result

entity BLOCK_CASE_REPORT : managed {
    key BLOCK: Association to BLOCK;
    key CASE_DATE: Date;
    CONFIRMED: Integer;
    SUSPECTED: Integer;
    RECOVERED: Integer;
    RISK_LEVEL: TASK_PRIORITY; // High, Medium, Low
    PREDICTED_CONFIRMED: Integer;
    PREDICTED_SUSPECTED: Integer;
    PREDICTED_RECOVERED: Integer;
    PREDICTED_RISK_LEVEL: TASK_PRIORITY;
}