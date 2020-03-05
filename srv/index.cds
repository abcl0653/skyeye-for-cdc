using from './dcp-service.cds';

annotate dcpService.BLOCK_LEVELS with @(
    UI: {
        Identification: [ {Value: code} ],
        SelectionFields: [ code ],
        LineItem: [
            {Value: code},
            {Value: name},
            {Value: descr}
        ],
        HeaderInfo: {
            TypeName: 'Blocks',
            TypeNamePlural: 'Block',
            Title: {Value: name},
            Description: {Value: descr}
        }
    }
);

annotate dcpService.BLOCK_LEVELS with {
    code @title:'ID' @UI.HiddenFilter;
    name @title:'Title';
    descr @title:'AuthorID';
}

// annotate CatalogService.Books with @(
//     UI: {
//         Identification: [ {Value: title} ],
//         SelectionFields: [ title ],
//         LineItem: [
//             {Value: ID},
//             {Value: title},
//             {Value: author.name},
//             {Value: author_ID},
//             {Value: stock}
//         ],
//         HeaderInfo: {
//             TypeName: 'Book',
//             TypeNamePlural: 'Books',
//             Title: {Value: title},
//             Description: {Value: author.name}
//         }
//     }
// );
// 
// annotate CatalogService.Books with {
//     ID @title:'ID' @UI.HiddenFilter;
//     title @title:'Title';
//     author @title:'AuthorID';
//     stock @title:'Stock';
// }
// 
// annotate CatalogService.Authors with {
//     ID @title:'ID' @UI.HiddenFilter;
//     name @title:'AuthorName';
// }