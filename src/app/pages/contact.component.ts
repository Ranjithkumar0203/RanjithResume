import { Component } from '@angular/core';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section class="card section animate-fade-in">
      <h2 class="animate-fade-in-left">Contact</h2>
      
      <div class="contact-grid">
        <div class="contact-info animate-fade-in animate-stagger">
          <h3>Get in Touch</h3>
          <p class="animate-fade-in animate-stagger">Email: <a [href]="'mailto:'+data()?.email">{{ data()?.email }}</a></p>
          <p class="animate-fade-in animate-stagger">Phone: <a [href]="'tel:'+data()?.phone">{{ data()?.phone }}</a></p>
          <p class="animate-fade-in animate-stagger">Location: {{ data()?.location }}</p>
        </div>
        
        <div class="download-section animate-fade-in-right">
          <h3>Download Resume</h3>
          <p class="muted">Get a copy of my complete resume</p>
          <a href="assets/resume-ranjith.pdf" 
             download="Ranjith-Resume.pdf" 
             class="download-card animate-pulse">
            <div class="download-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                <path d="M12,11L16,15H13V19H11V15H8L12,11Z"/>
              </svg>
            </div>
            <div>
              <div class="download-title">Download PDF Resume</div>
              <div class="download-subtitle">Complete professional resume</div>
            </div>
          </a>
        </div>
      </div>
      
      <div class="action-buttons animate-fade-in">
        <a [href]="'mailto:'+data()?.email+'?subject=Hello%20Ranjith&body=Hi%20Ranjith,'" 
           class="action-btn primary animate-fade-in animate-stagger">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C2.89,4 2,4.89 2,6"/>
          </svg>
          Send Email
        </a>
        <a [href]="'tel:'+data()?.phone" 
           class="action-btn secondary animate-fade-in animate-stagger">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
          </svg>
          Call Now
        </a>
      </div>
    </section>
  `,
  styles: [`
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    .contact-info h3, .download-section h3 {
      color: var(--accent);
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    .download-section {
      text-align: center;
    }
    .download-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: var(--card);
      border: 2px solid var(--accent);
      border-radius: 16px;
      text-decoration: none;
      color: var(--text);
      transition: all 0.3s ease;
      margin-top: 1rem;
    }
    .download-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(124, 156, 255, 0.4);
      border-color: #60a5fa;
    }
    .download-icon {
      width: 48px;
      height: 48px;
      background: var(--accent);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .download-title {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    .download-subtitle {
      font-size: 0.9rem;
      color: var(--muted);
    }
    .action-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
    }
    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .action-btn.primary {
      background: var(--accent);
      color: white;
    }
    .action-btn.secondary {
      background: var(--chip);
      color: var(--text);
      border: 1px solid var(--accent);
    }
    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(124, 156, 255, 0.3);
    }
    @media (max-width: 768px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
      .action-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class ContactComponent {
  constructor(private resume: ResumeService) {}
  get data() { return this.resume.data; }
}