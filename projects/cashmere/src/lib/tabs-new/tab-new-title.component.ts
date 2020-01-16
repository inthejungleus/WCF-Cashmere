import {Component, ViewEncapsulation, TemplateRef, ViewChild} from '@angular/core';

/** Contains the HTML markup for tab titles */
@Component({
    selector: 'hc-tab-new-title',
    template: '<ng-template #tabNewTitle><ng-content></ng-content></ng-template>',
    encapsulation: ViewEncapsulation.None
})
export class HcTabNewTitleComponent {
    @ViewChild('tabNewTitle')
    public tabNewTitle: TemplateRef<any>;
}
