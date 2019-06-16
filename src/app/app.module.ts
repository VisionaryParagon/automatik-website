import { NgModule } from '@angular/core';
import {
  BrowserModule,
  Meta,
  Title
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App Modules
import { AppSharedModule } from './app-shared.module';
import { MainModule } from './main/main.module';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppRoutingModule,
    AppSharedModule,
    BrowserModule.withServerTransition({appId: 'automatik-website'}),
    BrowserAnimationsModule,
    MainModule
  ],
  declarations: [
    AppComponent
  ],
  entryComponents: [
  ],
  providers: [
    Meta,
    Title
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
