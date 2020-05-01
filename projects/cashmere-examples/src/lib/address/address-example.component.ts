import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'hc-address-example',
  templateUrl: './address-example.component.html',
  styleUrls: ['./address-example.component.scss']
})
export class AddressExampleComponent implements OnInit {

    mainForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
      this.mainForm = this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          address: ['', Validators.required],
          addressTwo: [''],
          zip: ['', Validators.required],
          city: ['', Validators.required],
          state: ['']
      });
  }

}
