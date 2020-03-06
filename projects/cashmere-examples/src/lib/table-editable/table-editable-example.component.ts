import {Component, OnInit} from '@angular/core';
import {HcTableDataSource} from '@wcf-insurance/cashmere';

export interface WealthyDude {
    name: string;
    worth: number;
}

const WEALTH_DATA: WealthyDude[] = [
    {name: 'Jeff Bezos', worth: 109},
    {name: 'Bill Gates', worth: 107},
    {name: 'Bernard Arnault Family', worth: 106},
    {name: 'Warren Buffett', worth: 86},
    {name: 'Mark Zuckerberg', worth: 73}
];

/**
 * @title Filtered Table
 */
@Component({
    selector: 'hc-table-editable-example',
    templateUrl: 'table-editable-example.component.html',
    styleUrls: ['table-editable-example.component.scss']
})
export class TableEditableExampleComponent implements OnInit {
    displayedColumns: string[] = ['name', 'worth'];
    dataSource: HcTableDataSource<WealthyDude>;

    ngOnInit(): void {
        this.dataSource = new HcTableDataSource(WEALTH_DATA);
    }
}
