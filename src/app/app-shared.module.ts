import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
  MatTableModule,
  MatTabsModule
} from '@angular/material';

import { CookieModule } from 'ngx-cookie';

import { MaxValidatorDirective } from './directives/max-validator.directive';
import { MinValidatorDirective } from './directives/min-validator.directive';

// Directives

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
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
    MatDatepickerModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    CookieModule,
    MaxValidatorDirective,
    MinValidatorDirective
  ]
})
export class AppSharedModule { }
