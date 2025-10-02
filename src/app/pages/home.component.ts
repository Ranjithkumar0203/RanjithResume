import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="card section">
      <h2>Summary</h2>
      <p class="muted" *ngFor="let s of data()?.summary">{{ s }}</p>
      <div class="chips">
        <span class="chip" *ngFor="let cert of data()?.certifications">{{ cert }}</span>
      </div>
    </section>
  `
})
export class HomeComponent {
  constructor(private resume: ResumeService) {}
  get data() { return this.resume.data; }
}