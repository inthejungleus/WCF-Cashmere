import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SliderComponent} from './slider.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [SliderComponent],
    exports: [SliderComponent]
})
export class SliderModule {}
