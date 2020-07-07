import {ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'hc-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActionBarComponent {

    constructor(private cd: ChangeDetectorRef) {}
}
