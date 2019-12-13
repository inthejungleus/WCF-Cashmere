import {Direction, Directionality} from '@angular/cdk/bidi';
import {DOWN_ARROW, END, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW} from '@angular/cdk/keycodes';
import {Component, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {HcNativeDateModule} from '../datetime/datetime.module';
import {AUG, DEC, FEB, JAN, JUL, JUN, MAR, MAY, NOV, OCT, SEP} from '../utils/month-constants';
import {dispatchFakeEvent, dispatchKeyboardEvent} from '../utils/dispatch-events';
import {CalendarBodyComponent} from '../calendar-body/calendar-body.component';
import {YearViewComponent} from './year-view.component';

/* tslint:disable */
describe('HcYearView', () => {
    let dir: { value: Direction };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HcNativeDateModule],
            declarations: [
                CalendarBodyComponent,
                YearViewComponent,

                // Test components.
                StandardYearView,
                YearViewWithDateFilter
            ],
            providers: [{provide: Directionality, useFactory: () => (dir = {value: 'ltr'})}]
        });

        TestBed.compileComponents();
    }));

    describe('standard year view', () => {
        let fixture: ComponentFixture<StandardYearView>;
        let testComponent: StandardYearView;
        let yearViewNativeElement: Element;

        beforeEach(() => {
            fixture = TestBed.createComponent(StandardYearView);
            fixture.detectChanges();

            const yearViewDebugElement = fixture.debugElement.query(By.directive(YearViewComponent));
            yearViewNativeElement = yearViewDebugElement.nativeElement;
            testComponent = fixture.componentInstance;
        });

        it('has 12 months', () => {
            const cellEls = yearViewNativeElement.querySelectorAll('.hc-calendar-body-cell')!;
            expect(cellEls.length).toBe(12);
        });

        it('shows selected month if in same year', () => {
            const selectedEl = yearViewNativeElement.querySelector('.hc-calendar-body-selected')!;
            expect(selectedEl.innerHTML.trim()).toBe('MAR');
        });

        it('does not show selected month if in different year', () => {
            testComponent.selected = new Date(2016, MAR, 10);
            fixture.detectChanges();

            const selectedEl = yearViewNativeElement.querySelector('.hc-calendar-body-selected');
            expect(selectedEl).toBeNull();
        });

        it('fires selected change event on cell clicked', () => {
            const cellEls = yearViewNativeElement.querySelectorAll('.hc-calendar-body-cell');
            (cellEls[cellEls.length - 1] as HTMLElement).click();
            fixture.detectChanges();

            const selectedEl = yearViewNativeElement.querySelector('.hc-calendar-body-selected')!;
            expect(selectedEl.innerHTML.trim()).toBe('DEC');
        });

        it('should emit the selected month on cell clicked', () => {
            const cellEls = yearViewNativeElement.querySelectorAll('.hc-calendar-body-cell');

            (cellEls[cellEls.length - 1] as HTMLElement).click();
            fixture.detectChanges();

            const normalizedMonth: Date = fixture.componentInstance.selectedMonth;
            expect(normalizedMonth.getMonth()).toEqual(11);
        });

        it('should mark active date', () => {
            const cellEls = yearViewNativeElement.querySelectorAll('.hc-calendar-body-cell');
            expect((cellEls[0] as HTMLElement).innerText.trim()).toBe('JAN');
            expect(cellEls[0].classList).toContain('hc-calendar-body-active');
        });

        it('should allow selection of month with less days than current active date', () => {
            testComponent.date = new Date(2017, JUL, 31);
            fixture.detectChanges();

            expect(testComponent.yearView._monthSelected(JUN));
            fixture.detectChanges();

            const expectedDate = new Date(2017, JUN, 30);
            expectedDate.setHours(12);
            expect(testComponent.selected).toEqual(expectedDate);
        });

        describe('a11y', () => {
            describe('calendar body', () => {
                let calendarBodyEl: HTMLElement;
                let calendarInstance: StandardYearView;

                beforeEach(() => {
                    calendarInstance = fixture.componentInstance;
                    calendarBodyEl = fixture.debugElement.nativeElement.querySelector('.hc-calendar-body') as HTMLElement;
                    expect(calendarBodyEl).not.toBeNull();
                    dir.value = 'ltr';
                    fixture.componentInstance.date = new Date(2017, JAN, 5);
                    dispatchFakeEvent(calendarBodyEl, 'focus');
                    fixture.detectChanges();
                });

                it('should decrement month on left arrow press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, DEC, 5));

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, NOV, 5));
                });

                it('should increment month on left arrow press in rtl', () => {
                    dir.value = 'rtl';

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, FEB, 5));

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, MAR, 5));
                });

                it('should increment month on right arrow press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', RIGHT_ARROW);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, FEB, 5));

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', RIGHT_ARROW);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, MAR, 5));
                });

                it('should decrement month on right arrow press in rtl', () => {
                    dir.value = 'rtl';

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', RIGHT_ARROW);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, DEC, 5));

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', RIGHT_ARROW);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, NOV, 5));
                });

                it('should go up a row on up arrow press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', UP_ARROW);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2016, SEP, 5));

                    calendarInstance.date = new Date(2017, JUL, 1);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', UP_ARROW);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, MAR, 1));

                    calendarInstance.date = new Date(2017, DEC, 10);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', UP_ARROW);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, AUG, 10));
                });

                it('should go down a row on down arrow press', () => {
                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', DOWN_ARROW);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, MAY, 5));

                    calendarInstance.date = new Date(2017, JUN, 1);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', DOWN_ARROW);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, OCT, 1));

                    calendarInstance.date = new Date(2017, SEP, 30);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', DOWN_ARROW);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2018, JAN, 30));
                });

                it('should go to first month of the year on home press', () => {
                    calendarInstance.date = new Date(2017, SEP, 30);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', HOME);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, JAN, 30));

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', HOME);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, JAN, 30));
                });

                it('should go to last month of the year on end press', () => {
                    calendarInstance.date = new Date(2017, OCT, 31);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', END);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, DEC, 31));

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', END);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, DEC, 31));
                });

                it('should go back one year on page up press', () => {
                    calendarInstance.date = new Date(2016, FEB, 29);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_UP);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2015, FEB, 28));

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_UP);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2014, FEB, 28));
                });

                it('should go forward one year on page down press', () => {
                    calendarInstance.date = new Date(2016, FEB, 29);
                    fixture.detectChanges();

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_DOWN);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2017, FEB, 28));

                    dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_DOWN);
                    fixture.detectChanges();

                    expect(calendarInstance.date).toEqual(new Date(2018, FEB, 28));
                });
            });
        });
    });

    describe('year view with date filter', () => {
        let fixture: ComponentFixture<YearViewWithDateFilter>;
        let yearViewNativeElement: Element;

        beforeEach(() => {
            fixture = TestBed.createComponent(YearViewWithDateFilter);
            fixture.detectChanges();

            const yearViewDebugElement = fixture.debugElement.query(By.directive(YearViewComponent));
            yearViewNativeElement = yearViewDebugElement.nativeElement;
        });

        it('should disable months with no enabled days', () => {
            const cells = yearViewNativeElement.querySelectorAll('.hc-calendar-body-cell');
            expect(cells[0].classList).not.toContain('hc-calendar-body-disabled');
            expect(cells[1].classList).toContain('hc-calendar-body-disabled');
        });
    });
});

@Component({
    template: `
        <hc-year-view [(activeDate)]="date" [(selected)]="selected" (monthSelected)="selectedMonth = $event"></hc-year-view>
    `
})
class StandardYearView {
    date = new Date(2017, JAN, 5);
    selected = new Date(2017, MAR, 10);
    selectedMonth: Date;

    @ViewChild(YearViewComponent)
    yearView: YearViewComponent;
}

@Component({
    template: `
        <hc-year-view [activeDate]="activeDate" [dateFilter]="dateFilter"></hc-year-view>
    `
})
class YearViewWithDateFilter {
    activeDate = new Date(2017, JAN, 1);

    dateFilter(date: Date) {
        if (date.getMonth() === JAN) {
            return date.getDate() === 10;
        }
        if (date.getMonth() === FEB) {
            return false;
        }
        return true;
    }
}
