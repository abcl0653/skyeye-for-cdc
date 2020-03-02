using {cdc, sap.common} from '../../db/samples/data-models-example';

service masterService {
    entity Grids as projection on cdc.Grids ;
    entity Patients as projection on cdc.Patients; 
    entity Hospital as projection on cdc.Hospitals;
    entity Cases as projection on cdc.Cases ;
    entity PatientTrack as projection on cdc.PatientTrack;
    entity PatientIntimateContact as projection on cdc.PatientIntimateContact
};
