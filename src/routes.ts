import { Routes } from '@angular/router';
import { HomeComponent } from './app/pages/home.component';
import { SkillsComponent } from './app/pages/skills.component';
import { ExperienceComponent } from './app/pages/experience.component';
import { ProjectsComponent } from './app/pages/projects.component';
import { AutomationComponent } from './app/pages/automation.component';
import { EducationComponent } from './app/pages/education.component';
import { ContactComponent } from './app/pages/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home · Ranjith Kumar' },
  { path: 'skills', component: SkillsComponent, title: 'Skills · Ranjith Kumar' },
  { path: 'experience', component: ExperienceComponent, title: 'Experience · Ranjith Kumar' },
  { path: 'projects', component: ProjectsComponent, title: 'Projects · Ranjith Kumar' },
  { path: 'automation', component: AutomationComponent, title: 'Industrial Automation · Ranjith Kumar' },
  { path: 'education', component: EducationComponent, title: 'Education · Ranjith Kumar' },
  { path: 'contact', component: ContactComponent, title: 'Contact · Ranjith Kumar' },
  { path: '**', redirectTo: '' }
];