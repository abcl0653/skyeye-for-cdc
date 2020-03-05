using from './dcp-service.cds';

annotate facilityService.Hospital with @(
    UI: {
        Identification: [ {Value: ID} ],
        SelectionFields: [ NAME, HOSPITAL_LEVEL ],
        LineItem: [
            {Value: NAME},
            {Value: HOSPITAL_LEVEL},
            // {Value: RESPONSIBLE},
            {Value: CAPACITY},
            {Value: TOTAL_CASE}
        ],
        HeaderInfo: {
            TypeName: '{i18n>Hospital}',
            TypeNamePlural: '{i18n>Hospitals}',
            Title: {Value: NAME},
            Description: {Value: HOSPITAL_LEVEL}
        }
    }
);

annotate facilityService.Hospital with {
    NAME @title:'{i18n>Name}' @UI.HiddenFilter;
    HOSPITAL_LEVEL @title:'{i18n>HospitalLevel}';
    RESPONSIBLE @title:'{i18n>Responsible}';
    CAPACITY @title:'{i18n>Capacity}';
    TOTAL_CASE @title:'{i18n>TotalCase}';
}
