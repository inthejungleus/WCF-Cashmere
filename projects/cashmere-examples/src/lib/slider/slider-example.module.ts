import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CashmereModule} from '../cashmere.module';
import {CommonModule} from '@angular/common';
import {SliderExampleComponent} from './slider-example.component';

@NgModule({
    imports: [CommonModule, CashmereModule, FormsModule, ReactiveFormsModule],
    declarations: [SliderExampleComponent],
    entryComponents: [SliderExampleComponent]
})
export class SliderExampleModule {}

