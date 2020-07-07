import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionBarExampleComponent} from './action-bar-example.component';
import {CashmereModule} from '../cashmere.module';

@NgModule({
    imports: [
        CommonModule,
        CashmereModule
    ],
    declarations: [ActionBarExampleComponent],
    entryComponents: [ActionBarExampleComponent]
})
export class ActionBarExampleModule {
}
