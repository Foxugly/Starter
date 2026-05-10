import {Component, computed, DestroyRef, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {finalize, forkJoin} from 'rxjs';

import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ConfirmationService} from 'primeng/api';

import {ROUTES} from '../../../app.routes-paths';
import {AdminUserDto, UserService} from '../../../services/user/user';
import {logApiError} from '../../../shared/api/api-errors';
import {BulkActionsComponent, BulkActionOption} from '../../../shared/components/bulk-actions/bulk-actions';
import {getEditorUiText} from '../../../shared/i18n/editor-ui-text';

type BulkAction = 'activate' | 'deactivate' | 'delete';

type UserListRow = AdminUserDto & {
  fullName: string;
};

@Component({
  selector: 'app-user-list-page',
  imports: [
    FormsModule,
    ButtonModule,
    CheckboxModule,
    ConfirmDialogModule,
    InputTextModule,
    PaginatorModule,
    TableModule,
    BulkActionsComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListPage implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly confirmationService = inject(ConfirmationService);

  readonly ui = computed(() => getEditorUiText(this.userService.currentLang));
  readonly users = signal<AdminUserDto[]>([]);
  readonly q = signal('');
  readonly rows = 10;

  selectedRows = signal<UserListRow[]>([]);
  applyingBulk = signal(false);
  readonly selectedCount = computed(() => this.selectedRows().length);
  readonly selectedCountText = computed(() => {
    const n = this.selectedCount();
    const t = this.ui().pages.userList.bulk;
    return (n > 1 ? t.countPlural : t.countSingular).replace('{n}', String(n));
  });

  readonly bulkActionOptions = computed<BulkActionOption[]>(() => {
    const t = this.ui().pages.userList.bulk;
    return [
      {label: t.activate, value: 'activate', icon: 'pi pi-check-circle'},
      {label: t.deactivate, value: 'deactivate', icon: 'pi pi-times-circle'},
      {label: t.delete, value: 'delete', icon: 'pi pi-trash', danger: true},
    ];
  });
  readonly rowsData = computed<UserListRow[]>(() => {
    const needle = this.q().trim().toLowerCase();
    return this.users()
      .filter((user) => {
        if (!needle) {
          return true;
        }
        const haystack = [
          user.username ?? '',
          user.email ?? '',
          user.first_name ?? '',
          user.last_name ?? '',
        ].join(' ').toLowerCase();
        return haystack.includes(needle);
      })
      .map((user) => ({
        ...user,
        fullName: `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim(),
      }));
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.userService.listAdmin().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (users) => this.users.set(users),
      error: (err) => {
        logApiError('user.list.load', err);
        this.users.set([]);
      },
    });
  }

  goNew(): void {
    void this.router.navigate(ROUTES.user.add());
  }

  goEdit(userId: number): void {
    void this.router.navigate(ROUTES.user.edit(userId));
  }

  goDelete(userId: number): void {
    void this.router.navigate(ROUTES.user.delete(userId));
  }

  onSelectionChange(rows: UserListRow[]): void {
    this.selectedRows.set(rows);
  }

  applyBulk(action: string): void {
    if (this.selectedCount() === 0 || this.applyingBulk()) {
      return;
    }
    switch (action as BulkAction) {
      case 'activate':
        this.bulkPatch(true);
        return;
      case 'deactivate':
        this.bulkPatch(false);
        return;
      case 'delete':
        this.confirmBulkDelete();
        return;
    }
  }

  private bulkPatch(isActive: boolean): void {
    const ids = this.selectedRows().map(row => row.id);
    if (!ids.length) {
      return;
    }
    this.applyingBulk.set(true);
    forkJoin(ids.map(id => this.userService.updateAdmin(id, {is_active: isActive}))).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.applyingBulk.set(false)),
    ).subscribe({
      next: () => {
        this.selectedRows.set([]);
        this.load();
      },
      error: (err: unknown) => logApiError('user.list.bulk-patch', err),
    });
  }

  private confirmBulkDelete(): void {
    const ids = this.selectedRows().map(row => row.id);
    if (!ids.length) {
      return;
    }
    const t = this.ui().pages.userList.bulk;
    const common = this.ui().common;
    this.confirmationService.confirm({
      header: t.confirmDeleteHeader,
      message: t.confirmDeleteMessage.replace('{n}', String(ids.length)),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: common.delete,
      rejectLabel: common.cancel,
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.runBulkDelete(ids),
    });
  }

  private runBulkDelete(ids: number[]): void {
    this.applyingBulk.set(true);
    forkJoin(ids.map(id => this.userService.deleteAdmin(id))).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.applyingBulk.set(false)),
    ).subscribe({
      next: () => {
        this.selectedRows.set([]);
        this.load();
      },
      error: (err: unknown) => logApiError('user.list.bulk-delete', err),
    });
  }
}
