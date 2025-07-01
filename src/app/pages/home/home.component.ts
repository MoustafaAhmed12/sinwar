import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { ServicesComponent } from '../../shared/components/services/services.component';
import { PortfolioComponent } from '../../shared/components/portfolio/portfolio.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BlogComponent } from '../../shared/components/blog/blog.component';
import { TeamComponent } from '../../shared/components/team/team.component';
import { ContactComponent } from '../../shared/components/contact/contact.component';
import { FaqComponent } from '../../shared/components/faq/faq.component';
import { PricingComponent } from '../../shared/components/pricing/clients.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavigationDotsComponent } from '../../shared/components/navigation-dots/navigation-dots.component';
import { AiChatComponent } from '../../shared/components/ai-chat/ai-chat.component';
import { SocialSidebarComponent } from '../../shared/components/social-sidebar/social-sidebar.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ServicesComponent,
    PortfolioComponent,
    BlogComponent,
    TeamComponent,
    ContactComponent,
    FaqComponent,
    PricingComponent,
    NavigationDotsComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
