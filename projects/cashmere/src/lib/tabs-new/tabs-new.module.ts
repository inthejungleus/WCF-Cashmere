import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabNewComponent} from './tab-new.component';
import {HcTabNewTitleComponent} from './tab-new-title.component';
import {TabNewSetComponent} from './tab-new-set.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [TabNewComponent, HcTabNewTitleComponent, TabNewSetComponent],
    exports: [TabNewComponent, HcTabNewTitleComponent, TabNewSetComponent]
})
export class TabsNewModule {}
