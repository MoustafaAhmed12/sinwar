import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiChatService } from '../../services/ai-chat.service';
import gsap from 'gsap';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chat.component.html',
  styles: [
    `
      :host {
        display: block;
      }

      .typing {
        display: inline-block;
        position: relative;
      }

      .typing::after {
        content: '|';
        position: absolute;
        right: -4px;
        animation: blink 1s infinite;
      }

      @keyframes blink {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
      }

      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
      }

      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }

      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0.5);
        border-radius: 20px;
      }

      :host-context(.dark) .custom-scrollbar {
        scrollbar-color: rgba(75, 85, 99, 0.7) rgba(31, 41, 55, 0.1);
      }

      :host-context(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(75, 85, 99, 0.7);
      }

      :host-context(.dark) .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(31, 41, 55, 0.1);
      }

      .chat-container {
        transform-origin: bottom right;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
        overflow: hidden;
        visibility: hidden; /* Initially hidden for GSAP animations */
      }

      .dark .chat-container {
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3),
          0 10px 10px -5px rgba(0, 0, 0, 0.2);
      }

      .message-item {
        opacity: 1; /* Initially hidden for GSAP animations */
      }
    `,
  ],
})
export class AiChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @ViewChild('chatWindow') private chatWindow!: ElementRef;
  @ViewChild('chatHeader') private chatHeader!: ElementRef;
  @ViewChild('chatInput') private chatInput!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;

  isChatOpen = false;
  showChatWindow = false;
  messages: Message[] = [];
  newMessage = '';
  isLoading = false;

  // Smart scroll flag
  private shouldScrollToBottom = true;

  // Store any active animations to be able to kill them on destroy
  private activeAnimations: gsap.core.Timeline[] = [];

  constructor(private aiChatService: AiChatService) {
    // Add formal thank you message as the first AI message
    this.messages.push({
      text: 'مرحباً بك في منصة sinwar. كيف يمكنني مساعدتك؟',
      isUser: false,
      timestamp: new Date(),
    });
  }

  ngOnInit() {}

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  ngOnDestroy() {
    // Kill any active animations to prevent memory leaks
    this.activeAnimations.forEach((timeline) => {
      if (timeline) {
        timeline.kill();
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const chatWindow = document.querySelector('.chat-container');
    const chatButton = document.querySelector(
      'button[class*="fixed bottom-6 right-6 bg-primary"]'
    );

    if (
      this.isChatOpen &&
      chatWindow &&
      !chatWindow.contains(event.target as Node) &&
      !chatButton?.contains(event.target as Node)
    ) {
      this.toggleChat();
    }
  }

  toggleChat() {
    if (this.isChatOpen) {
      // Close animation using GSAP
      this.animateChatClose();
    } else {
      // Open animation using GSAP
      this.showChatWindow = true;
      setTimeout(() => {
        this.animateChatOpen();
      }, 10);
    }
  }

  private animateChatOpen() {
    const chatWindow = document.querySelector('.chat-container') as HTMLElement;
    const chatHeader = document.querySelector('.chat-header') as HTMLElement;
    const chatMessages = document.querySelectorAll('.message-item');
    const chatInput = document.querySelector('.chat-input') as HTMLElement;

    if (chatWindow) {
      // Create a timeline for the animation sequence
      const tl = gsap.timeline({
        onComplete: () => {
          this.isChatOpen = true;
          // Focus on input when chat opens
          this.focusInput();
        },
      });

      this.activeAnimations.push(tl);

      // Set initial states
      gsap.set(chatWindow, {
        autoAlpha: 0,
        y: 100,
        scale: 0.3,
        transformOrigin: 'bottom right',
      });

      if (chatHeader) {
        gsap.set(chatHeader, { autoAlpha: 0, y: -20 });
      }

      if (chatInput) {
        gsap.set(chatInput, { autoAlpha: 0, y: 20 });
      }

      chatMessages.forEach((msg) => {
        gsap.set(msg, {
          autoAlpha: 0,
          x: msg.classList.contains('justify-end') ? 20 : -20,
        });
      });

      // Main window animation
      tl.to(chatWindow, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
      });

      // Header animation
      if (chatHeader) {
        tl.to(
          chatHeader,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          },
          '-=0.2'
        );
      }

      // Message animations with stagger effect
      tl.to(
        chatMessages,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: 'back.out(1.4)',
        },
        '-=0.1'
      );

      // Input animation
      if (chatInput) {
        tl.to(
          chatInput,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          },
          '-=0.2'
        );
      }
    }
  }

  private animateChatClose() {
    const chatWindow = document.querySelector('.chat-container') as HTMLElement;
    const chatHeader = document.querySelector('.chat-header') as HTMLElement;
    const chatMessages = document.querySelectorAll('.message-item');
    const chatInput = document.querySelector('.chat-input') as HTMLElement;

    if (chatWindow) {
      // Create a timeline for the closing sequence
      const tl = gsap.timeline({
        onComplete: () => {
          this.isChatOpen = false;
          this.showChatWindow = false;
        },
      });

      this.activeAnimations.push(tl);

      // Input animation
      if (chatInput) {
        tl.to(chatInput, {
          autoAlpha: 0,
          y: 20,
          duration: 0.2,
          ease: 'power2.in',
        });
      }

      // Message animations with stagger effect (in reverse)
      tl.to(
        Array.from(chatMessages).reverse(),
        {
          autoAlpha: 0,
          x: (i, target) =>
            target.classList.contains('justify-end') ? 20 : -20,
          duration: 0.2,
          stagger: 0.03,
          ease: 'power2.in',
        },
        '-=0.1'
      );

      // Header animation
      if (chatHeader) {
        tl.to(
          chatHeader,
          {
            autoAlpha: 0,
            y: -20,
            duration: 0.2,
            ease: 'power2.in',
          },
          '-=0.15'
        );
      }

      // Main window animation
      tl.to(
        chatWindow,
        {
          autoAlpha: 0,
          y: 100,
          scale: 0.3,
          duration: 0.4,
          ease: 'power3.in',
        },
        '-=0.2'
      );
    }
  }

  sendMessage() {
    if (!this.newMessage.trim() || this.isLoading) return;
    this.shouldScrollToBottom = true; // Always scroll down on new message

    // Add user message
    this.messages.push({
      text: this.newMessage,
      isUser: true,
      timestamp: new Date(),
    });

    const userMessage = this.newMessage;
    this.newMessage = '';
    this.isLoading = true;
    this.scrollToBottom();

    // Animate the new message
    setTimeout(() => {
      this.animateNewMessage();
    }, 0);

    // Add typing message
    const typingMessage: Message = {
      text: '',
      isUser: false,
      timestamp: new Date(),
      isTyping: true,
    };
    this.messages.push(typingMessage);

    // Get AI response
    this.aiChatService.getResponse(userMessage).subscribe({
      next: (response) => {
        // Remove typing message
        this.messages = this.messages.filter((m) => m !== typingMessage);

        // Add AI response with typing animation
        this.typeMessage(response);
      },
      error: (error) => {
        console.error('Error getting AI response:', error);
        this.messages = this.messages.filter((m) => m !== typingMessage);
        this.typeMessage(
          'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.'
        );
      },
    });
  }

  private typeMessage(text: string) {
    const message: Message = {
      text: '',
      isUser: false,
      timestamp: new Date(),
      isTyping: true,
    };
    this.messages.push(message);

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        message.text += text[index];
        index++;
        this.shouldScrollToBottom = true; // Scroll as AI types
        this.scrollToBottom();
      } else {
        clearInterval(interval);
        message.isTyping = false;
        this.isLoading = false;
        setTimeout(() => {
          this.animateNewMessage();
          this.focusInput();
        }, 0);
      }
    }, 10);
  }

  // Animate new messages with GSAP
  private animateNewMessage() {
    const messageElements = document.querySelectorAll('.message-item');
    if (messageElements.length > 0) {
      const latestMessage = messageElements[
        messageElements.length - 1
      ] as HTMLElement;

      if (latestMessage) {
        // Set initial state
        gsap.set(latestMessage, {
          autoAlpha: 0,
          x: latestMessage.classList.contains('justify-end') ? 20 : -20,
          y: 10,
        });

        // Create animation
        const tl = gsap.timeline();
        this.activeAnimations.push(tl);

        tl.to(latestMessage, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });

        // Find the bubble inside the message
        const messageBubble = latestMessage.querySelector('div');
        if (messageBubble) {
          tl.from(
            messageBubble,
            {
              scale: 0.9,
              duration: 0.3,
              ease: 'back.out(1.7)',
            },
            '-=0.4'
          );
        }
      }
    }
  }

  // Focus on input field
  private focusInput() {
    if (this.messageInput && this.messageInput.nativeElement) {
      setTimeout(() => {
        this.messageInput.nativeElement.focus();
      }, 100);
    }
  }

  // Call this in (scroll) event in HTML
  onScroll() {
    if (this.chatContainer && this.chatContainer.nativeElement) {
      const container = this.chatContainer.nativeElement;
      // إذا كان المستخدم قريب من الأسفل (مثلاً أقل من 50px)
      this.shouldScrollToBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        50;
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.chatContainer && this.chatContainer.nativeElement) {
        const container = this.chatContainer.nativeElement;
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth',
        });
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
}
