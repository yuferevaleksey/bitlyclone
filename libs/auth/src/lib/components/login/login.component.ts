import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
} from '@angular/core';
import { catchError, of } from 'rxjs';
import { AuthFormData } from '@bit-clone-app/auth/lib/components/auth-form/auth-form.component';
import { AuthCommonComponent } from '@bit-clone-app/auth/lib/components/common/auth-common.component';

@Component({
  selector: 'bit-clone-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends AuthCommonComponent implements OnInit {
  public loading = false;
  public error = '';
  private returnUrl: string;

  constructor(private injector: Injector) {
    super(injector);
    if (this.authenticationService.currentUserToken) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(authFormData: AuthFormData) {
    this._onSubmit(authFormData, 'login')
      .pipe(
        catchError((error) => {
          this.error = error;
          this.loading = false;
          this.changeDetection.markForCheck();
          return of();
        })
      )
      .subscribe(() => {
        this.router.navigate([this.returnUrl]);
      });
  }
}
