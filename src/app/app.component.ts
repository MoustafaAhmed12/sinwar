import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  Renderer2,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './shared/components/hero/hero.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AiChatComponent } from './shared/components/ai-chat/ai-chat.component';
import { SocialSidebarComponent } from './shared/components/social-sidebar/social-sidebar.component';
import { NavigationDotsComponent } from './shared/components/navigation-dots/navigation-dots.component';
gsap.registerPlugin(SplitText);
@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    FooterComponent,
    NavbarComponent,
    AiChatComponent,
    SocialSidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const follower = document.getElementById('cursor-follower');
    if (!follower) return;
    document.addEventListener('mousemove', (e) => {
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.18,
        ease: 'power2.out',
      });
    });
  }
}
