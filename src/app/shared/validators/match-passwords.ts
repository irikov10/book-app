import { FormGroup, ValidatorFn } from "@angular/forms";


export function matchPasswords(passwordOne: string, passwordTwo: string): ValidatorFn {
    return (control) => {
        const group = control as FormGroup;
        const passOne = group.get(passwordOne);
        const passTwo = group.get(passwordTwo);

        return passOne?.value === passTwo?.value ? null : { matchPasswords: true }
    }
}