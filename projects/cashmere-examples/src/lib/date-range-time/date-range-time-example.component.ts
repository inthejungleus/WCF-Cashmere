import {Component, OnInit} from '@angular/core';
import {DateRange, DateRangeOptions} from '@wcf-insurance/cashmere';

@Component({
    selector: 'hc-date-range-time-example',
    templateUrl: './date-range-time-example.component.html',
    styleUrls: ['date-range-time-example.component.scss']
})
export class DateRangeTimeExampleComponent implements OnInit {
    range: DateRange = {fromDate: new Date(2019, 1, 1, 9, 30), toDate: new Date(2019, 1, 1, 17, 15)};
    options: DateRangeOptions;

    ngOnInit() {
        this.options = {
            format: 'shortTime',
            mode: 'time',
            startDatePrefix: "Start Time",
            endDatePrefix: "End Time",
            invalidDateLabel: 'Start time must precede end time',
            applyLabel: 'Apply'
        };
    }

    updateRange(range: DateRange) {
        this.range = range;
    }
}
