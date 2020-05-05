import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'hc-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

    addressControl;
    addressTwoControl;
    cityControl;
    zipControl;

    filteredData: string[] = [];

    statesData = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    @Input() parentForm: FormGroup;
    @Input() showAddressTwo: boolean;

    constructor() {}

    ngOnInit(): void {
        this.addressControl = this.parentForm.get('address');
        this.addressTwoControl = this.parentForm.get('addressTwo');
        this.cityControl = this.parentForm.get('city');
        this.zipControl = this.parentForm.get('zip');
    }

    filterData(term) {
        this.setValue(term);
        if (term) {
            this.filteredData = this.statesData.filter(state => state.toLowerCase().indexOf(term.toLowerCase()) > -1);
        } else {
            this.filteredData = this.statesData;
        }
    }

    optionSelected(state) {
        this.setValue(state);
    }

    private setValue(state) {
        const stateControl = this.parentForm.get('state');
        if (stateControl) {
            stateControl.setValue(state);
        }
    }

}
