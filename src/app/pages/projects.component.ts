import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <section class="card section" *ngIf="data()?.projects?.length">
      <h2>Projects</h2>
      <div class="grid">
        <div class="card" *ngFor="let p of data()?.projects">
          <h3>{{ p.name }} <small class="muted">— {{ p.client }}</small></h3>
          <div class="muted">{{ p.duration }}</div>
          <p>{{ p.description }}</p>
          <div class="chips">
            <span class="chip" *ngFor="let t of p.stack">{{ t }}</span>
          </div>
          <ul>
            <li *ngFor="let r of p.responsibilities">{{ r }}</li>
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