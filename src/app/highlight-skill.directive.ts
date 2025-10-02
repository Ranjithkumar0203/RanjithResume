import { Directive, ElementRef, Input, OnInit } from '@angular/core';

const CORE = new Set(['Angular','Node.js','TypeScript','MongoDB','Module Federation','Micro Frontends']);

@Directive({
  selector: '[appHighlightSkill]',
  standalone: true
})
export class HighlightSkillDirective implements OnInit {
  @Input() appHighlightSkill = '';
  constructor(private el: ElementRef<HTMLElement>) {}
  ngOnInit() {
    if (CORE.has(this.appHighlightSkill)) {
      this.el.nativeElement.style.outline = '2px solid';
      this.el.nativeElement.style.outlineOffset = '2px';
    }
  }
}