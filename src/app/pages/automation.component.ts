import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-automation',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <section class="card section" *ngIf="data()?.industrial_automation?.length">
      <h2>Industrial Automation</h2>
      <div class="grid">
        <div class="card" *ngFor="let ia of data()?.industrial_automation">
          <h3>{{ ia.employer }} <small class="muted">({{ ia.period }})</small></h3>
          <ul>
            <li *ngFor="let h of ia.highlights">{{ h }}</li>
          </ul>
        </div>
      </div>
    </section>
  `
})
export class AutomationComponent {
  constructor(private resume: ResumeService) {}
  get data() { return this.resume.data; }
}