import { FormGroup } from '@angular/forms';

// ----Validators----

// custom validator to check whitespace as input
export function noWhitespaceValidator(controlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];

        if (control.errors && !control.errors.noWhitespace) {
            // return if another validator has already found an error on the control
            return;
        }

        // set error on control if validation fails
        if ((control.value || '').trim().length === 0) {
            control.setErrors({ noWhitespace: true });
        } else {
            control.setErrors(null);
        }
    };
}

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}

// ----Functions----

// It takes the forst 10 characters of a dateString -> yyyy-MM-dd
export function dateSubstring_1_10(dateString: string) {
    return dateString.substring(0, 10);
}

// dateSTring to format dd/MM/yyyy
export function dateStringTo_dd_MM_yyyy(dateString: string) {
    const day = dateString.substring(8, 10);
    const month = dateString.substring(5, 7);
    const year = dateString.substring(0, 4);

    const newDateString = day + '/' + month + '/' + year;
    return newDateString;
}

// Transform dateString 'yyyy-MM-dd' to Date object
export function dateStringToDate(dateString: string) {
    const day = dateString.substring(8, 10);
    const month = dateString.substring(5, 7);
    const year = dateString.substring(0, 4);

    const dateObject = new Date(`${year}-${month}-${day}`);

    return dateObject;
}
