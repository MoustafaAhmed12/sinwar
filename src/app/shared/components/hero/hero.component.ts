import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  inject,
} from '@angular/core';
import { gsap } from 'gsap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MultiLangService } from '../../services/multi-lang.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroTitle') heroTitle!: ElementRef;
  @ViewChild('heroSubtitle') heroSubtitle!: ElementRef;
  @ViewChild('heroImage') heroImage!: ElementRef;
  @ViewChild('start') start!: ElementRef;

  multiLangService = inject(MultiLangService);
  translate = inject(TranslateService);

  ngAfterViewInit() {
    this.animateSubtitle();
    this.animateImage();
    this.animateHeroTitle();
    this.animateStart();
  }

  private getXDirection() {
    return this.translate.currentLang === 'ar' ? 20 : -20;
  }

  private animateStart() {
    gsap.from(this.start.nativeElement, {
      y: -20,
      x: this.getXDirection(),
      opacity: 0,
      duration: 1,
      delay: 0.4,
      ease: 'power3.out',
    });
  }

  private animateHeroTitle() {
    gsap.from(this.heroTitle.nativeElement, {
      y: -30,
      x: this.getXDirection(),
      opacity: 0,
      duration: 1,
      delay: 0.7,
      ease: 'power3.out',
    });
  }

  private animateSubtitle() {
    gsap.from(this.heroSubtitle.nativeElement, {
      y: -20,
      x: this.getXDirection(),
      opacity: 0,
      duration: 1.1,
      delay: 0.3,
      ease: 'power3.out',
    });
  }

  private animateImage() {
    gsap.from(this.heroImage.nativeElement, {
      scale: 0.5,
      opacity: 0,
      duration: 1.5,
      delay: 0.3,
      ease: 'power3.out',
    });
  }
}
