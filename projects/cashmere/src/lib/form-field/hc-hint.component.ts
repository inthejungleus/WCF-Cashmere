import {Component, HostBinding, ViewEncapsulation} from '@angular/core';

/** Hint to be shown under HcFormFieldComponent */
@Component({
    selector: 'hc-hint',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class HcHintComponent {
    @HostBinding('class.hc-hint')
    _hostClass = true;
}