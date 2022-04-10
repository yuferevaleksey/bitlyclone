import {
  ChangeDetectorRef,
  Component,
  inject,
  Injector,
  ɵsetCurrentInjector as setCurrentInjector,
} from '@angular/core';
import { AuthenticationService } from '@bit-clone-app/common/lib/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFormData } from '@bit-clone-app/auth/lib/components/auth-form/auth-form.component';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'bit-clone-app-auth-common',
  template: '',
})
export class AuthCommonComponent {
  protected authenticationService: AuthenticationService;
  protected changeDetection: ChangeDetectorRef;
  protected router: Router;
  protected route: ActivatedRoute;

  constructor(injector: Injector) {
    /**
     * This code just example how we can inject dependencies in parent component without setting them via constructor.
     * DO NOT use this code in production! It will work but it`s not a good pattern. =)
     */
    const former = setCurrentInjector(injector);
    this.authenticationService = inject(AuthenticationService);
    this.changeDetection = inject(ChangeDetectorRef);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    setCurrentInjector(former);
  }

  protected _onSubmit(
    authFormData: AuthFormData,
    type: 'login' | 'registration'
  ): Observable<string> {
    return this.authenticationService[type](
      authFormData.username,
      authFormData.password
    ).pipe(take(1));
  }
}
