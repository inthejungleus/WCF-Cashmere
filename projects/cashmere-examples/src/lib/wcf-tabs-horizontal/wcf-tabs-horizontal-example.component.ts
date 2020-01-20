import { Component } from '@angular/core';
import {TabChangeEvent} from '@wcf-insurance/cashmere';

/**
 * @title WCF Tab Styling with Event Handling
 */

@Component({
  selector: 'hc-wcf-tabs-horizontal-example',
  templateUrl: './wcf-tabs-horizontal-example.component.html',
  styleUrls: ['./wcf-tabs-horizontal-example.component.scss']
})
export class WcfTabsHorizontalExampleComponent {

  selectedIndex: number = 0;

  selectionChanged(event: TabChangeEvent) {
      this.selectedIndex = event.index;
  }

  addTask(event: Event) {
      window.alert('The "Add Task" tab was clicked.');
  }

}
