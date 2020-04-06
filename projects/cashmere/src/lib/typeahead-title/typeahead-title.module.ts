import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TypeaheadTitleComponent} from './typeahead-title.component';

import {TypeaheadModule} from '../typeahead/typeahead.module';
import {IconModule} from '../icon/icon.module';

@NgModule({
    imports: [CommonModule, IconModule, TypeaheadModule],
    exports: [TypeaheadTitleComponent],
    declarations: [TypeaheadTitleComponent]
})

export class TypeaheadTitleModule {
}
