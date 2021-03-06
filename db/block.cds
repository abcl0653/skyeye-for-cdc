namespace dcp;

using { managed } from '@sap/cds/common';
using { dcp.BLOCK_LEVEL, dcp.PERSON_TYPE, dcp.BLOCK_UNIT_TYPE, dcp.SOURCE_TYPE } from './common';

entity BLOCK : managed {
    key ID: Integer64; // For standard code, it is long
    PARENT: Association to BLOCK; // In DB, this field will be PARENT_ID
    BLOCK_LEVEL: BLOCK_LEVEL; 
    RESPONSIBLE: Association to PERSON;
    LAT_LNG: LargeString  // Probably Store geojson
}

entity BLOCK_UNIT: managed {
    key ID: Integer;
    FULL_ADDRESS: String;
    COUNT_OF_PEOPLE: Integer;
    TYPE: BLOCK_UNIT_TYPE;
    SOURCE: SOURCE_TYPE;
    RESPONSIBLE: Association to PERSON;
}

entity PERSON : managed {
    key ID: Integer;
    FIRST_NAME: String;
    LAST_NAME: String;
    TYPE: PERSON_TYPE;
    MOBILE_PHONE: String;
    ADDRESS: String; // TO_DO
    LAT_LNG: LargeString
}

entity HOSPITAL {
    key ID: Integer;
    NAME: String;
    RESPONSIBLE: Association to PERSON;
    HOSPITAL_LEVEL: String(2); // 3A, 3B
    BLOCK: Association to BLOCK;
    LAT_LNG: LargeString;
    CAPACITY: Integer
}

