import {
    AfterViewInit,
    Component,
    ContentChildren,
    Input,
    QueryList,
} from '@angular/core';

import { TypeaheadComponent } from '../typeahead/typeahead.component';

@Component({
  selector: 'hc-typeahead-title',
  templateUrl: './typeahead-title.component.html',
  styleUrls: ['./typeahead-title.component.scss'],
  host: { 'class': 'full-width' }
})
export class TypeaheadTitleComponent implements AfterViewInit {

    isTypeaheadShown: boolean = false;

    @Input()
    startingValue: any;

    @ContentChildren(TypeaheadComponent)
    _typeahead: QueryList<TypeaheadComponent>;

    constructor() { }

    hideTitle() {
        this.isTypeaheadShown = true;
        setTimeout(() => {
            this._typeahead.first.setFocus();
        });
    }

    ngAfterViewInit() {
        if (this._typeahead.first) {
            this._typeahead.first.optionSelected.subscribe(option => {
                this.isTypeaheadShown = false;
            });

            this._typeahead.first.registerOnChange(this.updateStartingValue.bind(this));

            this._typeahead.first.blur.subscribe(event => {
                // Prevents the click on the result panel causing the typeahead to disappear before the value can be sent
                if (this._typeahead.first._resultPanelHidden === true) {
                    this.isTypeaheadShown = false;
                }
            });
        }
    }

    updateStartingValue(val: string) {
        this.startingValue = val;
    }

}
