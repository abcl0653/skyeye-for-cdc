namespace cdc;
using {User, managed, cuid } from '@sap/cds/common';

entity Grids : managed {
    key ID: Integer;
    parent: Association to Grids;
    hierlevel: Integer;
    name: String(20);
    houseHoldTotal: Integer;
    manager: String(20);
    managerTelephone: String(20);
    centerPoint: LargeString; //Geojson format
    polygon: LargeString; //Geojson format

}

// Temp entity for no distribution data
entity GridDaily : cuid {
    grid: Association to Grids;
    predictedRiskLevel: String(1) enum {
        Red = '高';
        Yellow = '中';
        Green = '低';
    };
    date: Date;
    confirmedCase: Integer; //当日新增
    suspiciousCase: Integer;
    heavyCase: Integer;
    deadCase: Integer;
    cureCase: Integer;
    isolatedNumber: Integer;

}

entity Hospitals: managed {
    key ID: Integer;
    name: String(30);
    locationText: String(100);
    patientNumber: Integer;
    patientBed: Integer; //病床数
    location: LargeString; //Geojson
}