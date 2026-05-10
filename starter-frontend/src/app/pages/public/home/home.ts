import {CommonModule} from '@angular/common';
import {Component, computed, inject, ChangeDetectionStrategy} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';

import {ROUTES} from '../../../app.routes-paths';
import {AuthService} from '../../../services/auth/auth';
import {UserService} from '../../../services/user/user';
import {openContactEmail} from '../../../shared/contact';
import {getUiText} from '../../../shared/i18n/ui-text';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, ButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  readonly app = window.__APP__!;
  private readonly auth = inject(AuthService);
  private readonly userService = inject(UserService);
  readonly ui = computed(() => getUiText(this.userService.currentLang));

  readonly isAuthenticated = computed(() => this.auth.isLoggedIn());
  readonly primaryCta = computed(() =>
    this.isAuthenticated() ? ['/preferences'] : ROUTES.auth.login(),
  );
  readonly primaryCtaLabel = computed(() =>
    this.isAuthenticated() ? this.ui().home.primaryLoggedIn : this.ui().home.primaryLoggedOut,
  );
  readonly secondaryCta = computed(() => ROUTES.auth.register());
  readonly secondaryCtaLabel = computed(() => this.ui().home.secondaryLoggedOut);

  contactClick(): void {
    openContactEmail('[Starter]');
  }
}
