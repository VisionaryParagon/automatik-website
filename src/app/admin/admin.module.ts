import { NgModule } from '@angular/core';

// App Modules
import { AppSharedModule } from '../app-shared.module';
import { AdminRoutingModule } from './admin-routing.module';

// Components
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

// Images
import { AdminImagesComponent } from './admin-images/admin-images.component';

// Portfolio
import { AdminPortfolioComponent } from './admin-portfolio/admin-portfolio.component';

// Team
import { AdminTeamComponent } from './admin-team/admin-team.component';

// Careers
import { AdminCareersComponent } from './admin-careers/admin-careers.component';

// Modal Components
import { ImageUploaderComponent } from '../modals/image-uploader/image-uploader.component';

@NgModule({
  imports: [
    AppSharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminImagesComponent,
    AdminPortfolioComponent,
    AdminTeamComponent,
    AdminCareersComponent
  ],
  entryComponents: [
    ImageUploaderComponent
  ]
})
export class AdminModule { }
