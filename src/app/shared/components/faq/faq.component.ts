import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
})
export class FaqComponent implements AfterViewInit {
  @ViewChild('faqSection') faqSection!: ElementRef;
  @ViewChild('faqTitle') faqTitle!: ElementRef;
  @ViewChild('faqGrid') faqGrid!: ElementRef;

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

    // Animate FAQ items
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

      // Add hover animation
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

      // Add click animation for FAQ items
      const button = item.querySelector('button');
      const answer = item.querySelector('p');

      if (button && answer) {
        button.addEventListener('click', () => {
          const isOpen = answer.classList.contains('max-h-0');

          gsap.to(answer, {
            maxHeight: isOpen ? '1000px' : '0',
            opacity: isOpen ? 1 : 0,
            duration: 0.5,
            ease: 'power2.inOut',
          });

          gsap.to(button.querySelector('i'), {
            rotation: isOpen ? 0 : 180,
            duration: 0.3,
            ease: 'power2.inOut',
          });
        });
      }
    });
  }
}
