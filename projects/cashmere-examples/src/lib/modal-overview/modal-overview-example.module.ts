import {NgModule} from '@angular/core';
import {ModalOverviewExampleComponent} from './modal-overview-example.component';
import {ModalOverviewExampleModalComponent} from './modal-overview-example-modal.component';
import {CashmereModule} from '../cashmere.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [CommonModule, CashmereModule, ReactiveFormsModule],
    declarations: [ModalOverviewExampleComponent, ModalOverviewExampleModalComponent],
    entryComponents: [ModalOverviewExampleComponent, ModalOverviewExampleModalComponent]
})
export class ModalOverviewExampleModule {}
