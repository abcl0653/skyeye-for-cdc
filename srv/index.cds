using from './dcp-service.cds';
using from './dcp-admin-service.cds';

annotate facilityService.Hospital with @(
    UI: {
        Identification: [ {Value: ID} ],
        SelectionFields: [ HOSPITAL_LEVEL ],
        LineItem: [
            {Value: NAME},
            {Value: HOSPITAL_LEVEL},
            // {Value: RESPONSIBLE},
            {Value: CAPACITY},
            {Value: TOTAL_CASE}
        ],
        HeaderInfo: {
            TypeName: '医院',
            TypeNamePlural: '医院',
            Title: {Value: NAME},
            Description: {Value: HOSPITAL_LEVEL}
        }
    }
);

annotate facilityService.Hospital with {
    NAME @title:'医院名称' @UI.HiddenFilter;
    HOSPITAL_LEVEL @title:'医院等级';
    RESPONSIBLE @title:'负责人';
    CAPACITY @title:'容量';
    TOTAL_CASE @title:'病例总数';
}


annotate dcpService.Activity with @(
    UI: {
        Identification: [{Value: ID}]

    }
);