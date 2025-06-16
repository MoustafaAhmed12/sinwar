import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import gsap from 'gsap';
import { ModalComponent } from '../../shared/components/modal/modal.component';

interface Service {
  title: string;
  subtitle: string;
  details: string;
  features: string[];
  steps?: string[];
  technologies?: string[];
  icon: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ModalComponent],
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css'],
})
export class ServicesPageComponent implements AfterViewInit {
  isModalOpen = false;
  selectedService: Service | null = null;

  services: Service[] = [
    {
      title: 'تطوير المواقع',
      subtitle: 'مواقع احترافية وسريعة الاستجابة',
      details:
        'نقوم بتصميم وتطوير مواقع ويب عصرية باستخدام أحدث التقنيات لضمان أفضل تجربة للمستخدم.',
      features: [
        'تصميم متجاوب',
        'سرعة تحميل عالية',
        'دعم SEO',
        'لوحات تحكم مخصصة',
      ],
      steps: [
        'تحليل المتطلبات',
        'تصميم الواجهات',
        'برمجة الموقع',
        'اختبار وتسليم',
      ],
      technologies: ['Angular', 'Node.js', 'TailwindCSS'],
      icon: '🌐',
      expanded: false,
    },
    {
      title: 'تطبيقات الجوال',
      subtitle: 'تطبيقات أندرويد وiOS عالية الجودة',
      details:
        'نطور تطبيقات جوال متكاملة تلبي احتياجاتك وتعمل بكفاءة على جميع الأجهزة.',
      features: [
        'تجربة مستخدم سلسة',
        'دعم جميع الأجهزة',
        'تكامل مع الأنظمة الخلفية',
      ],
      steps: [
        'تصميم تجربة المستخدم',
        'تطوير التطبيق',
        'اختبار على الأجهزة',
        'رفع على المتاجر',
      ],
      technologies: ['Flutter', 'React Native'],
      icon: '📱',
      expanded: false,
    },
    {
      title: 'تحليل البيانات',
      subtitle: 'تحويل البيانات إلى قرارات',
      details:
        'نقدم حلول تحليل بيانات متقدمة لمساعدتك في اتخاذ قرارات مبنية على معلومات دقيقة.',
      features: ['تقارير تفاعلية', 'لوحات بيانات مخصصة', 'تحليل تنبؤي'],
      technologies: ['Python', 'Power BI', 'Tableau'],
      icon: '📊',
      expanded: false,
    },
    {
      title: 'الأمن السيبراني',
      subtitle: 'حماية بياناتك وأعمالك من المخاطر',
      details:
        'نقدم حلول أمنية متكاملة تشمل اختبار الاختراق، تقييم الثغرات، وتدريب الموظفين.',
      features: [
        'اختبار اختراق احترافي',
        'تقييم الثغرات الأمنية',
        'تدريب توعوي للموظفين',
        'استشارات أمنية',
      ],
      steps: [
        'تقييم الوضع الحالي',
        'تنفيذ الاختبارات',
        'تقديم التقارير والتوصيات',
        'متابعة التحسينات',
      ],
      technologies: ['Kali Linux', 'Burp Suite', 'OWASP'],
      icon: '🛡️',
      expanded: false,
    },
  ];

  @ViewChildren('serviceDetails') serviceDetails!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {}

  toggleDetails(index: number) {
    this.services[index].expanded = !this.services[index].expanded;
    setTimeout(() => {
      const el = this.serviceDetails.get(index)?.nativeElement;
      if (el && this.services[index].expanded) {
        this.renderer.setStyle(el, 'display', 'block');
        gsap.fromTo(
          el,
          { y: 40, opacity: 0, height: 0 },
          {
            y: 0,
            opacity: 1,
            height: 'auto',
            duration: 0.6,
            ease: 'power2.out',
          }
        );
      }
      if (el && !this.services[index].expanded) {
        gsap.to(el, {
          y: -40,
          opacity: 0,
          height: 0,
          duration: 0.5,
          ease: 'power2.in',
          onComplete: () => {
            this.renderer.setStyle(el, 'display', 'none');
          },
        });
      }
    }, 50);
  }

  openServiceDetails(index: number) {
    this.selectedService = this.services[index];
    this.isModalOpen = true;
  }
}
