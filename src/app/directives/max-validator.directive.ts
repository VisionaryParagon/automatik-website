import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, FormControl } from '@angular/forms';

@Directive({
  selector: '[maxVal][formControlName],[maxVal][formControl],[maxVal][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxValidatorDirective, multi: true}]
})
export class MaxValidatorDirective implements Validator {
  @Input() maxVal: number;
  validate(c: FormControl): {[key: string]: any} {
    const v = c.value;
    return (v > this.maxVal) ? {'maxVal': true} : null;
  }
}
