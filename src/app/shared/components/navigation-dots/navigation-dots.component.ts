import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-navigation-dots',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed right-8 top-1/2 transform -translate-y-1/2 hidden md:block z-50"
    >
      <div class="flex flex-col gap-4">
        <button
          *ngFor="let section of sections; let i = index"
          (click)="scrollTo(section.id)"
          class="w-3 h-3 rounded-full transition-all duration-300 cursor-pointer"
          [ngClass]="{
            'bg-white scale-125': currentSection === section.id,
            'bg-gray-600 hover:bg-gray-400': currentSection !== section.id
          }"
          [title]="section.name"
        ></button>
      </div>
    </div>
  `,
  styles: [
    `
      button {
        position: relative;
      }
      button:hover::after {
        content: attr(title);
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.1);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        color: white;
        white-space: nowrap;
      }
    `,
  ],
})
export class NavigationDotsComponent implements OnInit {
  sections = [
    { id: 'hero', name: 'Home' },
    { id: 'services', name: 'Services' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'blog', name: 'Blog' },
    { id: 'team', name: 'Team' },
    { id: 'contact', name: 'Contact' },
    { id: 'faq', name: 'FAQ' },
    { id: 'pricing', name: 'Pricing' },
  ];

  currentSection = 'hero';

  constructor(private scrollService: ScrollService) {}

  ngOnInit() {
    this.checkCurrentSection();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkCurrentSection();
  }

  checkCurrentSection() {
    const scrollPosition = window.scrollY + 100; // Adding offset for better accuracy

    for (const section of this.sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.offsetHeight;

        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          this.currentSection = section.id;
          break;
        }
      }
    }
  }

  scrollTo(sectionId: string) {
    this.currentSection = sectionId;
    this.scrollService.scrollToElement(sectionId);
  }
}
