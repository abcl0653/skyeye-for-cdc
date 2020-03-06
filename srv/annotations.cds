using from './dcp-service.cds';

// Field Name
annotate facilityService.Hospital with {
    NAME           @title : '{i18n>HospitalName}';
    HOSPITAL_LEVEL @title : '{i18n>HospitalLevel}';
    RESPONSIBLE    @title : '{i18n>Responsible}';
    CAPACITY       @title : '{i18n>Capacity}';
    TOTAL_CASE     @title : '{i18n>TotalCase}';
}

// Default UI Layout
annotate facilityService.Hospital with @(UI : {
    // List Report Filter
    SelectionFields  : [
        NAME,
        HOSPITAL_LEVEL
    ],

    // List Report Table Columns
    LineItem         : [
        {Value                : NAME},
        {Value                : HOSPITAL_LEVEL},
                       // {Value: RESPONSIBLE},
                       {Value : CAPACITY},
        {Value                : TOTAL_CASE}
    ],
    HeaderInfo       : {
                       // List Report Table Title
                       TypeName : '{i18n>Hospital}',
        TypeNamePlural          : '{i18n>Hospitals}',
                       // Object Page Header Title
                       Title    : {Value : NAME},
        Description             : {Value : HOSPITAL_LEVEL}
    },

    // Object Page Header Content
    // HeaderFacets    : [{
    //     $Type  : 'ReferenceFacet',
    //     Target : ''
    // }],

    // Object Page Information Section
    Identification   : [{Value : NAME},{Value : HOSPITAL_LEVEL}],
    FieldGroup #Capacity : {Data : [
        {Value : CAPACITY},
        {Value : TOTAL_CASE}
    ]},

    // Object Page Sections
    Facets           : [
        {
            $Type          : 'UI.CollectionFacet',
            Label          : '{i18n>GeneralInfo}',
            ID             : 'GeneralInfo',
            Facets         : [
                {
                    $Type  : 'UI.ReferenceFacet',
                    Target : '@UI.Identification',
                    Label  : '{i18n>GeneralInfo}',
                    ID     : 'GeneralInfo'
                },
                {
                    $Type  : 'UI.ReferenceFacet',
                    Target : '@UI.FieldGroup#Capacity',
                    Label  : '{i18n>HospitalCapacity}',
                    ID     : 'Capacity'
                }
            ]
        },
        {
            $Type          : 'UI.CollectionFacet',
            Label          : 'Other',
            ID             : 'Other',
            Facets         : []
        }
    ]
});