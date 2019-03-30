import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatExpansionModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';

import { AgmCoreModule } from '@agm/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCaretDown,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCircle,
  faEdit,
  faEye,
  faPlus,
  faSearch,
  faTimes,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faGooglePlusG,
  faInstagram,
  faLinkedinIn,
  faPinterest,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';

import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { CookieModule } from 'ngx-cookie';

// Directives
import { MaxValidatorDirective } from './directives/max-validator.directive';
import { MinValidatorDirective } from './directives/min-validator.directive';

// Icons for fontawesome library
library.add(faCaretDown);
library.add(faChevronDown);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faCircle);
library.add(faEdit);
library.add(faEye);
library.add(faPlus);
library.add(faSearch);
library.add(faTimes);
library.add(faTrashAlt);
library.add(faFacebookF);
library.add(faGooglePlusG);
library.add(faInstagram);
library.add(faLinkedinIn);
library.add(faPinterest);
library.add(faTwitter);

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDulYODon5z35TgZ6tJtghStK80807Lblg'
    }),
    FontAwesomeModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    CookieModule.forRoot()
  ],
  declarations: [
    MaxValidatorDirective,
    MinValidatorDirective
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    AgmCoreModule,
    FontAwesomeModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    CookieModule,
    MaxValidatorDirective,
    MinValidatorDirective
  ]
})
export class AppSharedModule { }
