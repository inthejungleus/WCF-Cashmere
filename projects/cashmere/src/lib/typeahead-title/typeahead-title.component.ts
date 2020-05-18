import {AfterViewInit, Component, ContentChildren, QueryList} from '@angular/core';

import {TypeaheadComponent} from '../typeahead/typeahead.component';

@Component({
    selector: 'hc-typeahead-title',
    templateUrl: './typeahead-title.component.html',
    styleUrls: ['./typeahead-title.component.scss']
})
export class TypeaheadTitleComponent implements AfterViewInit {
    DEFAULT_PLACEHOLDER = 'Typeahead Placeholder';

    _isTypeaheadShown: boolean = false;
    _value: string;
    _placeholder: string;
    _displayValue: string;

    @ContentChildren(TypeaheadComponent)
    _typeahead: QueryList<TypeaheadComponent>;

    _hideTitle() {
        this._isTypeaheadShown = true;
        setTimeout(() => {
            this._typeahead.first.setFocus();
        });
    }

    ngAfterViewInit() {
        if (this._typeahead.first) {
            this._placeholder = this._typeahead.first._inputRef.nativeElement.getAttribute('placeholder');
            this._typeahead.first.optionSelected.subscribe(option => {
                this._isTypeaheadShown = false;
            });

            this._typeahead.first.registerOnChange(this._updateValue.bind(this));

            this._typeahead.first.blur.subscribe(event => {
                // Prevents the click on the result panel causing the typeahead to disappear before the value can be sent
                if (this._typeahead.first._resultPanelHidden === true) {
                    this._isTypeaheadShown = false;
                }
            });
        }

        this._refreshDisplayValue();
    }

    private _updateValue(val: string) {
        this._value = val;
        this._refreshDisplayValue();
    }

    private _refreshDisplayValue() {
        setTimeout(() => {
            this._displayValue = this._value || this._placeholder || this.DEFAULT_PLACEHOLDER;
        });
    }
}
