import { Component, OnInit } from '@angular/core';
import { NgFor, NgStyle } from '@angular/common';
import { ResumeService } from '../resume.service';
import { HighlightSkillDirective } from '../highlight-skill.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor, HighlightSkillDirective, NgStyle],
  template: `
    <section class="card section animate-fade-in">
      <h2 class="animate-fade-in-left">Skills</h2>
      
      <!-- Featured Skills with Progress Bars -->
      <div class="featured-skills" style="margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1rem; color: var(--accent);">Core Expertise</h3>
        <div class="skill-item animate-fade-in animate-stagger" *ngFor="let skill of featuredSkills">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
            <span>{{ skill.name }}</span>
            <span class="muted">{{ skill.level }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" [ngStyle]="{'--progress-width': skill.level + '%'}"></div>
          </div>
        </div>
      </div>

      <!-- All Skills Chips -->
      <div class="chips">
        <span class="chip animate-fade-in animate-stagger animate-float" 
              style="animation-delay: var(--delay)"
              [style.--delay]="(i * 0.1) + 's'"
              *ngFor="let skill of data()?.skills; let i = index" 
              [appHighlightSkill]="skill">{{ skill }}</span>
      </div>
      <small class="muted animate-fade-in">Core skills are outlined and floating.</small>
    </section>
  `,
  styles: [`
    .skill-item {
      margin-bottom: 1rem;
    }
    .featured-skills h3 {
      margin: 0;
      font-size: 1.1rem;
    }
  `]
})
export class SkillsComponent implements OnInit {
  featuredSkills = [
    { name: 'Angular/TypeScript', level: 95 },
    { name: 'Java/Spring Boot', level: 90 },
    { name: 'Python/Django', level: 85 },
    { name: 'AWS/Cloud', level: 80 },
    { name: 'Database Design', level: 88 },
    { name: 'DevOps/CI-CD', level: 75 }
  ];

  constructor(private resume: ResumeService) {}
  
  ngOnInit() {
    // Trigger animations on load
    setTimeout(() => {
      const elements = document.querySelectorAll('.animate-stagger');
      elements.forEach((el, index) => {
        (el as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      });
    }, 100);
  }
  
  get data() { return this.resume.data; }
}