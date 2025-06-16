import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ChangeModeService } from '../../services/change-mode.service';
import { MultiLangService } from '../../services/multi-lang.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('navbar', { static: true }) navbar!: ElementRef;
  @ViewChild('logo', { static: true }) logo!: ElementRef;
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef;
  multiLangService = inject(MultiLangService);
  translate = inject(TranslateService);
  selectedLang = signal<string>(this.multiLangService.currenLang() ?? 'ar');
  changeModeService = inject(ChangeModeService);
  scrollService = inject(ScrollService);
  isDarkMode = signal<boolean>(
    document.documentElement.classList.contains('dark')
  );
  private isMenuOpen = false;
  isScrolled = signal<boolean>(false);
  activeSection = signal<string>('hero');

  // TODO: change Theme
  toggleTheme() {
    this.changeModeService.toggleTheme();
    this.isDarkMode.set(!this.isDarkMode());
  }

  // TODO: change Language
  toggleLanguage() {
    if (this.multiLangService.currenLang() === 'ar') {
      this.selectedLang.set('en');
      this.multiLangService.updateLang('en');
    } else {
      this.selectedLang.set('ar');
      this.multiLangService.updateLang('ar');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 30);
    this.updateActiveSection();
  }

  private updateActiveSection() {
    const sections = [
      'hero',
      'services',
      'blog',
      'team',
      'contact',
      'faq',
      'pricing',
    ];
    const scrollPosition = window.scrollY + 100; // Offset for better detection

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          console.log(this.activeSection());
          this.activeSection.set(section);
          break;
        }
      }
    }
  }

  ngAfterViewInit() {
    gsap.from(this.navbar.nativeElement, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });

    gsap.from(this.logo.nativeElement, {
      scale: 0,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      ease: 'back.out(1.7)',
    });

    this.animateNavItems();
    this.updateActiveSection(); // Initial check
  }

  toggleMobileMenu() {
    const menu = this.mobileMenu.nativeElement;
    const button = this.mobileMenuButton.nativeElement;
    const menuItems = menu.querySelectorAll('.mobile-menu-item');

    if (!this.isMenuOpen) {
      // Open menu
      menu.classList.remove('hidden');
      gsap.set(menuItems, { opacity: 0, y: 20 });

      gsap.to(menu, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(menuItems, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
      });

      button.setAttribute('aria-expanded', 'true');
    } else {
      // Close menu
      gsap.to(menuItems, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: -0.1,
        ease: 'power2.in',
      });

      gsap.to(menu, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          menu.classList.add('hidden');
        },
      });

      button.setAttribute('aria-expanded', 'false');
    }

    this.isMenuOpen = !this.isMenuOpen;
  }

  private animateNavItems() {
    // Get all navigation items
    const navItems = document.querySelectorAll('.nav-item');

    // Set initial state for all items
    gsap.set(navItems, {
      opacity: 0,
      y: -20,
      x: -20,
    });

    // Create a timeline for the animation
    const tl = gsap.timeline({
      defaults: {
        duration: 0.5,
        ease: 'power2.out',
      },
    });

    // Animate each item with a stagger effect
    tl.to(navItems, {
      opacity: 1,
      y: 0,
      x: 0,
      stagger: 0.1,
      onComplete: () => {
        // Add hover animation
        navItems.forEach((item) => {
          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              scale: 1.1,
              duration: 0.2,
            });
          });

          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
              scale: 1,
              duration: 0.2,
            });
          });
        });
      },
    });
  }
}
