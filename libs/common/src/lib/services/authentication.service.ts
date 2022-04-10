import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginResponseResDto, UserService } from '@bit-clone-app/api';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private stringBehaviorSubject$: BehaviorSubject<string>;
  public currentUser$: Observable<string>;

  constructor(private userService: UserService) {
    this.stringBehaviorSubject$ = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem('currentUser') as string)
    );
    this.currentUser$ = this.stringBehaviorSubject$.asObservable();
  }

  public get currentUserToken(): string {
    return this.stringBehaviorSubject$.value;
  }

  login(email: string, password: string): Observable<string> {
    return this.userService
      .userControllerLogin({
        email,
        password,
      })
      .pipe(map((response) => this.setToken(response)));
  }

  registration(email: string, password: string): Observable<string> {
    return this.userService
      .userControllerLogin({
        email,
        password,
      })
      .pipe(map((response) => this.setToken(response)));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.stringBehaviorSubject$.next('');
  }

  private setToken(response: LoginResponseResDto) {
    localStorage.setItem(
      'currentUser',
      JSON.stringify(response.body?.accessToken)
    );
    this.stringBehaviorSubject$.next(response.body.accessToken);
    return response.body.accessToken;
  }
}
