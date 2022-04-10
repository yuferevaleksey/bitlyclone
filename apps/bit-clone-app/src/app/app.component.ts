import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@bit-clone-app/common/lib/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bit-clone-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isAuth = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnInit(): void {
    this.authenticationService.currentUser$
      .pipe()
      .subscribe((token) => (this.isAuth = !!token));
  }
}
