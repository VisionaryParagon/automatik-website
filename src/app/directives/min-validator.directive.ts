import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, FormControl } from '@angular/forms';

@Directive({
  selector: '[minVal][formControlName],[minVal][formControl],[minVal][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinValidatorDirective, multi: true}]
})
export class MinValidatorDirective implements Validator {
  @Input() minVal: number;
  validate(c: FormControl): {[key: string]: any} {
    const v = c.value;
    return (v < this.minVal) ? {'minVal': true} : null;
  }
}
