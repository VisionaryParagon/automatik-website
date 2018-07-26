import { AnimationTriggerMetadata, animate, state, style, transition, trigger } from '@angular/animations';

// intro animations
export const IntroAnimation: AnimationTriggerMetadata =
  trigger('intro', [
    state('*', style({bottom: 0})),
    transition(':leave', [
      style({bottom: 0}),
      animate(500, style({bottom: '100vh'}))
    ])
  ]);

// mobile nav animations
export const MobileNavAnimation: AnimationTriggerMetadata =
  trigger('mobileNavMenu', [
    state('*', style({transform: 'translateX(0)'})),
    transition(':enter', [
      style({transform: 'translateX(100%)'}),
      animate(250, style({transform: 'translateX(0)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0)'}),
      animate(250, style({transform: 'translateX(100%)'}))
    ])
  ]);

// component transition animations
export const FadeAnimation: AnimationTriggerMetadata =
  trigger('fade', [
    state('*', style({opacity: 1})),
    transition(':enter', [
      style({opacity: 0}),
      animate('250ms 250ms', style({opacity: 1}))
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate(250, style({opacity: 0}))
    ])
  ]);

// quick fade animations
export const QuickFade: AnimationTriggerMetadata =
  trigger('quickFade', [
    state('*', style({opacity: 1})),
    transition(':enter', [
      style({opacity: 0}),
      animate('100ms 100ms', style({opacity: 1}))
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate(100, style({opacity: 0}))
    ])
  ]);

// top down animations
export const TopDownAnimation: AnimationTriggerMetadata =
  trigger('topDown', [
    state('*', style({height: '*', opacity: 1})),
    transition(':enter', [
      style({height: 0, opacity: 0}),
      animate(250, style({height: '*', opacity: 1}))
    ]),
    transition(':leave', [
      style({height: '*', opacity: 1}),
      animate(250, style({height: 0, opacity: 0}))
    ])
  ]);

// team bio animations
export const TeamBioAnimation: AnimationTriggerMetadata =
  trigger('teamBio', [
    state('*', style({opacity: 1, transform: 'translateX(0)'})),
    transition(':enter', [
      style({opacity: 0, transform: 'translateX(100%)'}),
      animate(500, style({opacity: 1, transform: 'translateX(0)'}))
    ]),
    transition(':leave', [
      style({opacity: 1, transform: 'translateX(0)'}),
      animate(500, style({opacity: 0, transform: 'translateX(-100%)'}))
    ])
  ]);
