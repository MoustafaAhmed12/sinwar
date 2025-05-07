import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AiChatService {
  constructor() {}

  getResponse(message: string): Observable<string> {
    const lower = message.toLowerCase();

    if (
      lower.includes('سعر') ||
      lower.includes('سعر الخدمة') ||
      lower.includes('سعر الموقع') ||
      lower.includes('سعر التطبيق') ||
      lower.includes('سعر الذكاء الاصطناعي') ||
      lower.includes('سعر التصميم') ||
      lower.includes('الأسعار') ||
      lower.includes('اسعار') ||
      lower.includes('اسعار الخدمات') ||
      lower.includes('اسعار المواقع') ||
      lower.includes('اسعار التطبيقات') ||
      lower.includes('اسعار الذكاء الاصطناعي') ||
      lower.includes('اسعار التصميم') ||
      lower.includes('price')
    ) {
      return of(
        'يمكنك معرفة تفاصيل الأسعار من خلال <a href="/#pricing" class="text-blue-500 hover:text-blue-600 font-bold underlineimage.png"  >قسم التسعير</a>.'
      );
    }
    if (lower.includes('موقع') || lower.includes('website')) {
      return of('موقعنا الإلكتروني هو: https://sinwar.com');
    }
    if (
      lower.includes('شكرا') ||
      lower.includes('تمام') ||
      lower.includes('ماشي') ||
      lower.includes('') ||
      lower.includes('thanks')
    ) {
      return of('شكرًا لك! نحن دائمًا في خدمتك.');
    }
    if (lower.includes('خدمات') || lower.includes('services')) {
      return of(
        'نقدم خدمات برمجة المواقع، التطبيقات، الذكاء الاصطناعي، وتصميم واجهات المستخدم. <a href="/#services" >تعرف على خدماتنا</a>.'
      );
    }
    if (lower.includes('تواصل') || lower.includes('contact')) {
      return of(
        'تواصل معنا عبر <a href="/#contact"  >صفحة اتصل بنا</a> أو البريد <a href="mailto:info@sinwar.com">info@sinwar.com</a>.'
      );
    }
    if (
      lower.includes('اعمال') ||
      lower.includes('اعمالنا') ||
      lower.includes('المواقع') ||
      lower.includes('نماذج') ||
      lower.includes('portfolio')
    ) {
      return of(
        'شاهد نماذج من أعمالنا في <a href="/#portfolio"  >معرض الأعمال</a>.'
      );
    }
    if (lower.includes('دعم') || lower.includes('support')) {
      return of(
        'نقدم دعمًا فنيًا مستمرًا لعملائنا. <a href="/#support"  >تعرف على الدعم الفني</a>.'
      );
    }
    if (
      lower.includes('مدة') ||
      lower.includes('وقت') ||
      lower.includes('وقت التنفيذ') ||
      lower.includes('تنفيذ')
    ) {
      return of(
        'مدة تنفيذ المشروع تعتمد على متطلباتك. تواصل معنا عبر <a href="/#contact"  >صفحة اتصل بنا</a> لنحدد لك الوقت المناسب.'
      );
    }
    if (
      lower.includes('دفع') ||
      lower.includes('payment') ||
      lower.includes('طرق الدفع')
    ) {
      return of(
        'نوفر عدة طرق دفع مرنة وآمنة. <a href="/#payment"  >تعرف على طرق الدفع</a>.'
      );
    }
    if (lower.includes('عروض') || lower.includes('offer')) {
      return of(
        'تابعنا على وسائل التواصل الاجتماعي لمعرفة أحدث العروض والخصومات! <a href="/#offers"  >العروض الحالية</a>.'
      );
    }
    if (
      lower.includes('من أنتم') ||
      lower.includes('عنكم') ||
      lower.includes('عنك') ||
      lower.includes('ما هي ') ||
      lower.includes('about')
    ) {
      return of(
        'sinwar هي شركة برمجة متخصصة في الحلول الرقمية المبتكرة. <a href="/#about"  >تعرف علينا أكثر</a>.'
      );
    }
    if (lower.includes('تطبيق') || lower.includes('app')) {
      return of(
        'نطور تطبيقات موبايل احترافية. <a href="/#services"  >تعرف على خدمات التطبيقات</a>.'
      );
    }
    if (lower.includes('موقع') || lower.includes('website')) {
      return of(
        'نصمم ونبرمج مواقع إلكترونية عصرية وسريعة. <a href="/#services"  >تعرف على خدمات المواقع</a>.'
      );
    }
    // ... أضف المزيد من الردود حسب الحاجة

    // رد افتراضي
    return of(
      'شكرًا لتواصلك مع sinwar! كيف يمكننا مساعدتك؟ تصفح أقسام موقعنا أو اسأل عن أي خدمة أو سعر أو تواصل معنا مباشرة.'
    );
  }
}
