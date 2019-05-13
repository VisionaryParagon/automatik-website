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

// About
import { AdminTeamComponent } from './admin-team/admin-team.component';
import { AdminCareersComponent } from './admin-careers/admin-careers.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';

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
        path: 'news',
        component: AdminNewsComponent,
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
