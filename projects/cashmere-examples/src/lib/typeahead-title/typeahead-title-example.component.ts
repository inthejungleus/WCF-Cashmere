import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'hc-typeahead-title-example',
  templateUrl: './typeahead-title-example.component.html',
  styleUrls: ['./typeahead-title-example.component.scss']
})
export class TypeaheadTitleExampleComponent implements OnInit {

    initialValue: string = 'An example title';
    showTypeahead: boolean = false;

    form: FormGroup;
    filteredData: string[] = [];
    typeaheadData = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia'
    ];

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            item: ['']
        });
    }

    filterData(term) {
        this.setValue(term);
        if (term) {
            this.filteredData = this.typeaheadData.filter(item => item.toLowerCase().indexOf(term.toLowerCase()) > -1);
        } else {
            this.filteredData = this.typeaheadData;
        }
    }

    optionSelected(item) {
        this.setValue(item);
    }

    private setValue(item) {
        const control = this.form.get('item');
        if (control) {
            control.setValue(item);
        }
    }

}
