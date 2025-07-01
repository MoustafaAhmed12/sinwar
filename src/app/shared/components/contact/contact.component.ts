import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from 'emailjs-com';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements AfterViewInit {
  name = '';
  email = '';
  subject = '';
  message = '';

  @ViewChild('contactSection') contactSection!: ElementRef;
  @ViewChild('contactTitle') contactTitle!: ElementRef;

  sendMessage() {
    const templateParams = {
      from_name: this.name,
      to_email: this.email,
      subject: this.subject,
      message: this.message,
      time: new Date().toLocaleString(), // ⬅️ إرسال التاريخ/الوقت
    };

    emailjs
      .send(
        'service_sinwar', // مثال: 'service_gmail'
        'template_ah6gyl8', // مثال: 'template_sinwar'
        templateParams,
        'Si_eb1NXUOKaCbGTn' // مثال: 'oGVK39Hn123AbCdEf'
      )
      .then(() => {
        alert('✅ تم إرسال الرسالة بنجاح!');
      })
      .catch((error) => {
        console.error('❌ خطأ أثناء الإرسال:', error);
        alert('حدث خطأ أثناء إرسال الرسالة.');
      });
  }

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate title
    gsap.from(this.contactTitle.nativeElement, {
      scrollTrigger: {
        trigger: this.contactSection.nativeElement,
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Animate form and contact info cards
    const cards = this.contactSection.nativeElement.querySelectorAll('.group');
    cards.forEach((card: HTMLElement, index: number) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.5,
        delay: index * 0.2,
        ease: 'power2.out',
      });

      // Add hover animation
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }
}
