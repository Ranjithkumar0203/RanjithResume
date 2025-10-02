import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ResumeService } from './resume.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  providers: [ResumeService],
  template: `
    <nav class="navbar">
      <div class="container inner">
        <a routerLink="/" routerLinkActive="active">Home</a>
        <div style="display:flex; gap:.25rem; flex-wrap:wrap">
          <a routerLink="/skills" routerLinkActive="active">Skills</a>
          <a routerLink="/experience" routerLinkActive="active">Experience</a>
          <a routerLink="/projects" routerLinkActive="active">Projects</a>
          <a routerLink="/automation" routerLinkActive="active">Automation</a>
          <a routerLink="/education" routerLinkActive="active">Education</a>
          <a routerLink="/contact" routerLinkActive="active">Contact</a>
        </div>
      </div>
    </nav>
    <div class="container" style="margin-top:1rem">
      <header class="header">
        <div>
          <h1>{{ data()?.name }}</h1>
          <div class="muted">{{ data()?.title }}</div>
        </div>
        <div class="muted" style="text-align:right">
          <div><a [href]="'mailto:'+data()?.email">{{ data()?.email }}</a></div>
          <div><a [href]="'tel:'+data()?.phone">{{ data()?.phone }}</a></div>
          <div>{{ data()?.location }}</div>
        </div>
      </header>
      <router-outlet></router-outlet>
      <footer>© {{ year() }} {{ data()?.name }} · Built with Angular 18</footer>
    </div>
  `
})
export class AppComponent {
  readonly year = signal(new Date().getFullYear());
  constructor(private resume: ResumeService) {}
  get data() { return this.resume.data; }
}