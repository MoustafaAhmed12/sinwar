import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-[#000] py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-white text-lg font-bold mb-4">SINWAR</h3>
            <p class="text-gray-400">
              We create beautiful and functional websites that help businesses
              grow.
            </p>
          </div>
          <div>
            <h3 class="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li>
                <a
                  (click)="scrollTo('hero')"
                  class="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >Home</a
                >
              </li>
              <li>
                <a
                  (click)="scrollTo('services')"
                  class="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >Services</a
                >
              </li>
              <li>
                <a
                  (click)="scrollTo('blog')"
                  class="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >Blog</a
                >
              </li>
              <li>
                <a
                  (click)="scrollTo('contact')"
                  class="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >Contact</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-white text-lg font-bold mb-4">Services</h3>
            <ul class="space-y-2">
              <li>
                <a
                  (click)="scrollTo('services')"
                  class="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >Web Development</a
                >
              </li>
              <li>
                <a
                  (click)="scrollTo('services')"
                  class="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >UI/UX Design</a
                >
              </li>
              <li>
                <a
                  (click)="scrollTo('services')"
                  class="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >SEO Optimization</a
                >
              </li>
              <li>
                <a
                  (click)="scrollTo('services')"
                  class="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >Digital Marketing</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul class="space-y-2">
              <li class="text-gray-400">
                <i class="fas fa-map-marker-alt mr-2"></i>
                123 Business Street, City
              </li>
              <li class="text-gray-400">
                <i class="fas fa-phone mr-2"></i>
                +1 234 567 890
              </li>
              <li class="text-gray-400">
                <i class="fas fa-envelope mr-2"></i>
                info&#64;sinwar.com
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-800 text-center">
          <p class="text-gray-400">&copy; 2024 SINWAR. All rights reserved.</p>
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
