import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddressComponent} from './address.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormFieldModule} from './../form-field/hc-form-field.module';
import {InputModule} from './../input/input.module';
import {PipesModule} from './../pipes/pipes.module';
import {TypeaheadModule} from './../typeahead/typeahead.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormFieldModule, InputModule, PipesModule, TypeaheadModule],
    exports: [AddressComponent],
    declarations: [AddressComponent]
})

export class AddressModule {}