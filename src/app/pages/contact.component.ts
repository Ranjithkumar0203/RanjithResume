import { Component } from '@angular/core';
import { ResumeService } from '../resume.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section class="card section">
      <h2>Contact</h2>
      <p>Email: <a [href]="'mailto:'+data()?.email">{{ data()?.email }}</a></p>
      <p>Phone: <a [href]="'tel:'+data()?.phone">{{ data()?.phone }}</a></p>
      <p>Location: {{ data()?.location }}</p>
      <p>
        <a [href]="'mailto:'+data()?.email+'?subject=Hello%20Ranjith&body=Hi%20Ranjith,'">Email me</a>
      </p>
    </section>
  `
})
export class ContactComponent {
  constructor(private resume: ResumeService) {}
  get data() { return this.resume.data; }
}