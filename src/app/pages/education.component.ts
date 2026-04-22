import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <section class="card section">
      <h2>Education & Languages</h2>
      <div class="grid">
        <div class="card" *ngFor="let ed of data()?.education">
          <strong>{{ ed.degree }}</strong>
          <div class="muted">{{ ed.university }}</div>
          <div class="muted">{{ ed.field }}</div>
          <div class="muted" *ngIf="ed.year">{{ ed.year }}</div>
        </div>
      </div>
      <h3>Languages</h3>
      <div class="chips">
        <span class="chip" *ngFor="let l of data()?.languages">{{ l }}</span>
      </div>
    </section>
  `
})
export class EducationComponent {
  constructor(private resume: ResumeService) {}
  get data() { return this.resume.data; }
}
