import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableMultiSelectExampleComponent} from './table-multi-select-example.component';
import {CashmereModule} from '../cashmere.module';

@NgModule({
    imports: [CommonModule, CashmereModule],
    declarations: [TableMultiSelectExampleComponent],
    entryComponents: [TableMultiSelectExampleComponent]
})
export class TableMultiSelectExampleModule {}
