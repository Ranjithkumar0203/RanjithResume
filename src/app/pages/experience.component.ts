import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="card section">
      <h2>Experience</h2>
      <div class="grid">
        <div class="card" *ngFor="let exp of data()?.experience">
          <h3>{{ exp.company }} <small class="muted">({{ exp.year }})</small></h3>
          <ul>
            <li *ngFor="let h of exp.highlights">{{ h }}</li>
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