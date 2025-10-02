import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ResumeService } from '../resume.service';
import { HighlightSkillDirective } from '../highlight-skill.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor, HighlightSkillDirective],
  template: `
    <section class="card section">
      <h2>Skills</h2>
      <div class="chips">
        <span class="chip" *ngFor="let skill of data()?.skills" [appHighlightSkill]="skill">{{ skill }}</span>
      </div>
      <small class="muted">Core skills are outlined.</small>
    </section>
  `
})
export class SkillsComponent {
  constructor(private resume: ResumeService) {}
  get data() { return this.resume.data; }
}