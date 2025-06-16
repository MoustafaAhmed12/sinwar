import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  @ViewChild('servicesSection') servicesSection!: ElementRef;
  @ViewChild('servicesTitle') servicesTitle!: ElementRef;
  @ViewChild('servicesCards') servicesCards!: ElementRef;

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate title
    gsap.from(this.servicesTitle.nativeElement, {
      scrollTrigger: {
        trigger: this.servicesSection.nativeElement,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 1,
    });

    // Animate cards
    gsap.from(this.servicesCards.nativeElement.children, {
      scrollTrigger: {
        trigger: this.servicesSection.nativeElement,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.4,
      delay: 0.4,
    });
  }
}
