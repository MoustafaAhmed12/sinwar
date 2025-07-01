import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-pricing',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PricingComponent {
  // @ViewChild('pricingSection') pricingSection!: ElementRef;
  // @ViewChild('pricingTitle') pricingTitle!: ElementRe  f;
  // @ViewChild('pricingGrid') pricingGrid!: ElementRef;

  slides = [
    {
      id: 1,
      title: 'Modern Design',
      description: 'Beautiful and responsive design patterns',
      image: 'https://picsum.photos/300/150?random=1',
    },
    {
      id: 2,
      title: 'Smooth Animation',
      description: 'Fluid transitions and smooth scrolling',
      image: 'https://picsum.photos/300/150?random=2',
    },
    {
      id: 3,
      title: 'User Experience',
      description: 'Optimized for the best user interaction',
      image: 'https://picsum.photos/300/150?random=3',
    },
    {
      id: 4,
      title: 'Performance',
      description: 'Fast loading and optimized performance',
      image: 'https://picsum.photos/300/150?random=4',
    },
    {
      id: 5,
      title: 'Accessibility',
      description: 'Built with accessibility in mind',
      image: 'https://picsum.photos/300/150?random=5',
    },
    {
      id: 6,
      title: 'Mobile First',
      description: 'Responsive design for all devices',
      image: 'https://picsum.photos/300/150?random=6',
    },
  ];

  advancedSlides = [
    { id: 1, title: 'https://academiaglobe.com/images/logo.png' },
    {
      id: 2,
      title:
        'https://globestonehills.com/wp-content/uploads/2022/09/globe-stone-hills.png',
    },
    { id: 3, title: 'https://academiaglobe.com/images/logo.png' },
    {
      id: 4,
      title:
        'https://globestonehills.com/wp-content/uploads/2022/09/globe-stone-hills.png',
    },
  ];

  ngOnInit() {
    console.log('Swiper components initialized');
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  // ngAfterViewInit() {
  //   gsap.registerPlugin(ScrollTrigger);

  //   // Animate title
  //   gsap.from(this.pricingTitle.nativeElement, {
  //     scrollTrigger: {
  //       trigger: this.pricingSection.nativeElement,
  //       start: 'top 80%',
  //       toggleActions: 'play reverse play reverse',
  //     },
  //     y: 30,
  //     opacity: 0,
  //     duration: 0.5,
  //     ease: 'power2.out',
  //   });

  //   // Animate pricing cards
  //   const pricingCards =
  //     this.pricingGrid.nativeElement.querySelectorAll('.group');
  //   pricingCards.forEach((card: HTMLElement, index: number) => {
  //     gsap.from(card, {
  //       scrollTrigger: {
  //         trigger: card,
  //         start: 'top 80%',
  //         toggleActions: 'play reverse play reverse',
  //       },
  //       y: 50,
  //       opacity: 0,
  //       duration: 0.5,
  //       delay: index * 0.2,
  //       ease: 'power2.out',
  //     });

  //     // Add hover animation
  //     card.addEventListener('mouseenter', () => {
  //       gsap.to(card, {
  //         scale: 1.02,
  //         duration: 0.3,
  //         ease: 'power2.out',
  //       });
  //     });

  //     card.addEventListener('mouseleave', () => {
  //       gsap.to(card, {
  //         scale: 1,
  //         duration: 0.3,
  //         ease: 'power2.out',
  //       });
  //     });

  //     // Add click animation for buttons
  //     const button = card.querySelector('button');
  //     if (button) {
  //       button.addEventListener('click', () => {
  //         gsap.to(button, {
  //           scale: 0.95,
  //           duration: 0.1,
  //           ease: 'power2.out',
  //           yoyo: true,
  //           repeat: 1,
  //         });
  //       });
  //     }
  //   });
  // }
}
