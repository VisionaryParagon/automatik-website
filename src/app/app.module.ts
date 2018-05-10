import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App Modules
import { AppSharedModule } from './app-shared.module';
import { MainModule } from './main/main.module';
import { AppRoutingModule } from './app-routing.module';

// Services
import { GoogleAnalyticsEventsService } from './services/google-analytics-events.service';
import { SeoService } from './services/seo.service';

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
    GoogleAnalyticsEventsService,
    SeoService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
