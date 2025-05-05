import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
})
export class PortfolioComponent {
  @ViewChild('portfolioSection') portfolioSection!: ElementRef;
  @ViewChild('portfolioTitle') portfolioTitle!: ElementRef;
  @ViewChild('portfolioGrid') portfolioGrid!: ElementRef;

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate title
    gsap.from(this.portfolioTitle.nativeElement, {
      scrollTrigger: {
        trigger: this.portfolioSection.nativeElement,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 20,
      opacity: 0,
      duration: 0.3,
    });

    // Get all project elements
    const projects = this.portfolioGrid.nativeElement.children;

    // Animate each project
    Array.from(projects).forEach((project: any, index) => {
      const image = project.querySelector('img');
      const content = project.querySelector('.lg\\:w-1\\/2:last-child');
      const accentBox = project.querySelector(
        '.absolute.-left-4, .absolute.-right-4'
      );

      // Reset initial state
      gsap.set([image, content, accentBox], {
        opacity: 0,
        y: 20,
      });

      // Create timeline for each project
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate elements in sequence
      tl.to(accentBox, {
        opacity: 1,
        rotation: 0,
        duration: 0.2,
        ease: 'power2.out',
      })
        .to(
          image,
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: 'power2.out',
          },
          '-=0.1'
        )
        .to(
          content,
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: 'power2.out',
          },
          '-=0.1'
        );

      // Minimal stagger effect
      tl.delay(index * 0.05);
    });
  }
}
