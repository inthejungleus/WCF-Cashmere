The address component is a form that is to be nested within another form. It is connected to the parent form with the `parentForm` property. The second address field is hidden by default but may be used with the `showAddressTwo` boolean property.
```html
<form [formGroup]="mainForm">
    <input hcInput formControlName="someInput" required>
    <input hcInput formControlName="anotherInput" required>
    <hc-address [parentForm]="mainForm" [showAddressTwo]="true"></hc-address>
</form>
```

The parent form group must provide the model for the fields found in the address component form. The property keys must be named `address, addressTwo, zip, city, state`

```html
  ngOnInit() {
      this.mainForm = this.fb.group({
          someInput: ['', Validators.required],
          anotherInput: [''],
          address: ['', Validators.required],
          addressTwo: [''],
          zip: ['', Validators.required],
          city: ['', Validators.required],
          state: ['']
      });
  }
```
