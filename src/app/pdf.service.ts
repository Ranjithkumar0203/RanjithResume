import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  generateResumePdf(resumeData: any): void {
    // Create HTML content for the PDF
    const htmlContent = this.createResumeHTML(resumeData);
    
    // Create a new window for printing
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) {
      alert('Please allow pop-ups to generate PDF');
      return;
    }
    
    // Write the HTML to the new window
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.focus();
      // Use print dialog to save as PDF
      printWindow.print();
      // Close the window after printing
      setTimeout(() => {
        printWindow.close();
      }, 100);
    };
  }

  private createResumeHTML(data: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${data.name} - Resume</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            line-height: 1.6;
            padding: 20px;
            background: white;
          }
          .container {
            max-width: 850px;
            margin: 0 auto;
            background: white;
            padding: 40px;
          }
          .header {
            border-bottom: 3px solid #007bff;
            margin-bottom: 25px;
            padding-bottom: 15px;
            text-align: center;
          }
          .header h1 {
            font-size: 32px;
            color: #007bff;
            margin-bottom: 5px;
            letter-spacing: 0.5px;
          }
          .header .subtitle {
            color: #555;
            font-size: 14px;
            margin-bottom: 10px;
            font-weight: 500;
          }
          .contact-info {
            font-size: 11px;
            color: #666;
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
          }
          .contact-info a {
            color: #007bff;
            text-decoration: none;
          }
          .section {
            margin-bottom: 20px;
            page-break-inside: avoid;
          }
          .section-title {
            font-size: 13px;
            font-weight: bold;
            color: white;
            background-color: #007bff;
            padding: 8px 12px;
            margin-bottom: 12px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }
          .summary {
            font-size: 11px;
            margin-bottom: 8px;
            line-height: 1.5;
            text-align: justify;
          }
          .summary::before {
            content: '▪ ';
            margin-right: 8px;
            color: #007bff;
          }
          .skill-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 10px;
          }
          .skill-tag {
            background-color: #e8f1ff;
            color: #007bff;
            padding: 4px 10px;
            border-radius: 3px;
            font-size: 10px;
            border: 1px solid #bdd7ee;
          }
          .experience-item {
            margin-bottom: 14px;
            page-break-inside: avoid;
            font-size: 11px;
          }
          .experience-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 3px;
          }
          .experience-company {
            color: #007bff;
            font-weight: bold;
          }
          .experience-position {
            font-weight: 600;
            color: #333;
          }
          .experience-period {
            color: #666;
            font-style: italic;
            font-size: 10px;
            margin-bottom: 5px;
          }
          .experience-highlights {
            margin-left: 15px;
            margin-top: 5px;
          }
          .experience-highlights li {
            margin: 3px 0;
            font-size: 10px;
            list-style-position: inside;
            line-height: 1.4;
          }
          .experience-highlights li::marker {
            color: #007bff;
          }
          .education-item {
            font-size: 11px;
            margin-bottom: 8px;
            page-break-inside: avoid;
          }
          .education-degree {
            font-weight: bold;
            color: #333;
          }
          .education-school {
            color: #007bff;
            font-weight: 500;
            font-size: 10px;
          }
          .education-field {
            color: #666;
            font-size: 10px;
            margin-top: 2px;
          }
          .cert-list {
            font-size: 11px;
            margin-left: 15px;
          }
          .cert-list li {
            margin: 3px 0;
            font-size: 10px;
          }
          .cert-list li::marker {
            color: #007bff;
          }
          .project-item {
            margin-bottom: 12px;
            page-break-inside: avoid;
            font-size: 11px;
          }
          .project-name {
            font-weight: bold;
            color: #333;
          }
          .project-meta {
            color: #666;
            font-style: italic;
            font-size: 10px;
            margin: 2px 0;
          }
          .project-description {
            margin-top: 3px;
            font-size: 10px;
            line-height: 1.4;
          }
          .project-stack {
            margin-top: 3px;
            font-size: 10px;
            color: #555;
          }
          .project-stack strong {
            color: #007bff;
          }
          .languages {
            font-size: 11px;
          }
          @media print {
            body {
              padding: 0;
              background: white;
            }
            .container {
              padding: 20px;
              max-width: 100%;
            }
            .section {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${this.escapeHtml(data.name)}</h1>
            <div class="subtitle">${this.escapeHtml(data.title)}</div>
            <div class="contact-info">
              <span>${this.escapeHtml(data.location)}</span>
              <a href="mailto:${this.escapeHtml(data.email)}">${this.escapeHtml(data.email)}</a>
              <a href="tel:${this.escapeHtml(data.phone)}">${this.escapeHtml(data.phone)}</a>
              ${data.linkedin ? `<a href="${this.escapeHtml(data.linkedin)}">LinkedIn</a>` : ''}
              ${data.website ? `<a href="${this.escapeHtml(data.website)}">Portfolio</a>` : ''}
            </div>
          </div>

          <div class="section">
            <div class="section-title">Professional Summary</div>
            ${data.summary.map((s: string) => `<div class="summary">${this.escapeHtml(s)}</div>`).join('')}
          </div>

          <div class="section">
            <div class="section-title">Technical Skills</div>
            ${data.skill_categories && data.skill_categories.length > 0 ? data.skill_categories.map((group: any) => `
              <div class="project-item">
                <div class="project-name">${this.escapeHtml(group.category)}</div>
                <div class="skill-list">
                  ${group.items.map((skill: string) => `<span class="skill-tag">${this.escapeHtml(skill)}</span>`).join('')}
                </div>
              </div>
            `).join('') : ''}
            <div class="skill-list">
              ${data.skills.map((skill: string) => `<span class="skill-tag">${this.escapeHtml(skill)}</span>`).join('')}
            </div>
          </div>

          ${data.experience && data.experience.length > 0 ? `
            <div class="section">
              <div class="section-title">Professional Experience</div>
              ${data.experience.map((exp: any) => `
                <div class="experience-item">
                  <div class="experience-header">
                    <span class="experience-company">${this.escapeHtml(exp.company)}</span>
                    <span class="experience-period">${this.escapeHtml([exp.year, exp.duration].filter(Boolean).join(' - '))}</span>
                  </div>
                  ${exp.position ? `<div class="experience-position">${this.escapeHtml([exp.position, exp.employmentType].filter(Boolean).join(' | '))}</div>` : ''}
                  ${exp.location ? `<div class="experience-period">${this.escapeHtml(exp.location)}</div>` : ''}
                  ${exp.highlights && exp.highlights.length > 0 ? `
                    <ul class="experience-highlights">
                      ${exp.highlights.map((h: string) => `<li>${this.escapeHtml(h)}</li>`).join('')}
                    </ul>
                  ` : ''}
                  ${exp.skillsLine ? `<div class="project-stack"><strong>Skills:</strong> ${this.escapeHtml(exp.skillsLine)}</div>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${data.projects && data.projects.length > 0 ? `
            <div class="section">
              <div class="section-title">Projects</div>
              ${data.projects.map((proj: any) => `
                <div class="project-item">
                  <div class="project-name">${this.escapeHtml(proj.name)}</div>
                  <div class="project-meta">${this.escapeHtml(proj.client || '')} ${proj.client && proj.duration ? '|' : ''} ${this.escapeHtml(proj.duration || '')}</div>
                  <div class="project-description">${this.escapeHtml(proj.description)}</div>
                  ${proj.stack && proj.stack.length > 0 ? `
                    <div class="project-stack"><strong>Tech Stack:</strong> ${this.escapeHtml(proj.stack.join(', '))}</div>
                  ` : ''}
                  ${proj.responsibilities && proj.responsibilities.length > 0 ? `
                    <ul class="experience-highlights">
                      ${proj.responsibilities.map((r: string) => `<li>${this.escapeHtml(r)}</li>`).join('')}
                    </ul>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${data.certifications && data.certifications.length > 0 ? `
            <div class="section">
              <div class="section-title">Certifications</div>
              <ul class="cert-list">
                ${data.certifications.map((cert: string) => `<li>${this.escapeHtml(cert)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${data.education && data.education.length > 0 ? `
            <div class="section">
              <div class="section-title">Education</div>
              ${data.education.map((edu: any) => `
                <div class="education-item">
                  <div class="education-degree">${this.escapeHtml(edu.degree)}</div>
                  <div class="education-school">${this.escapeHtml(edu.university)}</div>
                  ${edu.field ? `<div class="education-field">${this.escapeHtml(edu.field)}</div>` : ''}
                  ${edu.year ? `<div class="education-field">${this.escapeHtml(edu.year)}</div>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${data.industrial_automation && data.industrial_automation.length > 0 ? `
            <div class="section">
              <div class="section-title">Industrial Automation</div>
              ${data.industrial_automation.map((ia: any) => `
                <div class="experience-item">
                  <div class="experience-header">
                    <span class="experience-company">${this.escapeHtml(ia.employer)}</span>
                    <span class="experience-period">${this.escapeHtml(ia.period)}</span>
                  </div>
                  ${ia.role ? `<div class="experience-position">${this.escapeHtml(ia.role)}</div>` : ''}
                  ${ia.highlights && ia.highlights.length > 0 ? `
                    <ul class="experience-highlights">
                      ${ia.highlights.map((h: string) => `<li>${this.escapeHtml(h)}</li>`).join('')}
                    </ul>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${data.languages && data.languages.length > 0 ? `
            <div class="section">
              <div class="section-title">Languages</div>
              <div class="languages">${this.escapeHtml(data.languages.join(', '))}</div>
            </div>
          ` : ''}
        </div>
      </body>
      </html>
    `;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

