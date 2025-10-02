import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ResumeService } from './resume.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  providers: [ResumeService],
  template: `
    <!-- Floating Background Elements -->
    <div class="bg-elements">
      <div class="floating-element animate-float" style="top: 10%; left: 5%; animation-delay: 0s;"></div>
      <div class="floating-element animate-float" style="top: 20%; right: 10%; animation-delay: 2s;"></div>
      <div class="floating-element animate-float" style="bottom: 30%; left: 15%; animation-delay: 4s;"></div>
      <div class="floating-element animate-float" style="bottom: 15%; right: 5%; animation-delay: 6s;"></div>
    </div>

    <nav class="navbar">
      <div class="container inner">
        <a routerLink="/" routerLinkActive="active" class="animate-fade-in">Home</a>
        <div style="display:flex; gap:.25rem; flex-wrap:wrap">
          <a routerLink="/skills" routerLinkActive="active" class="animate-fade-in animate-stagger">Skills</a>
          <a routerLink="/experience" routerLinkActive="active" class="animate-fade-in animate-stagger">Experience</a>
          <a routerLink="/projects" routerLinkActive="active" class="animate-fade-in animate-stagger">Projects</a>
          <a routerLink="/automation" routerLinkActive="active" class="animate-fade-in animate-stagger">Automation</a>
          <a routerLink="/education" routerLinkActive="active" class="animate-fade-in animate-stagger">Education</a>
          <a routerLink="/contact" routerLinkActive="active" class="animate-fade-in animate-stagger">Contact</a>
        </div>
      </div>
    </nav>
    <div class="container" style="margin-top:1rem">
      <header class="header animate-fade-in">
        <div>
          <h1 class="animate-typing">{{ data()?.name }}</h1>
          <div class="muted animate-fade-in-left">{{ data()?.title }}</div>
        </div>
        <div class="header-actions">
          <a href="assets/resume-ranjith.pdf" 
             download="Ranjith-Resume.pdf" 
             class="download-btn animate-fade-in-right animate-pulse">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              <path d="M12,11L16,15H13V19H11V15H8L12,11Z"/>
            </svg>
            Download Resume
          </a>
          <div class="contact-info muted animate-fade-in-right" style="text-align:right">
            <div><a [href]="'mailto:'+data()?.email">{{ data()?.email }}</a></div>
            <div><a [href]="'tel:'+data()?.phone">{{ data()?.phone }}</a></div>
            <div>{{ data()?.location }}</div>
          </div>
        </div>
      </header>
      <router-outlet></router-outlet>
      <footer class="animate-fade-in">© {{ year() }} {{ data()?.name }} · Built with Angular 18</footer>
    </div>
  `,
  styles: [`
    .bg-elements {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    }
    .floating-element {
      position: absolute;
      width: 60px;
      height: 60px;
      background: radial-gradient(circle, rgba(124, 156, 255, 0.1), transparent);
      border-radius: 50%;
      opacity: 0.3;
    }
    .floating-element::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 30px;
      height: 30px;
      background: var(--accent);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.2;
    }
    .header-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 1rem;
    }
    .download-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, var(--accent), #60a5fa);
      color: white;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(124, 156, 255, 0.4);
      position: relative;
      overflow: hidden;
    }
    .download-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.5s ease;
    }
    .download-btn:hover::before {
      left: 100%;
    }
    .download-btn:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 8px 25px rgba(124, 156, 255, 0.6);
    }
    .download-btn svg {
      transition: transform 0.3s ease;
    }
    .download-btn:hover svg {
      transform: translateY(2px);
    }
    .contact-info {
      margin-top: 0.5rem;
    }
    @media (max-width: 768px) {
      .header-actions {
        align-items: center;
        text-align: center;
      }
      .contact-info {
        text-align: center !important;
      }
    }
  `]
})
export class AppComponent {
  readonly year = signal(new Date().getFullYear());
  constructor(private resume: ResumeService) {}
  get data() { return this.resume.data; }
}