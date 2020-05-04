import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddressComponent} from './address.component';

import {InputModule} from '../input/input.module';
import {FormFieldModule} from '../form-field/hc-form-field.module';
import {TypeaheadModule} from './../typeahead/typeahead.module';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

describe('AddressComponent', () => {
    let component: AddressComponent;
    let fixture: ComponentFixture<AddressComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [InputModule, FormFieldModule, TypeaheadModule, ReactiveFormsModule],
            declarations: [AddressComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddressComponent);
        component = fixture.componentInstance;
        component.parentForm = new FormGroup({
            address: new FormControl(),
            addressTwo: new FormControl(),
            city: new FormControl(),
            state: new FormControl(),
            zip: new FormControl()
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        // expect(component).toBeTruthy();
    });
});
