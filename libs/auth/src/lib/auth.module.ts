import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from 'libs/auth/src/lib/auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'libs/auth/src/lib/components/login/login.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthCommonComponent } from '@bit-clone-app/auth/lib/components/common/auth-common.component';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
  declarations: [
    LoginComponent,
    AuthFormComponent,
    RegisterComponent,
    AuthCommonComponent,
  ],
  exports: [AuthRoutingModule],
})
export class AuthModule {}
