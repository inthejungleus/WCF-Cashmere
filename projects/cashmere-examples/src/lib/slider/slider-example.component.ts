import {Component, OnInit} from '@angular/core';
import {CheckboxChangeEvent, HcSliderChange} from '@wcf-insurance/cashmere';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'hc-slider-example',
    templateUrl: './slider-example.component.html',
    styleUrls: ['./slider-example.component.scss']
})
export class SliderExampleComponent implements OnInit {

    formGroupValueCopy: FormGroupValueExample;

    /**
     * Config Values
     */
    min = 20;
    max = 70;
    disabled = false;

    /** Basic Slider Example **/
    basicSliderValue = 33;
    basicSliderValueCopy = this.basicSliderValue;

    /** Slider With Min/Max Labels Example **/
    basicExampleBindingToValueOfInputChangeEvent: number = 56;
    basicBindingExampleValueOfInputChangeCopy = this.basicExampleBindingToValueOfInputChangeEvent;

    /** Basic Form Slider Example **/
    formExampleStartingValue: number = 23;
    formExampleUserInputEventOutputValue: number;

    /** Slider with HCFormField Example **/
    formExampleWithHCFormFieldValue = 30;

    sliderFormGroup: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {

        /**
         * Basic form via form builder
         */
        this.sliderFormGroup = this.fb.group({
            slider: [this.formExampleStartingValue],
            sliderWithHCFormField: [this.formExampleWithHCFormFieldValue, [Validators.min(23)]]
        });

        /**
         * Example subscription on form to watch form value changes. Value is also available in the form group object.
         */
        this.sliderFormGroup.valueChanges.subscribe((value) => {
            console.log('Value Change: ', value);
        });

        this.formGroupValueCopy = this.sliderFormGroup.value;
    }

    /**
     * Example handling of input change on a standalone slider with no form involvement
     */
    updateBasicBindingExampleInputValue(event: HcSliderChange) {
        this.basicExampleBindingToValueOfInputChangeEvent = event.value;
    }

    /**
     * Example handling of input change on a form based slider
     */
    updateFormExampleInputValue(event: HcSliderChange) {
        this.formExampleUserInputEventOutputValue = event.value;
    }

    disableClicked(event: CheckboxChangeEvent) {
        this.disabled = event.checked;
        if (event.checked) {
            this.sliderFormGroup.disable();
        } else {
            this.sliderFormGroup.enable();
        }
    }

    reset() {
        // Basic Reset
        this.basicSliderValue = this.basicSliderValueCopy;
        this.basicExampleBindingToValueOfInputChangeEvent = this.basicBindingExampleValueOfInputChangeCopy;

        // Form Group Reset
        this.sliderFormGroup.setValue(this.formGroupValueCopy);
        this.sliderFormGroup.markAsPristine();
        this.sliderFormGroup.markAsUntouched();
    }
}

export interface FormGroupValueExample {
    slider: number;
    sliderWithHCFormField: number;
}
