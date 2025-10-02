import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="card section animate-fade-in">
      <h2 class="animate-fade-in-left">Experience</h2>
      <div class="grid">
        <div class="card animate-fade-in animate-stagger animate-glow" *ngFor="let exp of data()?.experience">
          <h3 class="animate-fade-in-left">{{ exp.company }} <small class="muted">({{ exp.year }})</small></h3>
          <ul>
            <li class="animate-fade-in animate-stagger" *ngFor="let h of exp.highlights">{{ h }}</li>
          </ul>
        </div>
      </div>
    </section>
  `
})
export class ExperienceComponent {
  constructor(private resume: ResumeService) {}
  get data() { return this.resume.data; }
}