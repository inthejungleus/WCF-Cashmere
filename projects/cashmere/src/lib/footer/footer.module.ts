import {NgModule} from '@angular/core';
import {FooterComponent} from './footer.component';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [FooterComponent],
    exports: [FooterComponent]
})
export class FooterModule {
}
