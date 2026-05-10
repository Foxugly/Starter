import {ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';

import {CustomUserReadDto} from '../../api/generated/model/custom-user-read';
import {UserService} from '../../services/user/user';
import {LangSelectComponent} from '../lang-select/lang-select';
import {UserMenuComponent} from '../user-menu/user-menu';
import {SupportedLanguage} from '../../../environments/language';
import {ROUTES} from '../../app.routes-paths';
import {getUiText} from '../../shared/i18n/ui-text';
import {AuthService} from '../../services/auth/auth';

declare global {
  interface Window {
    __APP__?: {
      name: string;
      version: string;
      author: string;
      year: string;
      logoSvg: string;
      logoIco: string;
      logoPng: string;
    };
  }
}

type NavItem = {
  label: string;
  link: readonly string[];
  accent?: boolean;
};

@Component({
  selector: 'app-topmenu',
  imports: [
    RouterLink,
    RouterLinkActive,
    LangSelectComponent,
    UserMenuComponent,
  ],
  templateUrl: './topmenu.html',
  styleUrl: './topmenu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'(document:click)': 'closeMenus($event)'},
})
export class TopMenuComponent implements OnInit {
  @ViewChild('mobileMenuRoot') private readonly mobileMenuRoot?: ElementRef<HTMLElement>;

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);
  app = window.__APP__!;
  currentLang: SupportedLanguage = this.userService.currentLang;
  readonly mobileMenuOpen = signal(false);

  get ui() {
    return getUiText(this.userService.currentLang);
  }

  get currentUser(): CustomUserReadDto | null {
    return this.userService.currentUser();
  }

  get navItems(): NavItem[] {
    const items: NavItem[] = [
      {label: this.ui.topmenu.features, link: ['/features']},
    ];

    if (this.currentUser?.is_superuser) {
      items.push({label: this.ui.topmenu.users, link: ROUTES.user.list()});
    }

    items.push(
      {label: this.ui.topmenu.donate, link: ['/donate'], accent: true},
      {label: this.ui.topmenu.about, link: ['/about']},
    );

    return items;
  }

  ngOnInit(): void {
    this.refreshUserContext();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.refreshUserContext();
        this.mobileMenuOpen.set(false);
      });
  }

  toggleMobileMenu(event: Event): void {
    event.stopPropagation();
    this.mobileMenuOpen.update((value) => !value);
  }

  onLangChange(lang: SupportedLanguage): void {
    this.currentLang = lang;
    this.userService.setLang(lang);

    const reloadCurrentPage = () => window.location.reload();

    if (!this.userService.currentUser()) {
      reloadCurrentPage();
      return;
    }

    this.userService.updateMeLanguage(lang).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: reloadCurrentPage,
      error: reloadCurrentPage,
    });
  }

  goHome(): void {
    void this.router.navigate(ROUTES.home());
  }

  closeMenus(event: Event): void {
    if (this.mobileMenuOpen() && !this.mobileMenuRoot?.nativeElement.contains(event.target as Node)) {
      this.mobileMenuOpen.set(false);
    }
  }

  private refreshUserContext(): void {
    if (this.userService.currentUser() || !this.authService.authenticated) {
      return;
    }
    this.userService.getMe().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      error: () => undefined,
    });
  }
}
