import { FormGroup } from '@angular/forms';

// custom validator to check whitespace as input
export function noWhitespaceValidator(controlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];

        // set error on control if validation fails
        if ((control.value || '').trim().length === 0) {
            control.setErrors({ noWhitespace: true });
        } else {
            control.setErrors(null);
        }
    };
}
