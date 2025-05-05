import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
})
export class PricingComponent implements AfterViewInit {
  @ViewChild('pricingSection') pricingSection!: ElementRef;
  @ViewChild('pricingTitle') pricingTitle!: ElementRef;
  @ViewChild('pricingGrid') pricingGrid!: ElementRef;

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate title
    gsap.from(this.pricingTitle.nativeElement, {
      scrollTrigger: {
        trigger: this.pricingSection.nativeElement,
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Animate pricing cards
    const pricingCards =
      this.pricingGrid.nativeElement.querySelectorAll('.group');
    pricingCards.forEach((card: HTMLElement, index: number) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
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
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      // Add click animation for buttons
      const button = card.querySelector('button');
      if (button) {
        button.addEventListener('click', () => {
          gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
          });
        });
      }
    });
  }
}
