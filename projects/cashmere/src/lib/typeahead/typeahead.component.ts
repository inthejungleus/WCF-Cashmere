import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DoCheck,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnInit,
    Optional,
    Output,
    QueryList,
    Renderer2,
    Self,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {TypeaheadItemComponent} from './typeahead-item/typeahead-item.component';
import {HcFormControlComponent} from '../form-field/hc-form-control.component';
import {parseBooleanAttribute} from '../util';
import {DOCUMENT} from '@angular/common';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
    selector: 'hc-typeahead',
    templateUrl: './typeahead.component.html',
    styleUrls: ['./typeahead.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{provide: HcFormControlComponent, useExisting: forwardRef(() => TypeaheadComponent)}]
})
export class TypeaheadComponent extends HcFormControlComponent implements OnInit, AfterContentInit, ControlValueAccessor, DoCheck {

    private DIRECTION = {
        UP: 'up',
        DOWN: 'down'
    };

    // keycodes that we don't want to debounce
    private IGNORE_DEBOUNCE = [13, 27, 38, 40];

    _searchTerm: FormControl;
    _resultPanelHidden = true;

    public _value = '';
    private _form: NgForm | FormGroupDirective | null;

    /** Number of characters required before the typehead will begin searching */
    @Input()
    minChars = 1;

    /** Placeholder text for the input box of the typeahead */
    @Input()
    placeholder = '';

    /** DebounceTime is the amount of time to delay between keystrokes before emitting the valueChange event for the input */
    @Input()
    debounceTime: number = 500;

    /** Toggle to show and hide the searching filter to give user feedback */
    @Input()
    showSpinner: boolean = false;

    /** Event emitted after each key stroke in the typeahead box (after minChars requirement has been met) */
    @Output()
    valueChange: EventEmitter<any> = new EventEmitter<any>();

    /** Event emitted when an option is selected from the list of typeahead results */
    @Output()
    optionSelected: EventEmitter<any> = new EventEmitter<any>();

    /** Event emitted when the user hits enter and there is not an option selected (or no results available yet) */
    @Output()
    emptyOptionSelected: EventEmitter<any> = new EventEmitter<any>();

    /** Event emitted when the input box of the typeahead loses focus */
    @Output()
    blur: EventEmitter<any> = new EventEmitter<any>();

    @ContentChildren(TypeaheadItemComponent)
    _options: QueryList<TypeaheadItemComponent>;

    @ViewChild('input') _inputRef: ElementRef;
    @ViewChild('results') _resultPanel: ElementRef;

    _optionSubscriptions: Array<Subscription> = new Array<Subscription>();

    constructor(
        private _elementRef: ElementRef,
        private renderer: Renderer2,
        private cd: ChangeDetectorRef,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        @Optional() @Inject(DOCUMENT) private _document: any,
        @Optional()
        @Self()
        public _ngControl: NgControl
    ) {
        super();

        this._form = _parentForm || _parentFormGroup;
        if (this._ngControl != null) {
            this._ngControl.valueAccessor = this;
        }
    }

    ngOnInit() {
        this._searchTerm = new FormControl(this._value);
        this._resultPanelHidden = true;
        document.body.addEventListener('click', this.handleClick.bind(this));

        // add subscription and debouncer for value changing in input field
        fromEvent(this._inputRef.nativeElement, 'keyup').pipe(
            map((event: any) => {
                // handle any keystrokes before debouncing to avoid delay (such as arrow keys)
                this._handleKeystrokes(event);
                return event;
            }),
            debounceTime(this.debounceTime),
            distinctUntilChanged()
        ).subscribe(event => {
            // we only want to run this on the kecodes that
            // are not part of the IGNORE_DEBOUNCE
            if (!this.IGNORE_DEBOUNCE.includes(event.keyCode)) {
                this._filterData(event.target.value);
            }
        });
    }

    ngAfterContentInit() {
        this._options.changes.subscribe(() => {
            this._optionSubscriptions.forEach(subscription => {
                subscription.unsubscribe();
            });

            this._optionSubscriptions = new Array<Subscription>();

            this.listenForSelection();
            setTimeout(() => {
                    this.setHighlighted(0, true, true);
                }
            );
        });
    }

    private handleClick(event) {
        const clickTarget = event.target as HTMLElement;
        let clickedTypeahead = false;

        // open results panel on click
        if (clickTarget === this._inputRef.nativeElement) {
            if (this._resultPanelHidden === true) {
                this._resultPanelHidden = false;
                this.valueChange.emit('');
                clickedTypeahead = true;
            } else {
                clickedTypeahead = true;
            }
        }

        // check if results exist
        if (this._resultPanel) {
            if (clickTarget === this._resultPanel.nativeElement ||
                this._resultPanel.nativeElement.contains(clickTarget)) {
                clickedTypeahead = true;
            }
        }

        // if the click was not in the typeahead then close the results panel
        if (!clickedTypeahead) {
            this.hideResultPanel();
        }
    }


    private listenForSelection() {
        this._options.toArray().forEach(option => {
            const sub = option._selected.subscribe(() => {
                this.itemSelectedDefault(option.value);
            });

            this._optionSubscriptions.push(sub);
        });
    }

    _stopPropogation($event: any) {
        $event.preventDefault();
        $event.stopPropagation();
    }

    _handleTabKey($event: any) {
        this.hideResultPanel();
    }

