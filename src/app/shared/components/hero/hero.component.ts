import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroTitle') heroTitle!: ElementRef;
  @ViewChild('heroSubtitle') heroSubtitle!: ElementRef;
  @ViewChild('heroImage') heroImage!: ElementRef;
  @ViewChild('start') start!: ElementRef;

  ngAfterViewInit() {
    this.animateSubtitle();
    this.animateImage();
    this.animateHeroTitle();
    this.animateStart();
  }

  private animateStart() {
    gsap.from(this.start.nativeElement, {
      x: 300,
      opacity: 0,
      duration: 1,
      delay: 0.4,
      ease: 'power3.out',
    });
  }
  private animateHeroTitle() {
    gsap.from(this.heroTitle.nativeElement, {
      x: -500,
      opacity: 0,
      duration: 1,
      delay: 0.7,
      ease: 'power3.out',
    });
  }
  private animateSubtitle() {
    gsap.from(this.heroSubtitle.nativeElement, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
    });
  }

  private animateImage() {
    gsap.from(this.heroImage.nativeElement, {
      scale: 0.8,
      opacity: 0,
      duration: 1.5,
      delay: 0.6,
      ease: 'power3.out',
    });
  }
}
