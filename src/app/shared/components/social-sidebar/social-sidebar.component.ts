import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import gsap from 'gsap';

@Component({
  selector: 'app-social-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-sidebar.component.html',
  styleUrls: ['./social-sidebar.component.css'],
})
export class SocialSidebarComponent {
  isOpen = false;
  isSidebarVisible = false;
  @ViewChild('sidebar', { static: false }) sidebar!: ElementRef;
  @ViewChild('iconBtn', { static: false }) iconBtn!: ElementRef;
  socialLinks: { name: string; url: string; color: string; svg: SafeHtml }[] =
    [];

  constructor(private sanitizer: DomSanitizer) {
    this.socialLinks = [
      {
        name: 'Facebook',
        url: 'https://facebook.com/SinwarSmartSolutions',
        color: '#1877F3',
        svg: this.sanitizer.bypassSecurityTrustHtml(`    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="size-6 fill-[#1877F3] group-hover:fill-white"
      width="800px"
      height="800px"
      viewBox="0 0 32 32"
    >
      <path
        d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z"
      />
    </svg>`),
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/',
        color: '#bc2a8d',
        svg: this.sanitizer.bypassSecurityTrustHtml(
          `<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" width="28" height="28"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path></svg>`
        ),
      },
      {
        name: 'WhatsApp',
        url: 'https://wa.me/01153466757',
        color: '#25D366',
        svg: this.sanitizer.bypassSecurityTrustHtml(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="currentColor"><path d="M25.873,6.069c-2.619-2.623-6.103-4.067-9.814-4.069C8.411,2,2.186,8.224,2.184,15.874c-.001,2.446,.638,4.833,1.852,6.936l-1.969,7.19,7.355-1.929c2.026,1.106,4.308,1.688,6.63,1.689h.006c7.647,0,13.872-6.224,13.874-13.874,.001-3.708-1.44-7.193-4.06-9.815h0Zm-9.814,21.347h-.005c-2.069,0-4.099-.557-5.87-1.607l-.421-.25-4.365,1.145,1.165-4.256-.274-.436c-1.154-1.836-1.764-3.958-1.763-6.137,.003-6.358,5.176-11.531,11.537-11.531,3.08,.001,5.975,1.202,8.153,3.382,2.177,2.179,3.376,5.077,3.374,8.158-.003,6.359-5.176,11.532-11.532,11.532h0Zm6.325-8.636c-.347-.174-2.051-1.012-2.369-1.128-.318-.116-.549-.174-.78,.174-.231,.347-.895,1.128-1.098,1.359-.202,.232-.405,.26-.751,.086-.347-.174-1.464-.54-2.788-1.72-1.03-.919-1.726-2.054-1.929-2.402-.202-.347-.021-.535,.152-.707,.156-.156,.347-.405,.52-.607,.174-.202,.231-.347,.347-.578,.116-.232,.058-.434-.029-.607-.087-.174-.78-1.88-1.069-2.574-.281-.676-.567-.584-.78-.595-.202-.01-.433-.012-.665-.012s-.607,.086-.925,.434c-.318,.347-1.213,1.186-1.213,2.892s1.242,3.355,1.416,3.587c.174,.232,2.445,3.733,5.922,5.235,.827,.357,1.473,.571,1.977,.73,.83,.264,1.586,.227,2.183,.138,.666-.1,2.051-.839,2.34-1.649,.289-.81,.289-1.504,.202-1.649s-.318-.232-.665-.405h0Z"/></svg>`
        ),
      },
      {
        name: 'X',
        url: 'https://x.com/',
        color: '#000',
        svg: this.sanitizer.bypassSecurityTrustHtml(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="currentColor"><path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"/></svg>`
        ),
      },
    ];
  }

  toggleSidebar() {
    if (!this.isOpen) {
      this.isSidebarVisible = true;
      setTimeout(() => {
        this.isOpen = true;
        this.animateOpen();
      }, 10);
    } else {
      this.isOpen = false;
      this.animateClose();
    }
  }

  animateOpen() {
    const sidebar = this.sidebar?.nativeElement;
    if (sidebar) {
      gsap.to(sidebar, {
        x: 0,
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power3.out',
      });
      const links = Array.from(sidebar.querySelectorAll('.social-link'));
      gsap.fromTo(
        links,
        { y: 0, autoAlpha: 0 },
        {
          y: (i) => -1 * (i + 1),
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.07,
          ease: 'back.out(1.7)',
        }
      );
    }
  }

  animateClose() {
    const sidebar = this.sidebar?.nativeElement;
    if (sidebar) {
      const links = Array.from(sidebar.querySelectorAll('.social-link'));
      gsap.to(links, {
        y: 0,
        autoAlpha: 0,
        duration: 0.3,
        stagger: { each: 0.07, from: 'end' },
        ease: 'power2.in',
      });
      gsap.to(sidebar, {
        x: -80,
        autoAlpha: 0,
        duration: 0.3,
        delay: 0.1 + 0.07 * links.length,
        ease: 'power2.in',
        onComplete: () => {
          this.isSidebarVisible = false;
          return undefined;
        },
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const sidebar = this.sidebar?.nativeElement;
    const iconBtn = this.iconBtn?.nativeElement;
    if (
      this.isOpen &&
      sidebar &&
      !sidebar.contains(event.target as Node) &&
      iconBtn &&
      !iconBtn.contains(event.target as Node)
    ) {
      this.toggleSidebar();
    }
  }
}
