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