    _filterData(value: string) {
        if (value.length === 0) {
            this.valueChange.emit('');
        }
        if (value.length >= this.minChars && value !== this._value) {
            if (this._resultPanelHidden) {
                this.showResultPanel();
            }

            this._markAsDirty();
            this.onTouched();

            this.valueChange.emit(value);
        }
    }

    _handleKeystrokes($event: any) {
        if ($event.keyCode === 27) {
            // handle esc key
            this.hideResultPanel();
        } else if ($event.keyCode === 40) {
            // handle arrow down
            if (this._resultPanelHidden) {
                this.showResultPanel();
            } else {
                this.changeHighlighted(this.DIRECTION.DOWN);
                this.scrollTop();
            }
        } else if ($event.keyCode === 38) {
            // handle arrow up
            if (!this._resultPanelHidden) {
                this.changeHighlighted(this.DIRECTION.UP);
                this.scrollTop();
            }
        } else if ($event.keyCode === 13) {
            // handle enter key
            this._stopPropogation($event);

            let theSelection = this._options.toArray()[this._getHighlightedIndex()];
            if (theSelection) {
                this.itemSelectedDefault(theSelection.value);
            } else {
                this.emptyOptionSelected.emit(this._inputRef.nativeElement.value);
            }
        }
    }

    private scrollTop() {
        if (this._resultPanel) {
            this._resultPanel.nativeElement.scrollTop = this.getOptionScrollPosition(34, 200);
        }
    }

    private getOptionScrollPosition(optionHeight: number, panelHeight: number): number {
        const currentScrollPosition = this._resultPanel.nativeElement.scrollTop;
        const optionOffset = this._getHighlightedIndex() * optionHeight;

        if (optionOffset < currentScrollPosition) {
            return optionOffset;
        }

        if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
            return Math.max(0, optionOffset - panelHeight + optionHeight);
        }

        return currentScrollPosition;
    }

    private showResultPanel() {
        this._resultPanelHidden = false;
        this._inputRef.nativeElement.focus();
    }

    private hideResultPanel() {
        this._resultPanelHidden = true;
    }

    private itemSelectedDefault(item) {
        this._markAsDirty();
        this.onTouched();
        this.hideResultPanel();
        this.optionSelected.emit(item);
    }

    private changeHighlighted(direction: string) {
        const currentHighlighted = this._getHighlightedIndex();
        if (direction === this.DIRECTION.DOWN && currentHighlighted < this._options.length - 1) {
            this.setHighlighted(currentHighlighted, false, false);
            this.setHighlighted(currentHighlighted + 1, true, false);
        } else if (direction === this.DIRECTION.UP && currentHighlighted > 0) {
            this.setHighlighted(currentHighlighted, false, false);
            this.setHighlighted(currentHighlighted - 1, true, false);
        }
    }

    private setHighlighted(index: number, highlighted: boolean, resetAll: boolean) {
        if (resetAll) {
            this._options.toArray().forEach((opt, ind) => {
                opt._highlighted = false;
            });
        }

        const option = this._options.toArray()[index];
        if (option) {
            option._highlighted = highlighted;
        }
    }

    private onChange(val: any) {
    }

    private onTouched() {
        this._markAsTouched();
    }

    _markAsDirty() {
        if (this._ngControl) {
            const control = this._ngControl.control;
            if (control) {
                control.markAsDirty();
            }
        }
    }

    _markAsTouched() {
        if (this._ngControl) {
            const control = this._ngControl.control;
            if (control) {
                control.markAsTouched();
            }
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(value: string): void {
        this._value = value;
        this.onChange(value);
        if (this._searchTerm) {
            this._searchTerm.setValue(value);
        }
    }

    /** Get or set the value of the select component */
    @Input()
    get value() {
        return this._value;
    }

    set value(val: string) {
        if (val !== this._value) {
            this.writeValue(val);
            this.onChange(val);
            this.onTouched();
        }
    }

    /** Enables or disables the component */
    @Input()
    get disabled(): boolean {
        if (this._ngControl && this._ngControl.disabled) {
            return this._ngControl.disabled;
        }
        return this._isDisabled;
    }

    set disabled(disabledVal) {
        this._isDisabled = parseBooleanAttribute(disabledVal);
    }

    /** Sets whether this is a required form element */
    @Input()
    get required(): boolean {
        return this._isRequired;
    }

    set required(requiredVal) {
        this._isRequired = parseBooleanAttribute(requiredVal);
    }

    ngDoCheck(): void {
        if (this._ngControl) {
            this._updateErrorState();
        }
    }

    private _updateErrorState() {
        const oldState = this._errorState;

        // TODO: this could be abstracted out as an @Input() if we need this to be configurable
        const newState = !!(
            this._ngControl &&
            this._ngControl.invalid &&
            (this._ngControl.touched || (this._form && this._form.submitted))
        );

        if (oldState !== newState) {
            this._errorState = newState;
        }

        /**
         * propagate error to input box so that the
         * red border will show up like other Cashmere
         * components
         */
        if (this._ngControl.invalid) {
            this._searchTerm.setErrors({errors: true});
        }
    }

    _blurHandler(event) {
        this._markAsTouched();
        this.hideResultPanel();
        this.blur.emit(event);
    }

    _getHighlightedIndex() {
        let foundIndex = 0;
        this._options.map((option, index) => {
            if (option._highlighted) {
                foundIndex = index;
            }
        });

        return foundIndex;
    }

    setFocus() {
        this._inputRef.nativeElement.focus();
        this._resultPanelHidden = false;
        this.valueChange.emit('');
    }
}
