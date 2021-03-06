import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProgressItem} from './progress-item.interface';
import {ProgressItemStatus} from './progress-item-status';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Component({
    selector: 'hc-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
    @Input() allowSkipAhead: boolean = true;
    @Input() height: string;
    @Input() breakPoint: string = '768';

    /**
     * Control whether the main color is $wcf-red (primary) or $wcf-blue (secondary). Default is primary.
     */
    @Input() progressBarStyle: string = 'primary';

    _fillColor = '#ba160a';

    private _showMobile: boolean = false;
    get showMobile() {
        return this._showMobile;
    }

    @Input() set showMobile(bool: boolean) {
        this._showMobile = bool;
    }

    private _items: ProgressItem[] = [];
    get items(): ProgressItem[] {
        return this._items;
    }

    @Input() set items(itemsList: ProgressItem[]) {
        if (itemsList && itemsList.length) {
            this._items = itemsList;
            const focusedIndex = this.findFocusedIndexFromItems(itemsList);

            if (focusedIndex > -1) {
                this.selectProgressItem(itemsList[focusedIndex], true);
            }
        } else {
            this._items = [];
        }
    }

    @Output() progressItemSelected = new EventEmitter<ProgressItem>();
    @Output() progressBarCompleted = new EventEmitter<boolean>();
    currentSelectedItem: ProgressItem;
    allItemsCompleted: boolean;
    dropdownVisible: boolean = false;

    // add enum to a component variable so it can be referenced in the template
    ProgressItemStatus = ProgressItemStatus;

    constructor(public breakpointObserver: BreakpointObserver) {
    }

    ngOnInit() {
        this.breakpointObserver
            .observe(['(max-width:' + this.breakPoint + 'px)'])
            .subscribe((state: BreakpointState) => {
                this.showMobile = state.matches;
            });

        this._fillColor = this.progressBarStyle === 'primary' ? '#ba160a' : '#406181';
    }

    /**
     * Finds the index of the focused item in the given array
     * @param items
     */
    findFocusedIndexFromItems(items: ProgressItem[]): number {
        let greatestIndex = -1;
        items.forEach((item, index) => {
            if (item.focused === true) {
                greatestIndex = index;
            }
        });
        return greatestIndex;
    }

    /**
     * Determines which item should be selected. Prefers the item after the last item to have been completed.
     */
    getNextItemToSelectFromItems(items: ProgressItem[], greatestCompletedItemIndex: number): ProgressItem {
        return greatestCompletedItemIndex < items.length - 1
            ? items[greatestCompletedItemIndex + 1] // get the first uncompleted item
            : items[greatestCompletedItemIndex]; // last completed is the last item left
    }

    selectProgressItem(itemToSelect: ProgressItem, emit: boolean): void {
        // TODO logic could be placed here to determine if navigation to this step is allowed by consuming component
        let previouslySelectedItem = this.currentSelectedItem;
        // Update progressItem entries to have proper focus
        let beforeSelected = true;
        this._items = this._items.map(item => {
            // Set clicked item as focused
            if (item.id === itemToSelect.id) {
                beforeSelected = false;
                this.currentSelectedItem = {...itemToSelect, focused: true};
                return this.currentSelectedItem;
            }

            // toggle whether the item should be red or not
            if (beforeSelected) {
                item.beforeSelected = true;
            } else {
                delete item.beforeSelected;
            }

            // unset focus on previously selected item
            if (previouslySelectedItem && item.id === previouslySelectedItem.id) {
                delete item.focused;
                return {...item};
            }
            // no change on other items
            return item;
        });
        if (emit) {
            this.progressItemSelected.emit(this.currentSelectedItem);
        }
    }

    /**
     * Mark the current item as completed and select the next uncompleted item
     */
    completeCurrent(): void {
        if (this.currentSelectedItem.status === ProgressItemStatus.COMPLETE) {
            return; // can't complete an already completed item
        }
        let nextUncompletedItem;
        let index = -1;
        let currentIndex = 0;
        this._items = this._items.map(item => {
            index++;
            let itemToReturn = item;
            if (item.id === this.currentSelectedItem.id) {
                itemToReturn = {...this.currentSelectedItem, status: ProgressItemStatus.COMPLETE};
                currentIndex = index;
            } else if (!nextUncompletedItem && item.status === ProgressItemStatus.INCOMPLETE) {
                nextUncompletedItem = item;
            }
            return itemToReturn;
        });
        if (currentIndex < this._items.length) {
            this.selectProgressItem(this._items[currentIndex + 1], true);
        } else {
            this.allItemsCompleted = true;
            this.progressBarCompleted.emit(true);
        }
    }

    itemClicked(item: ProgressItem): void {
        if (this._canNavigateTo(item)) {
            this.selectProgressItem(item, true);
            this.dropdownVisible = false;
        }
    }

    previousItem(): void {
        let itemIndex = this._items.indexOf(this.currentSelectedItem);
        if (itemIndex > 0) {
            this.selectProgressItem(this._items[itemIndex - 1], true);
        }
        this.dropdownVisible = false;
    }

    nextItem(): void {
        let itemIndex = this._items.indexOf(this.currentSelectedItem);
        if (itemIndex < this._items.length - 1) {
            this.selectProgressItem(this._items[itemIndex + 1], true);
        }
        this.dropdownVisible = false;
    }

    toggleItemDropdown(): void {
        this.dropdownVisible = !this.dropdownVisible;
    }

    _canNavigateTo(item: ProgressItem) {
        return item.focused || item.beforeSelected || this.allowSkipAhead || this._itemAndPredecessorsComplete(item);
    }

    private _itemAndPredecessorsComplete(item: ProgressItem) {
        if (item.status !== ProgressItemStatus.COMPLETE) {
            return false;
        }

        const index = this.items.findIndex(it => it.id === item.id);

        let allComplete = true;
        for (let i = index; i > 0; i--) {
            if (this.items[i].status !== ProgressItemStatus.COMPLETE) {
                allComplete = false;
            }
        }

        return allComplete;
    }
}
