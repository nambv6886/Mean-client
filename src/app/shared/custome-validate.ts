import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

export function forbiddenNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const regex = ['admin', 'manager'];
    const forbidden = regex.includes(control.value);
    return forbidden ? { 'forbiddenName': { value: control.value } } : null;
  };
}

export function MustMatch(controlName, matchingControlName) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    // return if another validator has already found
    // if (matchingControl.errors) {
    //   return;
    // }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true })
    } else {
      matchingControl.setErrors(null);
    }
  }
}
