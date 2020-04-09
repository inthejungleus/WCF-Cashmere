import {Component, ViewEncapsulation} from '@angular/core';
import {HighlightMatchType} from '@wcf-insurance/cashmere';

/**
 * @title Highlight Pipe Overview
 */
@Component({
    selector: 'hc-highlight-overview-example',
    templateUrl: 'highlight-overview-example.component.html',
    styleUrls: ['highlight-overview-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HighlightOverviewExampleComponent {
    value: string = 'Peter Piper picked a peck of pickled peppers';
    highlightText: string = 'pe';
    matchType: HighlightMatchType = HighlightMatchType.MULTI_MATCH;
    caseSensitive: boolean = false;
    highlightStyleName: string = 'highlight';

    MatchType = HighlightMatchType;
}
