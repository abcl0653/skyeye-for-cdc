using {dcp, sap.common} from '../db/data-models';

service adminService  @(requires:'admin') {
    entity Block 
        // { grant : ['READ', 'WRITE'], where: 'CODE = ''310000'''}
        // { grant : ['READ', 'WRITE'], to: 'admin'},
        // { grant : ['READ', 'WRITE'], where: 'CODE = $user.block'},
     as projection on dcp.BLOCK;
    entity BlockUnit as projection on dcp.BLOCK_UNIT;
};

service adminhospitalService  {
    entity Hospital as projection on dcp.HOSPITAL;
};

// service dcpService {
//     entity Person as projection on dcp.PERSON;
    
//     entity Cases as projection on dcp.CASES;
//     entity Event as projection on dcp.EVENT;
//     entity Event2Case as projection on dcp.EVENT_RELATED_CASE;

//     entity Task as projection on dcp.TASK;
    
//     entity BlockCaseReport as projection on dcp.BLOCK_CASE_REPORT;
// };
