import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-faq',
  imports: [TranslatePipe],
  templateUrl: './faq.component.html',
})
export class FaqComponent implements AfterViewInit {
  @ViewChild('faqSection') faqSection!: ElementRef;
  @ViewChild('faqTitle') faqTitle!: ElementRef;
  @ViewChild('faqGrid') faqGrid!: ElementRef;

  activeIndex: number | null = null;

  constructor(private translate: TranslateService) {}

  toggleAccordion(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate title
    gsap.from(this.faqTitle.nativeElement, {
      scrollTrigger: {
        trigger: this.faqSection.nativeElement,
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Animate FAQ items on scroll only (not on click)
    const faqItems = this.faqGrid.nativeElement.querySelectorAll('.group');
    faqItems.forEach((item: HTMLElement, index: number) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.5,
        delay: index * 0.2,
        ease: 'power2.out',
      });

      // Hover animation
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }
}
