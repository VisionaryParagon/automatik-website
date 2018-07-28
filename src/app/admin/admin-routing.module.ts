import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Admin Guards
import { AdminGuardService } from '../services/admin-guard.service';
import { AdminLoginGuardService } from '../services/admin-login-guard.service';

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

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent,
        canActivate: [AdminGuardService]
      },
      {
        path: 'login',
        component: AdminLoginComponent,
        canActivate: [AdminLoginGuardService]
      },
      {
        path: 'images',
        component: AdminImagesComponent,
        canActivate: [AdminGuardService]
      },
      {
        path: 'portfolio',
        component: AdminPortfolioComponent,
        canActivate: [AdminGuardService]
      },
      {
        path: 'team',
        component: AdminTeamComponent,
        canActivate: [AdminGuardService]
      },
      {
        path: 'careers',
        component: AdminCareersComponent,
        canActivate: [AdminGuardService]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/admin'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
