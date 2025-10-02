import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <section class="card section animate-fade-in" *ngIf="data()?.projects?.length">
      <h2 class="animate-fade-in-left">Projects</h2>
      <div class="grid">
        <div class="card animate-fade-in animate-stagger animate-pulse" *ngFor="let p of data()?.projects">
          <h3 class="animate-fade-in-left">{{ p.name }} <small class="muted">— {{ p.client }}</small></h3>
          <div class="muted animate-fade-in">{{ p.duration }}</div>
          <p class="animate-fade-in">{{ p.description }}</p>
          <div class="chips">
            <span class="chip animate-fade-in animate-stagger animate-float" *ngFor="let t of p.stack">{{ t }}</span>
          </div>
          <ul>
            <li class="animate-fade-in animate-stagger" *ngFor="let r of p.responsibilities">{{ r }}</li>
          </ul>
        </div>
      </div>
    </section>
  `
})
export class ProjectsComponent {
  constructor(private resume: ResumeService) {}
  get data() { return this.resume.data; }
}