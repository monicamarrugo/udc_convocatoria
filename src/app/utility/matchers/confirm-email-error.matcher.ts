import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class ConfirmEmailErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const controlInvalid = !!(control && control.invalid && (control.touched || (form && form.submitted)));
    const parentInvalid = !!(control && control.parent && control.parent.hasError('emailMismatch')
                             && (control.touched || (form && form.submitted)));
    return controlInvalid || parentInvalid;
  }
}