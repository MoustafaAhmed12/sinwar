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
import { HomeComponent } from './pages/home/home.component';
gsap.registerPlugin(SplitText);
@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    RouterOutlet,
    HomeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
