import {NgModule} from '@angular/core';
import {TypeaheadComponent} from './typeahead.component';
import {TypeaheadItemComponent} from './typeahead-item/typeahead-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormFieldModule} from '../form-field/hc-form-field.module';
import {IconModule} from '../icon/icon.module';
import {CommonModule} from '@angular/common';
import {InputModule} from '../input/input.module';
import {ProgressIndicatorsModule} from '../progress-indicators/progress-indicators.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormFieldModule, IconModule, InputModule, ProgressIndicatorsModule],
    exports: [TypeaheadComponent, TypeaheadItemComponent],
    declarations: [TypeaheadComponent, TypeaheadItemComponent]
})
export class TypeaheadModule {
}
