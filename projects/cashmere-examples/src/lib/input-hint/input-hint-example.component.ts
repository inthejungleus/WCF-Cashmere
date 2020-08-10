import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

/**
 * @title Input Hint
 */
@Component({
  selector: 'hc-input-hint-example',
  templateUrl: './input-hint-example.component.html',
  styleUrls: ['./input-hint-example.component.scss']
})
export class InputHintExampleComponent {
    formDemo = new FormControl('', [Validators.email, Validators.required]);
}
