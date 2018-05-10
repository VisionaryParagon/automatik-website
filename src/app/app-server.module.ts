import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { CookieService, CookieBackendService } from 'ngx-cookie';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    { provide: CookieService, useClass: CookieBackendService }
  ]
})
export class AppServerModule {}
