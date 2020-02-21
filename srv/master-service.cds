using {cdc, sap.common} from '../db/data-models';

service masterService {
    entity Grids as projection on cdc.Grids ;
}