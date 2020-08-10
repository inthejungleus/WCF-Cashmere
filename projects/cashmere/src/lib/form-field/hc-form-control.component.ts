/** Wrapper component that textual form controls extend to work with hc-form-field */
export abstract class HcFormControlComponent {
    /** Whether the control should be displaying an associated error */
    _errorState: boolean = false;

    /** An error message to be shown in the UI when there is an error state present */
    _errorMessage: string = '';

    /** A hint to be shown in the UI when there is an error state present */
    _hintMessage: string = '';

    /** An object that represents the Angular validation errors that are present on the form */
    _errors: {
        [key: string]: any;
    } = {};

    /** An object that represents the hints that are present on the form */
    _hints: {
        [key: string]: any;
    } = {};

    /** Whether the control is disabled */
    _isDisabled: boolean = false;

    /** ID identifier of the the control */
    _componentId: string;

    /** Whether the control is required */
    _isRequired: boolean = false;
}
