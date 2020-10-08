import { FormGroup } from '@angular/forms';

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

// custom validator to check name of the category already exists (CREATE)
export function checkExistenceCatgNameValidator(controlName: string, categoryList: any[]) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        let existence = false;

        if (control.errors && !control.errors.exists) {
            // return if another validator has already found an error on the control
            return;
        }

        // set error on control if validation fails
        for (const catg of categoryList) {
            if (control.value.toLowerCase().trim() === catg.name.toLowerCase().trim()) {
                existence = true;
            }
        }

        if (existence === true) {
            control.setErrors({ exists: true });
        } else {
            control.setErrors(null);
        }
    };
}

// custom validator to check name of the category already exists (UPDATE)
export function checkExistenceCatgNameUpdateValidator(controlName: string, categoryList: any[], categoryName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        let existence = false;

        if (control.errors && !control.errors.exists) {
            // return if another validator has already found an error on the control
            return;
        }

        // set error on control if validation fails
        for (const catg of categoryList) {
            if (control.value.toLowerCase().trim() === categoryName.toLowerCase().trim()) {
                existence = false;
            } else if (control.value.toLowerCase().trim() === catg.name.toLowerCase().trim()) {
                existence = true;
            }
        }

        if (existence === true) {
            control.setErrors({ exists: true });
        } else {
            control.setErrors(null);
        }
    };
}
