import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <footer class="bg-[#000] py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Logo -->
          <div class="w-56">
            <img
              routerLink="/"
              fragment="hero"
              src="imgs/logo.svg"
              alt="{{ 'NAVBAR.LOGO_ALT' | translate }}"
              class="w-full h-full cursor-pointer"
            />
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-white text-lg font-bold mb-4">
              {{ 'FOOTER.QUICK_LINKS' | translate }}
            </h3>
            <ul class="space-y-2">
              <li>
                <a
                  (click)="scrollTo('hero')"
                  class="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >{{ 'FOOTER.HOME' | translate }}</a
                >
              </li>
              <li>
                <a
                  (click)="scrollTo('services')"
                  class="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >{{ 'FOOTER.SERVICES' | translate }}</a
                >
              </li>
              <li>
                <a
                  (click)="scrollTo('blog')"
                  class="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >{{ 'FOOTER.BLOG' | translate }}</a
                >
              </li>
              <li>
                <a
                  (click)="scrollTo('contact')"
                  class="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >{{ 'FOOTER.CONTACT' | translate }}</a
                >
              </li>
            </ul>
          </div>

          <!-- Services -->
          <div>
            <h3 class="text-white text-lg font-bold mb-4">
              {{ 'FOOTER.SERVICES_TITLE' | translate }}
            </h3>
            <ul class="space-y-2">
              <li>
                <a
                  (click)="scrollTo('services')"
                  class="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >{{ 'FOOTER.WEB_DEVELOPMENT' | translate }}</a
                >
              </li>
              <li>
                <a
                  (click)="scrollTo('services')"
                  class="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >{{ 'FOOTER.UI_UX' | translate }}</a
                >
              </li>
              <li>
                <a
                  (click)="scrollTo('services')"
                  class="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >{{ 'FOOTER.SEO' | translate }}</a
                >
              </li>
              <li>
                <a
                  (click)="scrollTo('services')"
                  class="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >{{ 'FOOTER.MARKETING' | translate }}</a
                >
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-white text-lg font-bold mb-4">
              {{ 'FOOTER.CONTACT_TITLE' | translate }}
            </h3>
            <ul class="space-y-2">
              <li class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <!-- Map Marker SVG -->
                  <svg
                    class="w-6 h-6 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    class="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-500 mb-2"
                  >
                    {{ 'CONTACT.location' | translate }}
                  </h3>
                  <p
                    class="text-gray-300 group-hover:text-white transition-colors duration-500"
                  >
                    {{ 'FOOTER.ADDRESS' | translate }}
                  </p>
                </div>
              </li>
              <li class="flex items-center space-x-4">
                <svg
                  class="w-6 h-6 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.11-.21c1.12.45 2.33.69 3.48.69.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.15.24 2.36.69 3.48.13.33.05.7-.21 1.11l-2.36 2.2z"
                  />
                </svg>
                <a
                  href="tel:01070444916"
                  class="text-gray-300 group-hover:text-white group/item:hover:text-purple-400 transition-colors duration-500 text-lg font-medium hover:underline"
                >
                  01070444916
                </a>
              </li>
              <li class="flex items-center space-x-4">
                <svg
                  class="w-6 h-6 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h16v2l-8 5-8-5V4zm0 4.25l8 5 8-5V20H4V8.25z" />
                </svg>
                <a
                  href="  mailto:info@sinwar.eg.com"
                  class="text-gray-300 group-hover:text-white group/item:hover:text-blue-400 transition-colors duration-500 text-lg font-medium hover:underline"
                >
                  {{ 'info@sinwar.eg.com' }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="mt-8 pt-8 border-t border-gray-800 text-center">
          <p class="text-gray-400">{{ 'FOOTER.COPYRIGHT' | translate }}</p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  constructor(private scrollService: ScrollService) {}

  scrollTo(elementId: string): void {
    this.scrollService.scrollToElement(elementId);
  }
}
