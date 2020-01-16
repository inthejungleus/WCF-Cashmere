import { Component } from '@angular/core';
import {TabChangeEvent} from '@wcf-insurance/cashmere';

/**
 * @title New Tab Styling with Event Handling
 */

@Component({
  selector: 'hc-tabs-new-horizontal-example',
  templateUrl: './tabs-new-horizontal-example.component.html',
  styleUrls: ['./tabs-new-horizontal-example.component.scss']
})
export class TabsNewHorizontalExampleComponent {

  selectedIndex: number = 0;

  selectionChanged(event: TabChangeEvent) {
      this.selectedIndex = event.index;
  }

  addTask(event: Event) {
      window.alert('The "Add Task" tab was clicked.');
  }

}
