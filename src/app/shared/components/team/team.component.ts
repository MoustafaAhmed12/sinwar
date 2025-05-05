import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
})
export class TeamComponent implements AfterViewInit {
  @ViewChild('teamSection') teamSection!: ElementRef;
  @ViewChild('teamTitle') teamTitle!: ElementRef;
  @ViewChild('teamGrid') teamGrid!: ElementRef;

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate title
    gsap.from(this.teamTitle.nativeElement, {
      scrollTrigger: {
        trigger: this.teamSection.nativeElement,
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Animate team members
    const teamMembers =
      this.teamGrid.nativeElement.querySelectorAll('div.group');
    teamMembers.forEach((member: HTMLElement, index: number) => {
      gsap.from(member, {
        scrollTrigger: {
          trigger: member,
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
      member.addEventListener('mouseenter', () => {
        gsap.to(member, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      member.addEventListener('mouseleave', () => {
        gsap.to(member, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }
}
