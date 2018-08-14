import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

import { Seo } from './classes';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private defaultMetadata: Seo = {
    title: 'Eradicating boring corporate events from the face of the Earth | automätik',
    metatags: [
      {
        name: 'description',
        content: 'automätik is a certified woman-owned business committed to eradicating boring corporate events, training, and elearning from the face of the earth.'
      },
      {
        name: 'keywords',
        content: 'Corporate Events, Meeting master, sales training'
      }
    ]
  };

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) { }

  public addSeoData() {
    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationEnd) {
        let root = this.router.routerState.snapshot.root;
        while (root) {
          if (root.children && root.children.length) {
            root = root.children[0];
          } else if (root.data && root.data['title']) {
            this.titleService.setTitle(root.data['title']);

            const tags = root.data.metatags;

            for (const tag of tags) {
              if (this.metaService.getTag('name="' + tag.name + '"')) {
                this.metaService.updateTag({ name: tag.name, content: tag.content });
              } else {
                this.metaService.addTag({ name: tag.name, content: tag.content });
              }
            }

            return;
          } else {
            this.titleService.setTitle(this.defaultMetadata.title);

            const tags = this.defaultMetadata.metatags;

            for (const tag of tags) {
              if (this.metaService.getTag('name="' + tag.name + '"')) {
                this.metaService.updateTag({ name: tag.name, content: tag.content });
              } else {
                this.metaService.addTag({ name: tag.name, content: tag.content });
              }
            }

            return;
          }
        }
      }
    });
  }

  addDynamicSeoData(metadata?) {
    if (metadata) {
      this.titleService.setTitle(metadata.title);

      const tags = metadata.metatags;

      for (const tag of tags) {
        if (this.metaService.getTag('name="' + tag.name + '"')) {
          this.metaService.updateTag({ name: tag.name, content: tag.content });
        } else {
          this.metaService.addTag({ name: tag.name, content: tag.content });
        }
      }
    } else {
      this.titleService.setTitle(this.defaultMetadata.title);

      const tags = this.defaultMetadata.metatags;

      for (const tag of tags) {
        if (this.metaService.getTag('name="' + tag.name + '"')) {
          this.metaService.updateTag({ name: tag.name, content: tag.content });
        } else {
          this.metaService.addTag({ name: tag.name, content: tag.content });
        }
      }
    }
  }
}
