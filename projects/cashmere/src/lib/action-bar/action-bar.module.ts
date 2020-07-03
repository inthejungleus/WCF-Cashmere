import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from './action-bar.component';
import {IconModule} from '../icon/icon.module';

@NgModule({
    imports: [
        CommonModule,
        IconModule
    ],
    exports: [
        ActionBarComponent
    ],
    declarations: [ActionBarComponent]
})
export class ActionBarModule { }
