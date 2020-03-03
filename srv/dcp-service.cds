using {dcp, sap.common} from '../db/data-models';

service dcpService {
    entity Block as projection on dcp.BLOCK;
    entity Person as projection on dcp.PERSON;
    entity Event as projection on dcp.EVENT;

    entity Hospital as projection on dcp.HOSPITAL;
};
