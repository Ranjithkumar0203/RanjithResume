import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { ResumeService } from '../resume.service';
import { HighlightSkillDirective } from '../highlight-skill.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor, NgIf, HighlightSkillDirective, NgStyle],
  template: `
    <section class="card section animate-fade-in">
      <h2 class="animate-fade-in-left">Skills</h2>
      
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

      <div class="skill-categories grid" *ngIf="data()?.skill_categories?.length">
        <div class="card skill-category animate-fade-in animate-stagger" *ngFor="let group of data()?.skill_categories">
          <h3>{{ group.category }}</h3>
          <div class="chips">
            <span class="chip" *ngFor="let item of group.items" [appHighlightSkill]="item">{{ item }}</span>
          </div>
        </div>
      </div>

      <div class="chips">
        <span class="chip animate-fade-in animate-stagger animate-float" 
              style="animation-delay: var(--delay)"
              [style.--delay]="(i * 0.1) + 's'"
              *ngFor="let skill of data()?.skills; let i = index" 
              [appHighlightSkill]="skill">{{ skill }}</span>
      </div>
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
    .skill-categories {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      margin-bottom: 1.5rem;
    }
    .skill-category h3 {
      color: var(--accent);
      margin-top: 0;
      font-size: 1rem;
    }
  `]
})
export class SkillsComponent implements OnInit {
  featuredSkills = [
    { name: 'Angular / TypeScript', level: 95 },
    { name: 'Node.js / FastAPI', level: 88 },
    { name: 'LangChain / LangGraph / RAG', level: 86 },
    { name: 'Micro Frontends / Module Federation', level: 86 },
    { name: 'WebSockets / Streaming Responses', level: 84 },
    { name: 'Azure DevOps / AWS', level: 80 }
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
