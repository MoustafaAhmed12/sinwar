import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css',
})
export class FeaturesComponent implements AfterViewInit {
  @ViewChild('featuresSection', { static: true }) featuresSection!: ElementRef;
  @ViewChild('featuresTitle', { static: true }) featuresTitle!: ElementRef;
  @ViewChild('featuresCards', { static: true }) featuresCards!: ElementRef;

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate title
    gsap.from(this.featuresTitle.nativeElement, {
      scrollTrigger: {
        trigger: this.featuresSection.nativeElement,
        start: 'top 80%',
        toggleActions: 'restart none none none',
      },
      y: -60,
      x: -60,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
    });

    // Animate cards with stagger
    const cards = this.featuresCards.nativeElement.querySelectorAll('.group');
    gsap.from(cards, {
      scrollTrigger: {
        trigger: this.featuresSection.nativeElement,
        start: 'top 80%',
        toggleActions: 'restart none none none',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.35,
      delay: 0.3,
    });
  }
}
