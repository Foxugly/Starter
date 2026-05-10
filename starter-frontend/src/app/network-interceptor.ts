import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, throwError, timeout} from 'rxjs';
import {environment} from '../environments/environment';
import {BackendStatusService} from './services/status/status';

// Max wait before treating a request as "no response" — adjust per project.
const REQ_TIMEOUT_MS = 8000;

export const NetworkInterceptor: HttpInterceptorFn = (req, next) => {
  const status = inject(BackendStatusService);

  return next(req).pipe(
    timeout(REQ_TIMEOUT_MS),
    catchError((err: unknown) => {
      // RxJS timeout surfaces as a non-HttpErrorResponse error.
      if (err instanceof HttpErrorResponse) {
        if (err.status === 0) {
          // Connection failed: server down, CORS, DNS, etc.
          status.setDown(`API unreachable. Check that the backend is running at ${environment.apiBaseUrl}`);
        } else {
          // Valid HTTP response (400/401/500…) — backend is up.
          status.setUp();
        }
      } else {
        status.setDown('API request timed out.');
      }
      return throwError(() => err);
    })
  );
};
