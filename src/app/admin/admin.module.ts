import { NgModule } from '@angular/core';

// App Modules
import { AppSharedModule } from '../app-shared.module';
import { AdminRoutingModule } from './admin-routing.module';

// Components
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    AppSharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent
  ]
})
export class AdminModule { }
