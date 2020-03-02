namespace dcp;

using sap from '@sap/cds/common';

entity BLOCK_LEVELS : sap.common.CodeList {
    key code: Integer;
}

entity PERSON_TYPES : sap.common.CodeList {
    key code: String(5);
}

entity BLOCK_UNIT_TYPES : sap.common.CodeList {
    key code: String(5);
}

entity SOURCE_TYPES : sap.common.CodeList {
    key code: String(5);
}

entity CASE_TYPES : sap.common.CodeList {
    key code: String(5);
}

entity PATIENT_STATUSES : sap.common.CodeList {
    key code: String(5);
}

entity TASK_PRIORITIES : sap.common.CodeList {
    key code: Integer;
}

entity TASK_STATUSES : sap.common.CodeList {
    key code: String(5);
}

entity EVENT_TYPES : sap.common.CodeList {
    key code: String(5);
    SUB_TYPES: Composition of many EVENT_SUB_TYPES on SUB_TYPES.EVENT_TYPE = $self;
}

entity EVENT_SUB_TYPES : sap.common.CodeList {
    key code: String(5);
    EVENT_TYPE: Association to EVENT_TYPES;
}

entity TASK_TYPES: sap.common.CodeList {
    key code: String(5);
}

type BLOCK_LEVEL: Association to BLOCK_LEVELS;
type PERSON_TYPE: Association to PERSON_TYPES;
type BLOCK_UNIT_TYPE: Association to BLOCK_UNIT_TYPES;
type SOURCE_TYPE: Association to SOURCE_TYPES;
type CASE_TYPE: Association to CASE_TYPES;
type PATIENT_STATUS: Association to PATIENT_STATUSES;
type EVENT_TYPE: Association to EVENT_TYPES;
type EVENT_SUB_TYPE: Association to EVENT_SUB_TYPES;
type TASK_TYPE: Association to TASK_TYPES;
type TASK_PRIORITY: Association to TASK_PRIORITIES;
type TASK_STATUS: Association to TASK_STATUSES;
