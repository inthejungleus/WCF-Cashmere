export enum HighlightMatchType {
    /* use this for single match search */
    SINGLE_MATCH = 'Single-Match',
    /* use this for single match search with a restriction that target should start with search string */
    SINGLE_AND_STARTS_WITH_MATCH = 'Single-And-StartsWith-Match',
    /* use this for global search */
    MULTI_MATCH = 'Multi-Match'
}
