import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchService} from './search.service';
import {Item} from './item';

@Component({
    selector: 'hc-typeahead-fetch-example',
    templateUrl: './typeahead-fetch-example.component.html',
    styleUrls: ['./typeahead-fetch-example.component.scss']
})
export class TypeaheadFetchExampleComponent implements OnInit {

    form: FormGroup;
    filteredData: Item[] = [];
    selectedItem: Item;
    showSpinner: boolean = false;

    constructor(private fb: FormBuilder, private searchService: SearchService) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            item: ['']
        });
    }

    filterData(term) {
        this.setValue(term);
        if (term) {
            this.showSpinner = true;
            this.searchService.search(term).subscribe(items => {
                this.filteredData = items.data.items;
                this.showSpinner = false;
            });
        } else {
            this.filteredData = [];
        }
    }

    optionSelected(item: Item) {
        this.selectedItem = item;
        this.setValue(this.formatItem(item));
    }

    formatItem(item: Item): any {
        return item ? item.name : '';
    }

    private setValue(item: Item) {
        const control = this.form.get('item');
        if (control) {
            control.setValue(item);
        }
    }
}
