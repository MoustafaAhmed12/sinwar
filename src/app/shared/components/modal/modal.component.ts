import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed bg-white/50 dark:bg-dark-bg/50 inset-0 z-50 pointer-events-none"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      #modalContainer
    >
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-light-bg/50 dark:bg-dark-bg/50 transition-opacity pointer-events-none"
        (click)="close()"
        #overlay
      ></div>

      <!-- Modal panel -->
      <div
        class="flex items-center justify-center p-4 overflow-y-auto"
        style="min-height: calc(100vh - 2rem)"
      >
        <div
          class="relative transform overflow-hidden border dark:border-dark-border border-light-border rounded-2xl bg-white dark:bg-dark-bg p-6 shadow-xl transition-all w-full max-w-2xl pointer-events-none"
          #modalContent
        >
          <!-- Close button -->
          <button
            (click)="close()"
            class="absolute top-4 right-4 text-dark-text hover:text-light-hover dark:text-dark-text dark:hover:text-dark-hover pointer-events-none"
          >
            <span class="sr-only">Close</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- Modal content -->
          <div class="mt-3">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalComponent implements AfterViewInit {
  @Input() set isOpen(value: boolean) {
    if (value) {
      this.openModal();
    } else {
      this.closeModal();
    }
  }
  @Output() isOpenChange = new EventEmitter<boolean>();

  @ViewChild('modalContainer') modalContainer!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;
  @ViewChild('modalContent') modalContent!: ElementRef;

  private animationTimeline: gsap.core.Timeline | null = null;

  ngAfterViewInit() {
    // Initialize the animation timeline
    this.animationTimeline = gsap.timeline({ paused: true });

    // Set initial states
    gsap.set(this.modalContainer?.nativeElement, {
      autoAlpha: 0,
      pointerEvents: 'none',
    });
    gsap.set(this.overlay?.nativeElement, {
      autoAlpha: 0,
      pointerEvents: 'none',
    });
    gsap.set(this.modalContent?.nativeElement, {
      y: 50,
      scale: 0.95,
      autoAlpha: 0,
      pointerEvents: 'none',
    });
  }

  private openModal() {
    if (!this.animationTimeline) return;

    // Enable pointer events
    gsap.set(this.modalContainer?.nativeElement, { pointerEvents: 'auto' });
    gsap.set(this.overlay?.nativeElement, { pointerEvents: 'auto' });
    gsap.set(this.modalContent?.nativeElement, { pointerEvents: 'auto' });

    this.animationTimeline
      .to(this.modalContainer?.nativeElement, {
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
      .to(
        this.overlay?.nativeElement,
        {
          autoAlpha: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
        '-=0.2'
      )
      .to(
        this.modalContent?.nativeElement,
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
        },
        '-=0.1'
      )
      .play();
  }

  private closeModal() {
    if (!this.animationTimeline) return;

    this.animationTimeline
      .to(this.modalContent?.nativeElement, {
        y: 50,
        scale: 0.95,
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
      .to(
        this.overlay?.nativeElement,
        {
          autoAlpha: 0,
          duration: 0.2,
          ease: 'power2.in',
        },
        '-=0.1'
      )
      .to(
        this.modalContainer?.nativeElement,
        {
          autoAlpha: 0,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            // Disable pointer events
            gsap.set(this.modalContainer?.nativeElement, {
              pointerEvents: 'none',
            });
            gsap.set(this.overlay?.nativeElement, { pointerEvents: 'none' });
            gsap.set(this.modalContent?.nativeElement, {
              pointerEvents: 'none',
            });
            this.isOpenChange.emit(false);
          },
        },
        '-=0.1'
      )
      .play();
  }

  close() {
    this.closeModal();
  }
}
