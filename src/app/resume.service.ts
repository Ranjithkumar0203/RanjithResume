import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  data = signal<any>(null);
  constructor() {
    fetch('assets/resume.json')
      .then(r => r.json())
      .then(j => this.data.set(j))
      .catch(() => this.data.set(null));
  }
}