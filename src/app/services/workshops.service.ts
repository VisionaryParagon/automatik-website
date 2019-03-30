import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Workshop, WorkshopEvent, WorkshopRegistration } from './classes';

@Injectable({
  providedIn: 'root'
})
export class WorkshopsService {
  workshopUrlRoot = environment.workshop;
  workshops: Workshop[] = [
    {
      title: 'MeetingMastery',
      meta_title: 'MeetingMastery',
      slug: 'meetingmastery',
      description: 'MeetingMastery is a two-day immersion that experientially teaches participants how to create and conduct highly effective meetings, presentations, and training/facilitation events.',
      keywords: 'MeetingMastery, meeting, mastery, workshop, course',
      logo: 'https://assets.automatik.com/images/meetingmastery-logo-wht.png',
      title_image_lg: 'https://assets.automatik.com/images/meetingmastery-header-bg-2560.jpg',
      title_image_md: 'https://assets.automatik.com/images/meetingmastery-header-bg-1440.jpg',
      title_image_sm: 'https://assets.automatik.com/images/meetingmastery-header-bg-900.jpg',
      color: '#a40025',
      order: 1,
      subhead: '<h3>What is MeetingMastery?</h3><h4>MeetingMastery is a two-day immersion that experientially teaches participants how to create and conduct highly effective meetings, presentations, and training/facilitation events.</h4>',
      highlights: [
        {
          image: 'https://assets.automatik.com/images/meetingmastery-highlight-1.jpg',
          content: '<h3>MeetingMastery FOUNDATION: PARTICIPANT ENGAGEMENT</h3><p>Engagement is a meeting participant’s feeling of being “involved” in an activity, process, or relationship. As participants become more engaged in meeting experiences, outcomes are optimized.</p>'
        },
        {
          image: 'https://assets.automatik.com/images/meetingmastery-highlight-2.jpg',
          content: '<h3>HIGH-LEVEL COURSE STRUCTURE:</h3><h4>Day 1</h4><ul class="list-unstyled"><li>+ Mandatory breakfast mixer.</li><li>+ Immersion session.</li><li>+ Evening homework.</li></ul><h4>Day 2</h4><ul class="list-unstyled"><li>+ Content application.</li><li>+ Skill practice.</li><li>+ Individual coaching.</li></ul>'
        },
        {
          image: 'https://assets.automatik.com/images/meetingmastery-highlight-3.jpg',
          content: '<h3>PRIMARY THEMES:</h3><ul><li>Meeting Leaders are in charge of every detail.</li><li>Everything Meeting Leaders do/say must be with the mindset: “It’s always about my participants.”</li><li>Adults learn best by immersion and respond positively to it.</li></ul>'
        },
        {
          image: 'https://assets.automatik.com/images/meetingmastery-highlight-4.jpg',
          content: '<h3>MAJOR CONTENT COVERED:</h3><ul><li>Defining and dissecting training tensions and GoZones®.</li><li>Understanding interactions within the framework of DiSC personality profiles.</li><li>Effective ways to positively influence participant attitudes.</li><li>Participants retain more when they teach themselves and each other.</li><li>Budget-friendly ways to enhance the classroom environment.</li><li>Elevating peer-to-peer dynamics with effective icebreakers, work team assignments, and more.</li><li>Improving meeting leader personal communication: whisker words, body posture, voice control, and content mastery.</li><li>Enhancing content retention: effective visuals, color choices, experiential activities, music use, and more.</li></ul>'
        },
        {
          image: 'https://assets.automatik.com/images/meetingmastery-highlight-5.jpg',
          content: '<h3>THE OUTCOME:</h3><p>Participants depart from the experience changed. They’re equipped with a radically new perspective and tools which help them maximize participant engagement.</p>'
        }
      ],
      quotes: [
        {
          quote: 'The program transformed my way of thinking about training. It gave me the tools I needed to go back and transform our programs to an experience that is purposeful and engaging.',
          client: 'Amanda R.'
        },
        {
          quote: 'The MeetingMastery experience is hands-down the most creative, unique, and applicable training I have been to. The quality level of the content, facilitation, and experience exceeded expectations. Thank you for the opportunity to learn and participate!',
          client: 'Kimberlee M.'
        },
        {
          quote: 'A beginning, intermediate, and advanced immersion in facilitation and meeting leadership principles—accessible and motivational to all levels of expertise.',
          client: 'Jon L.'
        },
        {
          quote: 'MeetingMastery is a paradigm-shifting experience that highlights the ways in which you pay attention to the details of participants, environment, presenters, and the content. It shows you how to incorporate all of these elements into how you communicate information and make presentations to others.',
          client: 'Oye W.'
        }
      ]
    },
    {
      title: 'PreMeetingMastery',
      meta_title: 'PreMeetingMastery',
      slug: 'premeetingmastery',
      description: 'PreMeetingMastery is a half-day immersion that experientially teaches participants how to mitigate some of the most common meeting and training tensions.',
      keywords: 'PreMeetingMastery, meeting, mastery, workshop, course',
      logo: 'https://assets.automatik.com/images/premeetingmastery-logo-wht.png',
      title_image_lg: 'https://assets.automatik.com/images/premeetingmastery-header-bg-2560.jpg',
      title_image_md: 'https://assets.automatik.com/images/premeetingmastery-header-bg-1440.jpg',
      title_image_sm: 'https://assets.automatik.com/images/premeetingmastery-header-bg-900.jpg',
      color: '#a40025',
      order: 5,
      subhead: '<h3>What is PreMeetingMastery?</h3><h4>PreMeetingMastery is a half-day immersion that experientially teaches participants how to mitigate some of the most common meeting and training tensions.</h4>',
      highlights: [
        {
          image: 'https://assets.automatik.com/images/premeetingmastery-highlight-1.jpg',
          content: '<h3>PreMeetingMastery FOUNDATION: TENSION MITIGATION</h3><p>By identifying the tensions that exist in every meeting and training experience, participants can learn how to prepare for maximum audience engagement by mitigating those tensions.</p>'
        },
        {
          image: 'https://assets.automatik.com/images/premeetingmastery-highlight-2.jpg',
          content: '<h3>PRIMARY THEMES:</h3><ul><li>Maximizing engagement is the key to tension mitigation.</li><li>Meeting Leaders are in charge of every detail.</li><li>It’s not about the you, it’s all about the participant.</li></ul>'
        },
        {
          image: 'https://assets.automatik.com/images/premeetingmastery-highlight-3.jpg',
          content: '<h3>MAJOR CONTENT COVERED:</h3><ul><li>Identifying and dissecting training tensions.</li><li>Budget-friendly ways to enhance the learning environment.</li><li>Enhancing learning through the effective use of music, visuals, and activities.</li><li>Understanding group dynamics and how they affect engagement.</li><li>Effective ways to positively influence participant attitudes.</li><li>Improving meeting leader personal communication.</li><li>Elevating peer-to-peer dynamics through purposeful experiences.</li></ul>'
        }
      ],
      quotes: []
    },
    {
      title: 'MeetingMasteryToo',
      meta_title: 'MeetingMasteryToo',
      slug: 'meetingmasterytoo',
      description: 'MeetingMasteryToo is a one-day follow-up experience to MeetingMastery that reinforces what participants learned in the first course and offers additional opportunities to refine their presentation skills through group practice.',
      keywords: 'MeetingMastery, meeting, mastery, workshop, course',
      logo: 'https://assets.automatik.com/images/meetingmasterytoo-logo-wht.png',
      title_image_lg: 'https://assets.automatik.com/images/meetingmasterytoo-header-bg-2560.jpg',
      title_image_md: 'https://assets.automatik.com/images/meetingmasterytoo-header-bg-1440.jpg',
      title_image_sm: 'https://assets.automatik.com/images/meetingmasterytoo-header-bg-900.jpg',
      color: '#a40025',
      order: 2,
      subhead: '<h3>What is MeetingMasteryToo?</h3><h4>MeetingMasteryToo is a one-day follow-up experience to MeetingMastery that reinforces what participants learned in the first course and offers additional opportunities to refine their presentation skills through group practice.</h4>',
      highlights: [
        {
          image: 'https://assets.automatik.com/images/meetingmasterytoo-highlight-1.jpg',
          content: '<h3>MeetingMasteryToo FOUNDATION: PERFECT PRACTICE</h3><p>By offering another opportunity to put learned skills into practice in a positive, structured environment, key behaviors are reinforced and become a more natural part of a participant’s professional “repertoire.”</p>'
        },
        {
          image: 'https://assets.automatik.com/images/meetingmasterytoo-highlight-2.jpg',
          content: '<h3>HIGH-LEVEL COURSE STRUCTURE:</h3><ul class="list-unstyled"><li>+ Mandatory breakfast mixer.</li><li>+ Content refresher.</li><li>+ Individual practice and coaching.</li></ul>'
        },
        {
          image: 'https://assets.automatik.com/images/meetingmasterytoo-highlight-3.jpg',
          content: '<h3>PRIMARY THEMES:</h3><ul><li>Meeting Leaders must “own” their environment.</li><li>People learn best when we honor the way their brains are designed to receive and retain information.</li><li>Repetition and reinforcement are key elements of long-term retention.</li><li>Improving meeting leader personal communication.</li><li>Elevating peer-to-peer dynamics through purposeful experiences.</li></ul>'
        },
        {
          image: 'https://assets.automatik.com/images/meetingmasterytoo-highlight-4.jpg',
          content: '<h3>MAJOR CONTENT COVERED:</h3><ul><li>OYE (Own Your Environment).</li><li>GoZones® revisited and reinforced.</li><li>The neuroscience of learning and what it tells us about how to maximize engagement and retention.</li><li>Practical applications for how to structure meetings and activities to achieve optimal impact.</li><li>Effective ways to positively influence participant attitudes.</li><li>Presentation skills practice, expert coaching, and refinement.</li></ul>'
        },
        {
          image: 'https://assets.automatik.com/images/meetingmasterytoo-highlight-5.jpg',
          content: '<h3>THE OUTCOME:</h3><p>Participants depart from this experience CONFIDENT. The tools and skills they gained in MeetingMastery have been further honed and their overall presentation “game” is significantly improved.</p>'
        }
      ],
      quotes: [
        {
          quote: 'MeetingMasteryToo is a safe environment to continue honing skills. Critiques are offered in a supporting way.',
          client: 'Kathy P.'
        },
        {
          quote: 'This experience is extremely rewarding and invigorating. What was learned can be applied immediately to my job.',
          client: 'Mike D.'
        },
        {
          quote: 'I can’t believe how quickly I went back to old habits. This was a perfect refresh and reminder of things I need to continue to work on.',
          client: 'Ryan H.'
        },
        {
          quote: 'An amazing opportunity to hone the skills we learned in the first course and practice in a safe environment.',
          client: 'Kate E.'
        }
      ]
    },
    {
      title: 'ProWorkplaceEtiquette',
      meta_title: 'ProWorkplaceEtiquette',
      slug: 'pro-workplace-etiquette',
      description: 'ProWorkplaceEtiquette is a full-day, live workshop that equips participants with workplace best practices and helps them elevate their professional game.',
      keywords: 'ProWorkplaceEtiquette, meeting, mastery, workshop, course',
      logo: 'https://assets.automatik.com/images/pro-workplace-etiquette-logo-wht.png',
      title_image_lg: 'https://assets.automatik.com/images/pro-workplace-etiquette-header-bg-2560.jpg',
      title_image_md: 'https://assets.automatik.com/images/pro-workplace-etiquette-header-bg-1440.jpg',
      title_image_sm: 'https://assets.automatik.com/images/pro-workplace-etiquette-header-bg-900.jpg',
      color: '#6699cc',
      order: 3,
      subhead: '<h3>What is Pro<span>Workplace</span>Etiquette?</h3><h4><strong>Pro</strong>Workplace<strong>Etiquette</strong> is a full-day, live workshop that equips participants with workplace best practices and helps them elevate their professional game.</h4>',
      highlights: [
        {
          image: 'https://assets.automatik.com/images/pro-workplace-etiquette-highlight-1.jpg',
          content: '<p>Work. When thinking about the forty or fifty hours a week you put in, you realize it consumes most your waking hours. It’s only natural that you occasionally reflect on how things are going:</p><p>Do you have the right skills for the tasks that come your way?</p><p>Are you connecting well with the people who are your clients, peers, bosses, and those you may supervise?</p><p>How are you perceived?</p>'
        },
        {
          image: 'https://assets.automatik.com/images/pro-workplace-etiquette-highlight-2.jpg',
          content: '<h3>Pro<span>Workplace</span>Etiquette HELPS YOU:</h3><ul><li>Become aware of how your personality and behavioral style impacts others and their perception of you. Learn how to adjust your approach for more successful interactions with people whose styles differ from yours.</li><li>Understand the perspectives of the different generations in your workplace. You’ll gain usable strategies for working more effectively with colleagues of all different ages.</li><li>Write emails that are more succinct and effective and display a more professional style.</li><li>Communicate more clearly and impactfully when talking face to face with clients, peers, bosses, and those you supervise.</li></ul><p>Anyone can take ProWorkplaceEtiquette and benefit. We especially recommend it to people who are relatively new to the professional workforce... and to those who supervise them.</p>'
        }
      ],
      quotes: []
    },
    {
      title: 'PowerPowerPoint',
      meta_title: 'PowerPowerPoint',
      slug: 'power-powerpoint',
      description: 'PowerPowerPoint is a combined half-day 101 and full-day 102 workshop intensive for anyone looking to learn foundational PowerPoint skills, useful shortcuts and hacks, and general design principles that will help turn them into a “Power” PowerPoint user.',
      keywords: 'PowerPowerPoint, power, powerpoint, workshop, course',
      logo: 'https://assets.automatik.com/images/powerpowerpoint-logo-wht.png',
      title_image_lg: 'https://assets.automatik.com/images/powerpowerpoint-header-bg-2560.jpg',
      title_image_md: 'https://assets.automatik.com/images/powerpowerpoint-header-bg-1440.jpg',
      title_image_sm: 'https://assets.automatik.com/images/powerpowerpoint-header-bg-900.jpg',
      color: '#d81e00',
      order: 4,
      subhead: '<h3>What is PowerPowerPoint?</h3><h4>PowerPowerPoint is a combined half-day 101 and full-day 102 workshop intensive for anyone looking to learn foundational PowerPoint skills, useful shortcuts and hacks, and general design principles that will help turn them into a “Power” PowerPoint user.</h4>',
      highlights: [
        {
          image: 'https://assets.automatik.com/images/powerpowerpoint-highlight-1.jpg',
          content: '<h3>WHY PowerPowerPoint?</h3><p>Have you ever struggled to create a compelling visual presentation? Are you tired of using generic PowerPoint templates and slide masters? Do want to learn how to create slides like a pro? Then this workshop is for you!</p><p>Our PowerPowerPoint workshop has been designed with the perfect mix of practical tips, design theory, hands-on practice, and one-on-one coaching necessary to give you the skills and confidence to design presentations like a seasoned expert.</p>'
        },
        {
          image: 'https://assets.automatik.com/images/powerpowerpoint-highlight-2.jpg',
          content: '<h3>PowerPowerPoint ADVANTAGES:</h3><ul><li>Instructor-led</li><li>Strategic learning path</li><li>Practical skills focus</li><li>Hands-on, customized learning approach</li><li>Nearly 30 years of industry experience</li><li>Trusted by the world’s best</li></ul>'
        },
        {
          image: 'https://assets.automatik.com/images/powerpowerpoint-highlight-3.jpg',
          content: '<h3>TARGET AUDIENCE:</h3><ul><li>Leaders and Managers</li><li>Speakers, Presenters and Facilitators</li><li>Sales and Marketing Professionals</li><li>Analysts and Engineers</li><li>High School and College Students</li></ul>'
        }
      ],
      quotes: []
    }
  ].sort((a, b) => {
    return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
  });
  events: WorkshopEvent[] = [
    {
      workshop: 'MeetingMastery',
      price: 1500,
      start_date: new Date('March 31, 2019'),
      end_date: new Date('April 1, 2019'),
      location: {
        name: 'Location Name',
        address: '123 1st St',
        city: 'Phoenix',
        state: 'AZ',
        zip: '85034'
      },
      schedule: [
        {
          start: new Date('March 31, 2019 8:00 AM UTC-0700'),
          end: new Date('March 31, 2019 4:00 PM UTC-0700')
        },
        {
          start: new Date('April 1, 2019 8:00 AM UTC-0700'),
          end: new Date('April 1, 2019 4:00 PM UTC-0700')
        }
      ]
    },
    {
      workshop: 'MeetingMastery',
      price: 1500,
      start_date: new Date('April 15, 2019'),
      end_date: new Date('April 16, 2019'),
      location: {
        name: 'Location Name 2',
        address: '123 2nd St',
        city: 'Blahville',
        state: 'CA',
        zip: '12345'
      },
      schedule: [
        {
          start: new Date('April 15, 2019 8:00 AM UTC-0700'),
          end: new Date('April 15, 2019 4:00 PM UTC-0700')
        },
        {
          start: new Date('April 16, 2019 8:00 AM UTC-0700'),
          end: new Date('April 16, 2019 4:00 PM UTC-0700')
        }
      ]
    },
    {
      workshop: 'PreMeetingMastery',
      price: 500,
      start_date: new Date('April 14, 2019'),
      end_date: new Date('April 14, 2019'),
      location: {
        name: 'Location Name 2',
        address: '123 2nd St',
        city: 'Blahville',
        state: 'CA',
        zip: '12345'
      },
      schedule: [
        {
          start: new Date('April 14, 2019 8:00 AM UTC-0700'),
          end: new Date('April 14, 2019 12:00 PM UTC-0700')
        }
      ]
    },
    {
      workshop: 'MeetingMasteryToo',
      price: 1000,
      start_date: new Date('April 17, 2019'),
      end_date: new Date('April 17, 2019'),
      location: {
        name: 'Location Name 2',
        address: '123 2nd St',
        city: 'Blahville',
        state: 'CA',
        zip: '12345'
      },
      schedule: [
        {
          start: new Date('April 17, 2019 8:00 AM UTC-0700'),
          end: new Date('April 17, 2019 4:00 PM UTC-0700')
        }
      ]
    },
    {
      workshop: 'ProWorkplaceEtiquette',
      price: 1000,
      start_date: new Date('March 11, 2019'),
      end_date: new Date('March 11, 2019'),
      location: {
        name: 'Location Name',
        address: '123 1st St',
        city: 'Phoenix',
        state: 'AZ',
        zip: '85034'
      },
      schedule: [
        {
          start: new Date('March 11, 2019 8:00 AM UTC-0700'),
          end: new Date('March 11, 2019 4:00 PM UTC-0700')
        }
      ]
    },
    {
      workshop: 'ProWorkplaceEtiquette',
      price: 1000,
      start_date: new Date('April 2, 2019'),
      end_date: new Date('April 2, 2019'),
      location: {
        name: 'Location Name 3',
        address: '123 1st St',
        city: 'New York',
        state: 'NY',
        zip: '12345'
      },
      schedule: [
        {
          start: new Date('April 2, 2019 8:00 AM UTC-0700'),
          end: new Date('April 2, 2019 4:00 PM UTC-0700')
        }
      ]
    },
    {
      workshop: 'PowerPowerPoint',
      price: 1000,
      start_date: new Date('May 1, 2019'),
      end_date: new Date('May 1, 2019'),
      location: {
        name: 'Location Name',
        address: '123 1st St',
        city: 'Phoenix',
        state: 'AZ',
        zip: '85034'
      },
      schedule: [
        {
          start: new Date('May 1, 2019 8:00 AM UTC-0700'),
          end: new Date('May 1, 2019 4:00 PM UTC-0700')
        }
      ]
    }
  ].filter(event => new Date(event.start_date) > new Date()).sort((a, b) => {
    const aDate = new Date(a.start_date);
    const bDate = new Date(b.start_date);
    return aDate < bDate ? -1 : aDate > bDate ? 1 : 0;
  });

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Add new workshop
  createWorkshop(workshop) {
    return this.http.post<Workshop>(this.workshopUrlRoot + 'workshops/new', workshop)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Get all workshops
  getWorkshops() {
    return this.workshops;
    /*
    return this.http.get<Workshop[]>(this.workshopUrlRoot + 'workshops')
      .pipe(
        retry(3),
        tap(res => this.workshops = res.sort((a, b) => {
          return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
        })),
        catchError(this.handleError)
      );
    */
  }

  // Get one workshop
  getWorkshop(workshop) {
    return this.http.get<Workshop>(this.workshopUrlRoot + 'workshops/' + workshop._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Update workshop
  updateWorkshop(workshop) {
    return this.http.put<Workshop>(this.workshopUrlRoot + 'workshops/' + workshop._id, workshop)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Delete workshop
  deleteWorkshop(workshop) {
    return this.http.delete(this.workshopUrlRoot + 'workshops/' + workshop._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Add new workshop event
  createWorkshopEvent(event) {
    return this.http.post<WorkshopEvent>(this.workshopUrlRoot + 'workshop-events/new', event)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Get all workshop events
  getWorkshopEvents() {
    return this.events;
    /*
    return this.http.get<WorkshopEvent[]>(this.workshopUrlRoot + 'workshop-events')
      .pipe(
        retry(3),
        tap(res => this.events = res.filter(event => new Date(event.start_date) > new Date()).sort((a, b) => {
          const aDate = new Date(a.start_date);
          const bDate = new Date(b.start_date);
          return aDate < bDate ? -1 : aDate > bDate ? 1 : 0;
        })),
        catchError(this.handleError)
      );
    */
  }

  // Get one workshop event
  getWorkshopEvent(event) {
    return this.http.get<WorkshopEvent>(this.workshopUrlRoot + 'workshop-events/' + event._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Update workshop event
  updateWorkshopEvent(event) {
    return this.http.put<WorkshopEvent>(this.workshopUrlRoot + 'workshop-events/' + event._id, event)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Delete workshop event
  deleteWorkshopEvent(event) {
    return this.http.delete(this.workshopUrlRoot + 'workshop-events/' + event._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Add new registrant
  createRegistrant(registrant) {
    return this.http.post<WorkshopRegistration>(this.workshopUrlRoot + 'workshop-registrants/new', registrant)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Get all registrants
  getRegistrants() {
    return this.http.get<WorkshopRegistration[]>(this.workshopUrlRoot + 'workshop-registrants')
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Get one registrant
  getRegistrant(registrant) {
    return this.http.get<WorkshopRegistration>(this.workshopUrlRoot + 'workshop-registrants/' + registrant._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Update registrant
  updateRegistrant(registrant) {
    return this.http.put<WorkshopRegistration>(this.workshopUrlRoot + 'workshop-registrants/' + registrant._id, registrant)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Delete registrant
  deleteRegistrant(registrant) {
    return this.http.delete(this.workshopUrlRoot + 'workshop-registrants/' + registrant._id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Process Payment
  processPayment(data) {
    return this.http.post<any>(this.workshopUrlRoot + 'workshop-payments/create', data)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (isPlatformBrowser(this.platformId)) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.message}`);
      }
    } else {
      console.log(error);
    }
    // return an observable with a user-facing error message
    return throwError(
      'An error occurred; please try again later.');
  }
}
