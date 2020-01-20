import {Component, Input, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter} from '@angular/core';
import {HcWcfTabTitleComponent} from './wcf-tab-title.component';

@Component({
    template: `
        <div [hidden]="!_active">
            <ng-container *ngIf="false"><ng-content select="hc-tab-title"></ng-content></ng-container>
            <ng-content></ng-content>
        </div>
    `,
    selector: `hc-wcf-tab`,
    styles: []
})
export class WcfTabComponent implements AfterContentInit {
    /** Plain text title of the tab; for HTML support include a `hc-tab-title` element */
    @Input()
    wcfTabTitle: string = '';
    /** Router path that the tab routes to. If one tab uses the routerLink in a tab set, all must use the router link.
     * Can be specified as '/path/2' or ['path', '2']
     */
    @Input()
    routerLink: any[] | string;

    /** Emits when this tab is selected; use instead of `(click)` for click binding  */
    @Output()
    tabClick: EventEmitter<Event> = new EventEmitter();

    _active: boolean = false;
    _htmlTitle: HcWcfTabTitleComponent;

    @ContentChildren(HcWcfTabTitleComponent)
    _wcfTabTitle: QueryList<HcWcfTabTitleComponent>;

    ngAfterContentInit() {
        if (this._wcfTabTitle) {
            this._htmlTitle = this._wcfTabTitle.first;
        }
    }
}
