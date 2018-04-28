import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class SeoService {

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
            const tags = root.data['metatags'];
            for (const tag of Object.keys(tags)) {
              this.metaService.addTag({ name: tag, content: tags[tag] });
            }
            return;
          } else {
            return;
          }
        }
      }
    });
  }
}
