import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WcfTabComponent} from './wcf-tab.component';
import {HcWcfTabTitleComponent} from './wcf-tab-title.component';
import {WcfTabSetComponent} from './wcf-tab-set.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [WcfTabComponent, HcWcfTabTitleComponent, WcfTabSetComponent],
    exports: [WcfTabComponent, HcWcfTabTitleComponent, WcfTabSetComponent]
})
export class WcfTabsModule {}
