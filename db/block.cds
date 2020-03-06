namespace dcp;

using { managed } from '@sap/cds/common';
using { dcp.BLOCK_LEVEL, 
        dcp.PERSON_TYPE, 
        dcp.BLOCK_UNIT_TYPE, 
        dcp.SOURCE_TYPE,
        dcp.HEALTH_STATUS } from './common';

entity BLOCK : managed {
    key ID: UUID; 
    CODE: String(50); // Standard Admin code
    NAME: String(20);
    PARENT: Association to BLOCK; // In DB, this field will be PARENT_ID
    BLOCK_LEVEL: BLOCK_LEVEL; 
    LEVEL: String(20); // Tree level 
    SEQ: Integer; // For Sorting in UI
    RESPONSIBLE: Association to PERSON;
    LAT_LNG: LargeString;  // Probably Store geojson
    CHILDREN: Association to many BLOCK on CHILDREN.PARENT = $self ;
}

entity BLOCK_UNIT: managed {
    key ID: UUID;
    FULL_ADDRESS: String;
    COUNT_OF_PEOPLE: Integer;
    TYPE: BLOCK_UNIT_TYPE;
    SOURCE: SOURCE_TYPE;
    RESPONSIBLE: Association to PERSON;
}

entity PERSON : managed {
    key ID: UUID;
    IDENTIFIER: String(30)  ; //身份证号
    FIRST_NAME: String;
    LAST_NAME: String not null;
    TYPE: PERSON_TYPE;
    BLOCK: Association to BLOCK;
    MOBILE_PHONE: String(100) not null;
    HOME_TOWN_1: String(100) ;
    HOME_TOWN_2: String(100);
    HOME_TOWN_3: String(100);
    EXTERNAL_ID: String(100); // Weixin ID
    ADDRESS: String; // TO_DO
    SEX: String(5);
    AGE:Integer;
    LAT_LNG: LargeString;
    STATEMENT: Association to many HEALTH_SELF_STATEMENT on STATEMENT.PERSON = $self;
}

entity HOSPITAL {
    key ID: UUID;
    NAME: String;
    RESPONSIBLE: Association to PERSON;
    HOSPITAL_LEVEL: String(10); // 3A, 3B
    BLOCK: Association to BLOCK;
    LAT_LNG: LargeString;
    CAPACITY: Integer;
    TOTAL_CASE: Integer;
}


entity HEALTH_SELF_STATEMENT : managed {
    key ID: UUID;
    PERSON: Association to PERSON ;
    BLOCK: Association to BLOCK ;
    HEALTH_STATUS: HEALTH_STATUS not null;
    SYMPTOM_1: Boolean not null;
    SYMPTOM_2: Boolean not null;
    SYMPTOM_3: Boolean not null;
    SYMPTOM_4: Boolean ;
    SYMPTOM_4_DESC: String;
    IS_OUT: Boolean not null;
    OUT_DESC: String;
    QUESTION_1: Boolean;
    QUESTION_2: Boolean;
    QUESTION_3: Boolean;
    REMARK: String;
    SUBMIT_DATE:Date;
}
