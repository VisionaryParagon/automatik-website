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
  MatProgressSpinnerModule,
  MatTabsModule
} from '@angular/material';

import { CookieModule } from 'ngx-cookie';

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
    MatProgressSpinnerModule,
    MatTabsModule,
    CookieModule.forRoot()
  ],
  declarations: [
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
    MatProgressSpinnerModule,
    MatTabsModule,
    CookieModule
  ]
})
export class AppSharedModule { }
