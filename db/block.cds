namespace dcp;

using { managed } from '@sap/cds/common';
using { dcp.BLOCK_LEVEL, dcp.PERSON_TYPE, dcp.BLOCK_UNIT_TYPE, dcp.SOURCE_TYPE } from './common';

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
    IDENTIFIER: String(30); //身份证号
    FIRST_NAME: String;
    LAST_NAME: String;
    TYPE: PERSON_TYPE;
    MOBILE_PHONE: String;
    ADDRESS: String; // TO_DO
    LAT_LNG: LargeString
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

