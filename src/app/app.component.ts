import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './shared/components/hero/hero.component';
gsap.registerPlugin(SplitText);
@Component({
  selector: 'app-root',
  imports: [CommonModule, NavbarComponent, HeroComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('heroTitle', { static: false }) heroTitle!: ElementRef;
  @ViewChild('subTitle', { static: false }) subTitle!: ElementRef;

  ngAfterViewInit(): void {
    const split = new SplitText(this.heroTitle.nativeElement, {
      type: 'words',
    });
    const sub = new SplitText(this.subTitle.nativeElement, {
      type: 'words, lines',
      wordsClass: 'words',
    });

    gsap.from(sub.words, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.1,
    });
    gsap.from(split.words, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.1,
    });
  }
}
