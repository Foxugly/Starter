import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {TabsModule} from 'primeng/tabs';

import {UserService} from '../../../services/user/user';
import {CONTACT_INFO, emailDisplay, openContactEmail, phoneDisplay} from '../../../shared/contact';
import {getAboutUiText} from './about.i18n';

@Component({
  selector: 'app-about',
  imports: [TabsModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  private readonly userService = inject(UserService);

  // TODO (per project): replace with the new project's repository URL.
  protected readonly repositoryUrl = 'https://github.com/example/starter';
  protected readonly ui = computed(() => getAboutUiText(this.userService.currentLang));
  protected readonly technicalCardKeys = ['repository', 'backend', 'frontend'] as const;
  protected readonly activeTab = signal('company');
  protected readonly contact = CONTACT_INFO;
  protected readonly emailDisplay = emailDisplay();
  protected readonly phoneDisplay = phoneDisplay();

  protected emailClick(): void {
    openContactEmail('[Starter]');
  }
}
