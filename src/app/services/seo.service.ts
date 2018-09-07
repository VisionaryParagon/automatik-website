import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

import { Seo } from './classes';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  defaultMetadata: Seo = {
    title: 'Eradicating boring corporate events from the face of the Earth | automätik',
    metatags: [
      {
        name: 'description',
        content: 'automätik is a certified woman-owned business committed to eradicating boring corporate events, training, and elearning from the face of the earth.'
      },
      {
        name: 'keywords',
        content: 'Corporate Events, Meeting master, sales training'
      },
      {
        property: 'og:title',
        content: 'Eradicating boring corporate events from the face of the Earth'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:url',
        content: 'https://beta.automatik9dots.com/'
      },
      {
        property: 'og:image',
        content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
      },
      {
        property: 'og:description',
        content: 'automätik is a certified woman-owned business committed to eradicating boring corporate events, training, and elearning from the face of the earth.'
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:site',
        content: '@automatikEvents'
      },
      {
        name: 'twitter:title',
        content: 'Eradicating boring corporate events from the face of the Earth'
      },
      {
        name: 'twitter:description',
        content: 'automätik is a certified woman-owned business committed to eradicating boring corporate events, training, and elearning from the face of the earth.'
      },
      {
        name: 'twitter:image:src',
        content: 'https://assets.automatik9dots.com/images/home-share-1200.jpg'
      }
    ]
  };

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) { }

  addSeoData() {
    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationEnd) {
        let root = this.router.routerState.snapshot.root;
        while (root) {
          if (root.children && root.children.length) {
            root = root.children[0];
          } else if (root.data && root.data['title']) {
            this.titleService.setTitle(root.data['title']);
            this.setTags(root.data.metatags);
            return;
          } else {
            this.addDynamicSeoData();
            return;
          }
        }
      }
    });
  }

  addDynamicSeoData(metadata?) {
    if (metadata) {
      this.titleService.setTitle(metadata.title);
      this.setTags(metadata.metatags);
    } else {
      this.titleService.setTitle(this.defaultMetadata.title);
      this.setTags(this.defaultMetadata.metatags);
    }
  }

  setTags(tags) {
    for (const tag of tags) {
      if (tag.name) {
        if (this.metaService.getTag('name="' + tag.name + '"')) {
          this.metaService.updateTag({ name: tag.name, content: tag.content });
        } else {
          this.metaService.addTag({ name: tag.name, content: tag.content });
        }
      } else {
        if (this.metaService.getTag('property="' + tag.property + '"')) {
          this.metaService.updateTag({ property: tag.property, content: tag.content });
        } else {
          this.metaService.addTag({ property: tag.property, content: tag.content });
        }
      }
    }
  }
}
