import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CashmereModule} from '../../shared/cashmere.module';
import {HeaderDemoComponent} from './header-demo.component';
import {LayoutModule} from '@angular/cdk/layout';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, CashmereModule, BrowserAnimationsModule, LayoutModule, ReactiveFormsModule],
    declarations: [HeaderDemoComponent],
    entryComponents: [HeaderDemoComponent]
})
export class HeaderDemoModule {
}
