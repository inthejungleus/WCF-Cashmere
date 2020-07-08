import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HcTableDataSource} from '@wcf-insurance/cashmere';
import {SelectionChange, SelectionModel} from '@angular/cdk/collections';
import {PeriodicElement} from '../table-multi-select/table-multi-select-example.component';

@Component({
    selector: 'hc-action-bar-example',
    templateUrl: './action-bar-example.component.html',
    styleUrls: ['./action-bar-example.component.scss']
})
export class ActionBarExampleComponent implements OnInit {
    actionBarHidden = false;
    allActionItemsDisabled = false;

    isEditHidden = false;
    isEditDisabled = false;

    isCloseHidden = false;
    isCloseDisabled = false;

    isPrintHidden = false;
    isPrintDisabled = false;

    isDeleteHidden = false;
    isDeleteDisabled = false;

    isToggleHidden = false;
    isToggleDisabled = false;

    sampleOutput = 'Click an action!';
    toggleIcon = 'fa-toggle-on';

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {}

    edit() {
        this.sampleOutput = 'Edit Clicked';
    }

    close() {
        this.sampleOutput = 'Close clicked!';
    }

    print() {
        this.sampleOutput = 'Print clicked!';
    }

    delete() {
        this.sampleOutput = 'Delete clicked!';
    }

    toggleEdit() {
        this.isEditDisabled = !this.isEditDisabled;
        if (this.isEditDisabled) {
            this.sampleOutput = 'Edit was disabled!';
            this.toggleIcon = 'fa-toggle-off';
        } else {
            this.sampleOutput = 'Edit was enabled!';
            this.toggleIcon = 'fa-toggle-on';
            this.cd.detectChanges();
        }
    }
}
