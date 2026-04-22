import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(resolve(root, 'src/assets/resume.json'), 'utf8'));
const outputPath = resolve(root, 'src/assets/resume-ranjith.pdf');
const tempDir = resolve(root, '.angular/resume-pdf');
const htmlPath = resolve(tempDir, 'resume.html');

mkdirSync(tempDir, { recursive: true });
writeFileSync(htmlPath, createResumeHtml(data), 'utf8');

const browser = findBrowser();
if (!browser) {
  throw new Error('Could not find Chrome or Edge for headless PDF generation.');
}

const result = spawnSync(browser, [
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  '--print-to-pdf-no-header',
  `--print-to-pdf=${outputPath}`,
  htmlPath
], { stdio: 'inherit' });

rmSync(tempDir, { recursive: true, force: true });

if (result.status !== 0) {
  throw new Error(`PDF generation failed with exit code ${result.status}.`);
}

console.log(`Generated ${outputPath}`);

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  ].filter(Boolean);

  return candidates.find(path => existsSync(path));
}

function createResumeHtml(resume) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(resume.name)} - Resume</title>
  <style>
    @page { size: A4; margin: 13mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: #172033;
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 10.4px;
      line-height: 1.35;
      background: #fff;
    }
    h1, h2, h3, p { margin: 0; }
    .header {
      border-bottom: 2px solid #2563eb;
      padding-bottom: 9px;
      margin-bottom: 12px;
      text-align: center;
    }
    h1 {
      color: #1d4ed8;
      font-size: 23px;
      font-weight: 750;
      line-height: 1.15;
    }
    .title {
      margin-top: 3px;
      color: #475569;
      font-size: 11px;
      font-weight: 600;
    }
    .contact {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 5px 13px;
      margin-top: 7px;
      color: #475569;
      font-size: 9.4px;
    }
    a { color: #1d4ed8; text-decoration: none; }
    .section {
      margin-top: 10px;
      break-inside: avoid;
    }
    .section-title {
      background: #2563eb;
      color: #fff;
      font-size: 10.2px;
      font-weight: 750;
      letter-spacing: .4px;
      padding: 4px 7px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .summary p {
      margin: 2px 0 2px 10px;
      position: relative;
    }
    .summary p::before {
      content: "";
      position: absolute;
      left: -8px;
      top: 6px;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #2563eb;
    }
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .skill {
      border: 1px solid #bfdbfe;
      background: #eff6ff;
      color: #1d4ed8;
      border-radius: 3px;
      padding: 2px 5px;
      font-size: 8.8px;
      font-weight: 600;
    }
    .item {
      margin-bottom: 7px;
      break-inside: avoid;
    }
    .row {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: baseline;
    }
    .company, .project-name, .degree {
      color: #1d4ed8;
      font-weight: 750;
    }
    .position {
      font-weight: 650;
      color: #1f2937;
      margin-top: 1px;
    }
    .period, .meta, .school, .field {
      color: #64748b;
      font-size: 9px;
    }
    ul {
      margin: 3px 0 0 13px;
      padding: 0;
    }
    li { margin: 1px 0; padding-left: 2px; }
    li::marker { color: #2563eb; }
    .project-description { margin-top: 2px; }
    .stack { color: #334155; margin-top: 2px; }
    .stack strong { color: #1d4ed8; }
  </style>
</head>
<body>
  <header class="header">
    <h1>${escapeHtml(resume.name)}</h1>
    <div class="title">${escapeHtml(resume.title)}</div>
    <div class="contact">
      <span>${escapeHtml(resume.location)}</span>
      <a href="mailto:${escapeHtml(resume.email)}">${escapeHtml(resume.email)}</a>
      <a href="tel:${escapeHtml(resume.phone)}">${escapeHtml(resume.phone)}</a>
      ${resume.linkedin ? `<a href="${escapeHtml(resume.linkedin)}">LinkedIn</a>` : ''}
      ${resume.website ? `<a href="${escapeHtml(resume.website)}">Portfolio</a>` : ''}
    </div>
  </header>

  <section class="section summary">
    <div class="section-title">Professional Summary</div>
    ${resume.summary.map(item => `<p>${escapeHtml(item)}</p>`).join('')}
  </section>

  <section class="section">
    <div class="section-title">Technical Skills</div>
    ${resume.skill_categories?.length ? resume.skill_categories.map(group => `
      <div class="item">
        <div class="company">${escapeHtml(group.category)}</div>
        <div class="skills">${group.items.map(skill => `<span class="skill">${escapeHtml(skill)}</span>`).join('')}</div>
      </div>`).join('') : ''}
    <div class="skills">${resume.skills.map(skill => `<span class="skill">${escapeHtml(skill)}</span>`).join('')}</div>
  </section>

  <section class="section">
    <div class="section-title">Professional Experience</div>
    ${resume.experience.map(exp => `
      <div class="item">
        <div class="row">
          <div class="company">${escapeHtml(exp.company)}</div>
          <div class="period">${escapeHtml([exp.year, exp.duration].filter(Boolean).join(' - '))}</div>
        </div>
        ${exp.position ? `<div class="position">${escapeHtml([exp.position, exp.employmentType].filter(Boolean).join(' | '))}</div>` : ''}
        ${exp.location ? `<div class="period">${escapeHtml(exp.location)}</div>` : ''}
        <ul>${exp.highlights.map(highlight => `<li>${escapeHtml(highlight)}</li>`).join('')}</ul>
        ${exp.skillsLine ? `<div class="stack"><strong>Skills:</strong> ${escapeHtml(exp.skillsLine)}</div>` : ''}
      </div>`).join('')}
  </section>

  <section class="section">
    <div class="section-title">Projects</div>
    ${resume.projects.map(project => `
      <div class="item">
        <div class="project-name">${escapeHtml(project.name)}</div>
        <div class="meta">${escapeHtml([project.client, project.duration].filter(Boolean).join(' | '))}</div>
        <div class="project-description">${escapeHtml(project.description)}</div>
        ${project.stack?.length ? `<div class="stack"><strong>Tech Stack:</strong> ${escapeHtml(project.stack.join(', '))}</div>` : ''}
        ${project.responsibilities?.length ? `<ul>${project.responsibilities.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
      </div>`).join('')}
  </section>

  ${resume.certifications?.length ? `
    <section class="section">
      <div class="section-title">Certifications</div>
      <ul>${resume.certifications.map(cert => `<li>${escapeHtml(cert)}</li>`).join('')}</ul>
    </section>` : ''}

  ${resume.education?.length ? `
    <section class="section">
      <div class="section-title">Education</div>
      ${resume.education.map(education => `
        <div class="item">
          <div class="degree">${escapeHtml(education.degree)}</div>
          <div class="school">${escapeHtml(education.university)}</div>
          ${education.field ? `<div class="field">${escapeHtml(education.field)}</div>` : ''}
          ${education.year ? `<div class="field">${escapeHtml(education.year)}</div>` : ''}
        </div>`).join('')}
    </section>` : ''}

  ${resume.industrial_automation?.length ? `
    <section class="section">
      <div class="section-title">Industrial Automation</div>
      ${resume.industrial_automation.map(role => `
        <div class="item">
          <div class="row">
            <div class="company">${escapeHtml(role.employer)}</div>
            <div class="period">${escapeHtml(role.period)}</div>
          </div>
          <div class="position">${escapeHtml(role.role)}</div>
          <ul>${role.highlights.map(highlight => `<li>${escapeHtml(highlight)}</li>`).join('')}</ul>
        </div>`).join('')}
    </section>` : ''}

  ${resume.languages?.length ? `
    <section class="section">
      <div class="section-title">Languages</div>
      <div>${escapeHtml(resume.languages.join(', '))}</div>
    </section>` : ''}
</body>
</html>`;
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
