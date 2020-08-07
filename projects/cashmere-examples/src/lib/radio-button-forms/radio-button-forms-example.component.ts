import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 * @title Inline Radio Buttons using Form Controls
 */
@Component({
    selector: 'hc-radio-button-forms-example',
    templateUrl: 'radio-button-forms-example.component.html'
})
export class RadioButtonFormsExampleComponent implements OnInit {
    favoriteShow: string | null;
    shows = ['Silicon Valley', 'Game of Thrones', 'Better Call Saul'];

    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            favoriteTvShow: [null, Validators.required]
        });
    }

    reset(): void {
        this.favoriteShow = null;
    }

    submitReactive(): void {
        // this should cause validations to run
    }

    resetReactive(): void {
        this.form.patchValue({'favoriteTvShow': null});
    }
}
