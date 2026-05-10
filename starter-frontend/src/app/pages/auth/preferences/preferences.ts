import {CommonModule} from '@angular/common';
import {Component, DestroyRef, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {SelectModule} from 'primeng/select';

import {CustomUserReadDto} from '../../../api/generated/model/custom-user-read';
import {LanguageEnumDto} from '../../../api/generated/model/language-enum';
import {UserService} from '../../../services/user/user';
import {getUiText} from '../../../shared/i18n/ui-text';

@Component({
  selector: 'app-preferences',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    SelectModule,
  ],
  templateUrl: './preferences.html',
  styleUrls: ['./preferences.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Preferences implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly success = signal<string | null>(null);
  readonly currentUser = signal<CustomUserReadDto | null>(null);

  readonly form = this.fb.nonNullable.group({
    username: [{value: '', disabled: true}],
    email: ['', [Validators.email]],
    first_name: [''],
    last_name: [''],
    language: [LanguageEnumDto.En, [Validators.required]],
  });

  get ui() {
    return getUiText(this.userService.currentLang);
  }

  get languageOptions() {
    return [
      {label: 'Français', value: LanguageEnumDto.Fr},
      {label: 'Nederlands', value: LanguageEnumDto.Nl},
      {label: 'English', value: LanguageEnumDto.En},
      {label: 'Italiano', value: LanguageEnumDto.It},
      {label: 'Español', value: LanguageEnumDto.Es},
    ];
  }

  get roleLabel(): string {
    const me = this.currentUser();
    if (!me) {
      return '-';
    }
    return me.is_superuser ? this.ui.preferences.roleSuperuser : this.ui.preferences.roleUser;
  }

  ngOnInit(): void {
    this.loading.set(true);
    const cached = this.userService.currentUser();
    if (cached) {
      this.populateFromUser(cached);
      this.loading.set(false);
      return;
    }
    this.userService.getMe()
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading.set(false)))
      .subscribe({
        next: (me) => this.populateFromUser(me),
        error: () => this.error.set(this.ui.preferences.loadError),
      });
  }

  save(): void {
    this.error.set(null);
    this.success.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.currentUser()) {
      this.error.set(this.ui.preferences.userMissing);
      return;
    }

    const raw = this.form.getRawValue();
    this.saving.set(true);

    this.userService.updateMeProfile({
      email: raw.email || '',
      first_name: raw.first_name || '',
      last_name: raw.last_name || '',
      language: raw.language,
    })
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.saving.set(false)))
      .subscribe({
        next: (updated) => {
          this.populateFromUser(updated);
          this.success.set(this.ui.preferences.saveSuccess);
        },
        error: () => this.error.set(this.ui.preferences.saveError),
      });
  }

  goChangePassword(): void {
    void this.router.navigate(['/change-password']);
  }

  private populateFromUser(user: CustomUserReadDto): void {
    this.currentUser.set(user);
    this.form.patchValue({
      username: user.username ?? '',
      email: user.email ?? '',
      first_name: user.first_name ?? '',
      last_name: user.last_name ?? '',
      language: user.language ?? LanguageEnumDto.En,
    });
  }
}
