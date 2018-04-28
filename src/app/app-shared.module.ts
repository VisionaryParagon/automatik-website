import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { CookieModule } from 'ngx-cookie';

// Directives

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CookieModule.forRoot()
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CookieModule
  ]
})
export class AppSharedModule { }
