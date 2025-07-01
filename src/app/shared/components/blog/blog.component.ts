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
  selector: 'app-blog',
  imports: [TranslatePipe],
  templateUrl: './blog.component.html',
  styles: [``],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlogComponent implements AfterViewInit {
  @ViewChild('blogSection') blogSection!: ElementRef;
  @ViewChild('blogTitle') blogTitle!: ElementRef;
  @ViewChild('blogGrid') blogGrid!: ElementRef;

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate title
    gsap.from(this.blogTitle.nativeElement, {
      scrollTrigger: {
        trigger: this.blogSection.nativeElement,
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Animate testimonials
    const testimonials =
      this.blogGrid.nativeElement.querySelectorAll('div.group');
    testimonials.forEach((testimonial: HTMLElement, index: number) => {
      gsap.from(testimonial, {
        scrollTrigger: {
          trigger: testimonial,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.5,
        delay: index * 0.2,
        ease: 'power2.out',
        toggleActions: 'play reverse play reverse',
      });

      // Add hover animation
      testimonial.addEventListener('mouseenter', () => {
        gsap.to(testimonial, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      testimonial.addEventListener('mouseleave', () => {
        gsap.to(testimonial, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }
}
