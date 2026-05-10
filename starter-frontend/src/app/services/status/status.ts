import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class BackendStatusService {
  // null = unknown, true = OK, false = KO
  backendUp = signal<boolean | null>(null);
  lastError = signal<string | null>(null);

  setUp() {
    this.backendUp.set(true);
    this.lastError.set(null);
  }

  setDown(msg = 'API unreachable (server down, CORS, or network).') {
    this.backendUp.set(false);
    this.lastError.set(msg);
  }
}
