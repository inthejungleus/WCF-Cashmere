import {Pipe, PipeTransform} from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';
import {HighlightMatchType} from './highlight-match-type';

@Pipe({name: 'hcHighlight', pure: true})
export class HighlightPipe implements PipeTransform {
    constructor() {
    }

    transform(
        data: string,
        highlightText: string,
        option: HighlightMatchType = HighlightMatchType.SINGLE_MATCH,
        caseSensitive: boolean = false,
        highlightStyleName: string = 'highlight'
    ): SafeHtml {

        if (!data || data.length === 0) {
            return data;
        }
        if (highlightText && data && option) {
            let regex: any = '';
            let caseFlag: string = !caseSensitive ? 'i' : '';
            switch (option) {
                case HighlightMatchType.SINGLE_MATCH: {
                    regex = new RegExp(highlightText, caseFlag);
                    break;
                }
                case HighlightMatchType.SINGLE_AND_STARTS_WITH_MATCH: {
                    regex = new RegExp('^' + highlightText, caseFlag);
                    break;
                }
                case HighlightMatchType.MULTI_MATCH: {
                    regex = new RegExp(highlightText, 'g' + caseFlag);
                    break;
                }
                default: {
                    // default will be a global case-insensitive match
                    regex = new RegExp(highlightText, 'gi');
                }
            }
            let tempData: string = String(data);
            if (!tempData.toLowerCase().includes(highlightText.toLowerCase())) {
                return data;
            }

            return tempData.replace(regex, match => '<span class="' + highlightStyleName + '">' + match + '</span>');
        } else {
            return data;
        }
    }
}
