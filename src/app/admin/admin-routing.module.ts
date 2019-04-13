import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Admin Guards
import { AdminGuardService } from '../services/admin-guard.service';
import { AdminLoginGuardService } from '../services/admin-login-guard.service';

// Components
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

// Training
import { AdminTrainingComponent } from './admin-training/admin-training.component';
import { WorkshopsComponent } from './admin-training/workshops/workshops.component';
import { RegistrantsComponent } from './admin-training/registrants/registrants.component';

// Portfolio
import { AdminPortfolioComponent } from './admin-portfolio/admin-portfolio.component';

// Team
import { AdminTeamComponent } from './admin-team/admin-team.component';

// Careers
import { AdminCareersComponent } from './admin-careers/admin-careers.component';

// Images
import { AdminImagesComponent } from './admin-images/admin-images.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent,
        canActivate: [AdminGuardService],
        data: {
          title: 'automätik admin',
          metatags: [
            {
              name: 'robots',
              content: 'noindex,nofollow'
            }
          ]
        }
      },
      {
        path: 'login',
        component: AdminLoginComponent,
        canActivate: [AdminLoginGuardService],
        data: {
          title: 'automätik admin',
          metatags: [
            {
              name: 'robots',
              content: 'noindex,nofollow'
            }
          ]
        }
      },
      {
        path: 'training',
        component: AdminTrainingComponent,
        children: [
          {
            path: 'workshops',
            component: WorkshopsComponent,
            canActivate: [AdminGuardService],
            data: {
              title: 'automätik admin',
              metatags: [
                {
                  name: 'robots',
                  content: 'noindex,nofollow'
                }
              ]
            }
          },
          {
            path: 'registrants',
            component: RegistrantsComponent,
            canActivate: [AdminGuardService],
            data: {
              title: 'automätik admin',
              metatags: [
                {
                  name: 'robots',
                  content: 'noindex,nofollow'
                }
              ]
            }
          }
        ]
      },
      {
        path: 'portfolio',
        component: AdminPortfolioComponent,
        canActivate: [AdminGuardService],
        data: {
          title: 'automätik admin',
          metatags: [
            {
              name: 'robots',
              content: 'noindex,nofollow'
            }
          ]
        }
      },
      {
        path: 'team',
        component: AdminTeamComponent,
        canActivate: [AdminGuardService],
        data: {
          title: 'automätik admin',
          metatags: [
            {
              name: 'robots',
              content: 'noindex,nofollow'
            }
          ]
        }
      },
      {
        path: 'careers',
        component: AdminCareersComponent,
        canActivate: [AdminGuardService],
        data: {
          title: 'automätik admin',
          metatags: [
            {
              name: 'robots',
              content: 'noindex,nofollow'
            }
          ]
        }
      },
      {
        path: 'images',
        component: AdminImagesComponent,
        canActivate: [AdminGuardService],
        data: {
          title: 'automätik admin',
          metatags: [
            {
              name: 'robots',
              content: 'noindex,nofollow'
            }
          ]
        }
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
