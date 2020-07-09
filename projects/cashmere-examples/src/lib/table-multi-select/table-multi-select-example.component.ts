import {Component, OnInit} from '@angular/core';
import {HcTableDataSource} from '@wcf-insurance/cashmere';
import {SelectionChange, SelectionModel} from '@angular/cdk/collections';
import {ELEMENTS} from './elements';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = ELEMENTS;

@Component({
    selector: 'hc-table-multi-select-example',
    templateUrl: './table-multi-select-example.component.html',
    styleUrls: ['./table-multi-select-example.component.scss']
})
export class TableMultiSelectExampleComponent implements OnInit {
    actionBarHidden = false;
    allActionItemsDisabled = false;

    isFuseHidden = false;
    isFuseDisabled = true;

    isDivideHidden = false;
    isDivideDisabled = true;

    isPrintHidden = false;
    isPrintDisabled = true;

    isDeleteHidden = false;
    isDeleteDisabled = true;

    displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
    dataSource = new HcTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    constructor() {}

    ngOnInit() {
        this.selection.changed.subscribe((selectionChange) => {
            this.processSelectionChangeRules(selectionChange);
        });
    }

    processSelectionChangeRules(selectionChange: SelectionChange<any>): void {
        this.isFuseDisabled = this.notMultipleElementsOrAnyAreTooHeavy(selectionChange);
        this.isDivideDisabled = this.isNotSingleAtomOrIsHydrogen(selectionChange);
        this.isPrintDisabled = this.isSelectionEmpty(selectionChange);
        this.isDeleteDisabled = this.isSelectionEmpty(selectionChange);
    }

    isNotSingleAtomOrIsHydrogen(selectionChange: SelectionChange<PeriodicElement>): boolean {
        return selectionChange.source.selected.length !== 1 || selectionChange.source.selected[0].position === 1;
    }
    noneSelectedOrAnyHydrogen(selection: SelectionChange<PeriodicElement>): boolean {
        return selection.source.selected.length === 0 || selection.source.selected.some(element => element.position === 1);
    }
    isSelectionEmpty(selection: SelectionChange<PeriodicElement>): boolean {
        return selection.source.selected.length === 0;
    }
    notMultipleElementsOrAnyAreTooHeavy(selection: SelectionChange<PeriodicElement>) {
        return selection.source.selected.length < 2 ||
            selection.source.selected.some(element => element.position >= 26);
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
    }
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    fuse() {
        let elementNames = this.selection.selected.map(item => item.name).toString();
        alert(`Fusing the following elements ${elementNames}`);
    }

    divide() {
        let elementNames = this.selection.selected.map(item => item.name).toString();
        alert(`Splitting the following elements ${elementNames}`);
    }

    print() {
        let elementNames = this.selection.selected.map(item => item.name).toString();
        alert(`Printing the following elements ${elementNames}`);
    }

    delete() {
        let elementNames = this.selection.selected.map(item => item.name).toString();
        alert(`Deleting the following elements ${elementNames}`);
    }
}
