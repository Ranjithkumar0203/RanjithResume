import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <section class="card section animate-fade-in">
      <h2 class="animate-fade-in-left">Experience</h2>
      <div class="timeline">
        <article class="experience-row animate-fade-in animate-stagger" *ngFor="let exp of data()?.experience">
          <div class="company-mark" aria-hidden="true">{{ initials(exp.company) }}</div>
          <div class="experience-body">
            <h3>{{ exp.position }}</h3>
            <div class="company">{{ exp.company }} <span class="muted" *ngIf="exp.employmentType">- {{ exp.employmentType }}</span></div>
            <div class="muted">{{ exp.year }} <span *ngIf="exp.duration">- {{ exp.duration }}</span></div>
            <div class="muted" *ngIf="exp.location">{{ exp.location }}</div>

            <ul *ngIf="exp.highlights?.length">
              <li *ngFor="let highlight of exp.highlights">{{ highlight }}</li>
            </ul>

            <div class="skill-line" *ngIf="exp.skillsLine">
              <span class="skill-icon">◇</span>
              <strong>{{ exp.skillsLine }}</strong>
            </div>
          </div>
        </article>
      </div>
    </section>
  `,
  styles: [`
    .timeline {
      display: grid;
    }
    .experience-row {
      display: grid;
      grid-template-columns: 44px 1fr;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(159, 176, 217, 0.18);
    }
    .experience-row:last-child {
      border-bottom: 0;
    }
    .company-mark {
      width: 44px;
      height: 44px;
      border-radius: 6px;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, rgba(124, 156, 255, 0.22), rgba(96, 165, 250, 0.08));
      color: var(--accent);
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0;
      line-height: 1;
      text-transform: uppercase;
    }
    .experience-body h3 {
      margin: 0 0 0.2rem;
      font-size: 1.05rem;
    }
    .company {
      color: var(--text);
      margin-bottom: 0.2rem;
    }
    ul {
      margin: 0.85rem 0 0 1rem;
      padding: 0;
    }
    li {
      margin: 0.25rem 0;
      line-height: 1.45;
    }
    .skill-line {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      margin-top: 0.7rem;
      color: var(--text);
      font-size: 0.92rem;
    }
    .skill-icon {
      color: var(--muted);
      font-size: 0.8rem;
    }
    @media (max-width: 640px) {
      .experience-row {
        grid-template-columns: 36px 1fr;
        gap: 0.75rem;
      }
      .company-mark {
        width: 36px;
        height: 36px;
        font-size: 0.62rem;
      }
    }
  `]
})
export class ExperienceComponent {
  constructor(private resume: ResumeService) {}
  get data() { return this.resume.data; }

  initials(company = ''): string {
    return company
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0])
      .join('')
      .toUpperCase();
  }
}
