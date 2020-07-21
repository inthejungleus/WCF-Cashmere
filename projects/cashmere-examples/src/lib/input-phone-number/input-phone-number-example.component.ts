import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

/**
 * @title Input with Phone Number Formatting
 */
@Component({
    selector: 'hc-input-phone-number-example',
    templateUrl: 'input-phone-number-example.component.html',
    styleUrls: ['input-phone-number-example.component.scss']
})
export class InputPhoneNumberExampleComponent {

    formDemoPhone = new FormControl('', [Validators.required]);
    formDemoPhoneInitVal = new FormControl('801555123421', [Validators.required]);
    formDemoPhoneFormattedInitVal = new FormControl('(801) 555-1234 ext 21', [Validators.required]);
}
